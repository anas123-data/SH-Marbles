export const referenceLimits = { count: 3, each: 5 * 1024 * 1024, total: 10 * 1024 * 1024 };
const allowed: Record<string, string[]> = { 'image/jpeg': ['jpg', 'jpeg'], 'image/png': ['png'], 'image/webp': ['webp'], 'application/pdf': ['pdf'] };

/** Local-selection validation only. Never a substitute for private server upload validation/scanning. */
export async function validateReferenceFiles(files: File[]): Promise<string | null> {
  if (files.length > referenceLimits.count) return 'Choose up to three reference files.';
  if (files.reduce((sum, file) => sum + file.size, 0) > referenceLimits.total) return 'Keep the selected files under 10 MB in total.';
  for (const file of files) {
    const extension = file.name.split('.').at(-1)?.toLowerCase() ?? '';
    if (!allowed[file.type]?.includes(extension)) return 'Use JPEG, PNG, WebP or PDF files only.';
    if (file.size === 0 || file.size > referenceLimits.each) return 'Each reference must be non-empty and no larger than 5 MB.';
    const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    const ascii = (start: number, end: number) => String.fromCharCode(...bytes.slice(start, end));
    const valid = file.type === 'image/jpeg' ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
      : file.type === 'image/png' ? [137,80,78,71,13,10,26,10].every((byte, index) => bytes[index] === byte)
      : file.type === 'image/webp' ? ascii(0,4) === 'RIFF' && ascii(8,12) === 'WEBP'
      : ascii(0,5) === '%PDF-';
    if (!valid) return 'A reference does not match its file type. Choose the original image or PDF.';
  }
  return null;
}
