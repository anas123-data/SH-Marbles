/** Local event seam only. Connect an approved, consent-aware analytics adapter later.
 * Never include contact details, filenames, free text, budgets or destination data.
 */
export type BespokeEvent =
  | { name: 'configurator_completed'; pieceType: string; materialId: string | null }
  | { name: 'inquiry_started'; source: 'direct' | 'configurator' }
  | { name: 'brief_exported'; method: 'copy' | 'download' };
export function trackBespoke(event: BespokeEvent) {
  window.dispatchEvent(new CustomEvent('sh-marbles:analytics', { detail: event }));
}
