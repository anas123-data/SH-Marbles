import { catalogueMetadata } from '@/content/metadata';
import { StudioShell } from '@/components/studio-ui';
import { StoneConcierge } from '@/features/concierge/concierge';

export const metadata=catalogueMetadata({title:'Stone Concierge — Find Your Direction',description:'Explore forms, colours and photographic marble studies through a guided consultation. Create a personal starting point for your SH MARBLES project brief.'});
export default function ConciergePage(){return <StudioShell title="Stone Concierge"><StoneConcierge/></StudioShell>;}
