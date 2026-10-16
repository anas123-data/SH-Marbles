import { catalogue } from '@/content/catalogue';
import { configurationErrors, validateInquiry } from '@/features/bespoke/model';
import { inquiryDelivery } from '@/features/bespoke/lead-service';

export const runtime = 'nodejs';
const maxBodyBytes = 32 * 1024;
function reply(status: number, code: string, message: string, errors?: unknown) {
  return Response.json({ ok: false, code, message, ...(errors ? { errors } : {}) }, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}
export async function POST(request: Request) {
  // Next may normalize request.url to its internal bind hostname. The HTTP Host
  // identifies the browser-visible authority; do not trust X-Forwarded-Host here.
  const host = request.headers.get('host');
  const expectedOrigin = `${new URL(request.url).protocol}//${host}`;
  if (!host || request.headers.get('origin') !== expectedOrigin) return reply(403, 'ORIGIN_REJECTED', 'Use the project inquiry page on this site.');
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return reply(415, 'FORMAT_REJECTED', 'Send a JSON inquiry.');
  if (Number(request.headers.get('content-length')) > maxBodyBytes) return reply(413, 'BODY_TOO_LARGE', 'This inquiry is too large.');
  let raw: Record<string, unknown>;
  try {
    if (!request.body) return reply(400, 'INVALID_BODY', 'An inquiry is required.');
    const reader = request.body.getReader();
    const decoder = new TextDecoder('utf-8', { fatal: true });
    let bytes = 0, body = '';
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > maxBodyBytes) { await reader.cancel(); return reply(413, 'BODY_TOO_LARGE', 'This inquiry is too large.'); }
      body += decoder.decode(chunk.value, { stream: true });
    }
    body += decoder.decode();
    const parsed: unknown = JSON.parse(body);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return reply(400, 'INVALID_BODY', 'Enter a valid inquiry.');
    raw = parsed as Record<string, unknown>;
  } catch { return reply(400, 'INVALID_BODY', 'The inquiry could not be read.'); }
  const { errors } = validateInquiry(raw.fields);
  if (Object.keys(errors).length) return reply(422, 'VALIDATION_FAILED', 'Check your inquiry details.', errors);
  if (raw.configuration !== null && raw.configuration !== undefined) {
    const materials = await catalogue.listMaterials();
    const found = configurationErrors(raw.configuration, materials.map(item => item.id));
    if (Object.keys(found).length) return reply(422, 'CONFIGURATION_INVALID', 'Review your configuration.', found);
  }
  if (raw.reference !== undefined && (!raw.reference || typeof raw.reference !== 'object' || Array.isArray(raw.reference) || Object.entries(raw.reference).some(([key, value]) => !['piece', 'material', 'intent'].includes(key) || typeof value !== 'string' || value.length > 240 || /[\u0000-\u001F\u007F]/.test(value)))) return reply(422, 'REFERENCE_INVALID', 'Review your collection reference.');
  if (Object.keys(raw).some(key => !['fields', 'configuration', 'reference'].includes(key))) return reply(422, 'UNSUPPORTED_FIELDS', 'File uploads and additional fields are not accepted in this preview.');
  // Fail closed. Never return a success receipt before durable storage and abuse controls exist.
  if (!inquiryDelivery.available) return reply(503, 'INQUIRY_UNAVAILABLE', 'Online inquiries are not connected. Your inquiry has not been received. Download your brief from the inquiry page.');
  return reply(503, 'INQUIRY_UNAVAILABLE', 'Your inquiry has not been received.');
}
