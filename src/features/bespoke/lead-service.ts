import type { BriefReference, Configuration, InquiryFields } from './model';
import { qualifyInquiry } from './model';

/** Server-side integration contract. No database, inbox or private upload provider is configured. */
export interface LeadDraft {
  fields: InquiryFields;
  configuration: Configuration | null;
  reference: BriefReference;
  qualification: ReturnType<typeof qualifyInquiry>;
}
export interface LeadRepository {
  /** Must persist durably and enforce a unique idempotency key before returning a receipt. */
  create(draft: LeadDraft, idempotencyKey: string): Promise<{ id: string; receivedAt: string }>;
}
export interface InquiryRateLimiter {
  /** Shared server-side storage required; process-local counters are insufficient. */
  allow(clientKey: string): Promise<boolean>;
}
export interface PrivateReferenceStore {
  /** Ownership, byte limits, signature validation and malware quarantine required. */
  resolveVerifiedReferences(tokens: string[], leadId: string): Promise<{ id: string; filename: string }[]>;
}
export const inquiryDelivery = { available: false, reason: 'No durable lead destination is configured.' } as const;
