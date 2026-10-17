import type { Preferences, ReferenceCatalogue } from './model';
import { candidatesFor, presentSelection, selectReferences, validateSelection } from './model';

/** Implement only on the server. Provider may rank supplied IDs, never author business claims.
 * Add credentials, shared rate limiting, spend limits and privacy disclosure before activation.
 */
export interface ConciergeProvider {
  rank(input:{preferences:Preferences;candidates:ReferenceCatalogue;signal:AbortSignal}):Promise<unknown>;
}
export async function recommend(preferences:Preferences,catalogue:ReferenceCatalogue,provider?:ConciergeProvider) {
  const fallback=()=>presentSelection(preferences,catalogue,selectReferences(preferences,catalogue));
  if(!provider)return fallback();
  const controller=new AbortController();
  let timeout:ReturnType<typeof setTimeout>|undefined;
  try {
    const candidates=candidatesFor(preferences,catalogue);
    const raw=await Promise.race([
      provider.rank({preferences,candidates,signal:controller.signal}),
      new Promise<never>((_,reject)=>{timeout=setTimeout(()=>{controller.abort();reject(new Error('Provider timeout'));},5000);}),
    ]);
    const selection=validateSelection(raw,candidates);
    return selection ? presentSelection(preferences,catalogue,selection,'assisted') : fallback();
  } catch { return fallback(); }
  finally { if(timeout)clearTimeout(timeout);controller.abort(); }
}
