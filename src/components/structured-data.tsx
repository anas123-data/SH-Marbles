import { serializeStructuredData } from '@/content/structured-data';
export function StructuredData({data}:{data:unknown}){return data?<script type="application/ld+json" dangerouslySetInnerHTML={{__html:serializeStructuredData(data)}}/>:null;}
