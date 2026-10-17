import { catalogueMetadata } from '@/content/metadata';
import { studio } from '@/content/studio';
import { StudioClosing, StudioShell } from '@/components/studio-ui';
import { ProjectStudies } from '@/components/project-studies';
export const metadata = catalogueMetadata({ title: 'Projects & Interior Studies', description: 'Explore illustrative residential, hospitality and commercial directions for marble furniture, basins and objects. An interior lookbook from SH MARBLES.' });
export default async function ProjectsPage() {
  const studies = await studio.listStudies();
  return <StudioShell title="Projects"><header className="studio-heading shell"><p className="eyebrow">The lookbook / Interior studies</p><div><h1>Stone.<br /><em>In context.</em></h1><p>A room changes around a single piece.<br />Explore a few ways to begin.</p></div></header><section className="project-browser shell" aria-label="Interior studies"><div className="studio-disclosure"><span className="eyebrow">A collection of possibilities</span><p>These are illustrative application studies using supplied imagery, not completed SH MARBLES projects. Client, location and installation details are not claimed. Actual stone suitability requires project review.</p></div><ProjectStudies studies={studies} /></section><StudioClosing eyebrow="Take a direction. Make it yours." /></StudioShell>;
}
