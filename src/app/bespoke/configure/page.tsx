import { catalogue } from '@/content/catalogue';
import { catalogueMetadata } from '@/content/metadata';
import { Breadcrumbs } from '@/components/catalogue-ui';
import { Configurator } from '@/features/bespoke/configurator';
export const metadata = catalogueMetadata({ title: 'The Design Table — Bespoke Configurator', description: 'Explore a marble table or basin concept. Choose a form, colour direction and approximate dimensions to prepare your SH MARBLES project brief.' }, { path: '/bespoke/configure' });
export default async function ConfigurePage() {
  const materials = await catalogue.listMaterials();
  return <main id="main" className="shell bespoke-workspace"><Breadcrumbs items={[{ label: 'Bespoke', href: '/bespoke' }, { label: 'The design table' }]} /><header className="workspace-heading"><p className="eyebrow">Bespoke / An outline of your idea</p><h1>The design <em>table.</em></h1><p>Form, colour, proportion. A place to begin.</p></header><Configurator materials={materials} /></main>;
}
