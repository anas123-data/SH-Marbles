type ConciergeEvent =
  | { name:'concierge_started' }
  | { name:'concierge_completed';mode:'guided'|'assisted' }
  | { name:'concierge_brief_prepared' }
  | { name:'concierge_reset' };
/** Consent-aware analytics can subscribe later. Never send answers or free text. */
export function trackConcierge(event:ConciergeEvent){window.dispatchEvent(new CustomEvent('sh-marbles:analytics',{detail:event}));}
