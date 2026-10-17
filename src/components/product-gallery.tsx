'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { CatalogueImage } from '@/content/catalogue-models';

export function Gallery({ images, title, label = 'Form study' }: { images: CatalogueImage[]; title: string; label?: string }) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const active = images[selected];
  useEffect(() => { if (!open) return; const old = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = old; }; }, [open]);
  return <div className="product-gallery"><div className={`gallery-stage ${active.detail ? 'gallery-detail' : ''}`}><Image src={active.src} alt={active.alt} fill preload={selected === 0} sizes="(max-width: 767px) 100vw, 58vw" style={{ objectPosition: label === 'Product gallery' ? 'center' : active.position, objectFit: label === 'Product gallery' ? 'contain' : undefined }} /><button type="button" className="gallery-enlarge" ref={opener} onClick={() => { dialog.current?.showModal(); setOpen(true); }}>View full image <span aria-hidden="true">↗</span></button></div><div className="gallery-caption"><p role="status">{String(selected + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')} — {active.caption}</p><span>{label}</span></div><div className="gallery-thumbnails" role="group" aria-label={`${title} images`}>{images.map((image, index) => <button key={`${image.src}-${index}`} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} aria-label={`View image ${index + 1}: ${image.caption}`}><Image src={image.src} alt="" fill sizes="80px" style={{ objectPosition: image.position, transform: image.detail ? 'scale(1.7)' : undefined }} /></button>)}</div><dialog ref={dialog} className="image-dialog" aria-label={`${title} full source image`} onClose={() => { setOpen(false); opener.current?.focus(); }}><div className="image-dialog-bar"><p>Full supplied image · {selected + 1} / {images.length}</p><button type="button" className="icon-button" aria-label="Close full image" onClick={() => dialog.current?.close()}>×</button></div><div className="image-dialog-image">{open && <Image src={active.src} alt={active.alt} fill sizes="90vw" />}</div><div className="image-dialog-controls"><button type="button" onClick={() => setSelected((selected + images.length - 1) % images.length)}>← Previous</button><button type="button" onClick={() => setSelected((selected + 1) % images.length)}>Next →</button></div></dialog></div>;
}
