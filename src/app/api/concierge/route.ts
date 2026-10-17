import { catalogue } from '@/content/catalogue';
import { validatePreferences, type ReferenceCatalogue } from '@/features/concierge/model';
import { recommend } from '@/features/concierge/service';

export const runtime='nodejs';
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
const reply=(status:number,message:string)=>Response.json({message},{status,headers});
export async function POST(request:Request) {
  const host=request.headers.get('host');
  if(!host || request.headers.get('origin')!==`${new URL(request.url).protocol}//${host}`)return reply(403,'Use the Stone Concierge on this site.');
  if(request.headers.get('content-type')?.split(';')[0].trim()!=='application/json')return reply(415,'A JSON consultation is required.');
  if(Number(request.headers.get('content-length'))>8192)return reply(413,'This consultation is too large.');
  let input:unknown;
  try {
    if(!request.body)return reply(400,'Enter your preferences.');
    const reader=request.body.getReader(),decoder=new TextDecoder('utf-8',{fatal:true});
    let bytes=0,body='';
    while(true){const chunk=await reader.read();if(chunk.done)break;bytes+=chunk.value.byteLength;if(bytes>8192){await reader.cancel();return reply(413,'This consultation is too large.');}body+=decoder.decode(chunk.value,{stream:true});}
    body+=decoder.decode();input=JSON.parse(body);
  } catch {return reply(400,'Your preferences could not be read.');}
  const preferences=validatePreferences(input);
  if(!preferences)return reply(422,'Review your preferences and try again.');
  try {
    const [products,materials]=await Promise.all([catalogue.listProducts(),catalogue.listMaterials()]);
    const references:ReferenceCatalogue={
      products:products.filter(item=>item.images.length>0).map(({id,slug,title,category,materialStudyId,images})=>({id,slug,title,category,materialStudyId,image:{src:images[0].src,alt:images[0].alt,position:images[0].position}})),
      materials:materials.map(({id,slug,title,tone,pattern,image,palette})=>({id,slug,title,tone,pattern,palette,image:{src:image.src,alt:image.alt,position:image.position}})),
    };
    // No live provider is configured. Do not select a provider using client input.
    return Response.json(await recommend(preferences,references),{headers});
  } catch {return reply(503,'The catalogue is temporarily unavailable. Your answers are still here; please try again.');}
}
