import { catalogue } from '@/content/catalogue';
import { catalogueMetadata } from '@/content/metadata';
import { Breadcrumbs } from '@/components/catalogue-ui';
import { InquiryForm } from '@/features/bespoke/inquiry-form';
export const metadata = catalogueMetadata({ title: 'Your Bespoke Project Brief', description: 'Gather the details of your marble furniture, basin or architectural project. Prepare a personal SH MARBLES brief with dimensions, references and material preferences.' });
export default async function InquiryPage() {
  const materials = await catalogue.listMaterials();
  return <main id="main" className="shell bespoke-workspace"><Breadcrumbs items={[{ label: 'Bespoke', href: '/bespoke' }, { label: 'Your project brief' }]} /><header className="workspace-heading"><p className="eyebrow">Bespoke / Your project</p><h1>Let’s give it <em>form.</em></h1></header><InquiryForm materials={materials.map(({ id, title }) => ({ id, title }))} /></main>;
}
