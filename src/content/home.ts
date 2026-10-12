export const navigation = [
  { label: 'Collections', href: '#collections' },
  { label: 'The material', href: '#material' },
  { label: 'Bespoke', href: '#bespoke' },
  { label: 'Our perspective', href: '#perspective' },
];

// Editorial studies from supplied images, not verified catalogue SKUs.
export const collections = [
  { id: 'tables', number: '01', title: 'Tables', subtitle: 'A place to gather. A form to remember.', image: '/media/table-detail.webp', alt: 'Dark veined stone side table beside a pale upholstered bed', aspect: 'portrait' },
  { id: 'basins', number: '02', title: 'Basins', subtitle: 'Everyday rituals, beautifully framed.', image: '/media/fluted-basin.webp', alt: 'Burgundy-toned rectangular stone basin with a fluted exterior', aspect: 'landscape' },
  { id: 'objects', number: '03', title: 'Objects', subtitle: 'Small gestures. A lasting presence.', image: '/media/stone-objects.webp', alt: 'Stone noughts-and-crosses set on a pale wood table', aspect: 'portrait' },
] as const;
export type CollectionId = typeof collections[number]['id'];
export const studies: Record<CollectionId, { title: string; text: string; image: string; alt: string; detail: string; form: string; character: string }> = {
  tables: { title: 'A study in contrast.', text: 'A quiet silhouette. An expressive surface. A side table that brings the character of stone into the everyday.', image: '/media/table-bedroom.webp', alt: 'Sculptural dark stone side table in a softly lit bedroom', detail: '/media/table-detail.webp', form: 'Sculptural side table', character: 'Dark tones · contrasting veins' },
  basins: { title: 'A rhythm, carved in stone.', text: 'Repeated lines give a familiar form a different presence. A fluted basin, seen through the interplay of light and shadow.', image: '/media/black-basin.webp', alt: 'Round black veined stone basin with vertical fluting', detail: '/media/fluted-basin.webp', form: 'Fluted vessel basin', character: 'Dark tones · defined edges' },
  objects: { title: 'An invitation to pause.', text: 'A familiar game becomes an object to leave on display. Pale and dark stone, brought together in a playful composition.', image: '/media/stone-objects.webp', alt: 'Pale stone game pieces arranged on a dark stone board', detail: '/media/objects-detail.webp', form: 'Stone game set', character: 'Contrasting tones · geometric forms' },
};

export const materialStudies = [
  { id: 'dark', label: 'Dark & expressive', image: '/media/black-basin.webp', position: '50% 66%', text: 'High contrast. Veins that become part of the composition.', alt: 'Detail of pale veining across a dark fluted basin' },
  { id: 'warm', label: 'Warm & understated', image: '/media/warm-basin.webp', position: '50% 65%', text: 'Soft, warm tones for a quieter material palette.', alt: 'Detail of the softly patterned surface of a warm pale basin' },
  { id: 'rich', label: 'Rich & individual', image: '/media/fluted-basin.webp', position: '50% 58%', text: 'Deeper colour. A distinctive presence within a space.', alt: 'Detail of a burgundy-toned veined basin' },
] as const;
