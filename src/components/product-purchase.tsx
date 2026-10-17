'use client';

import { useState } from 'react';
import type { Product } from '@/content/catalogue-models';
import { formatDimensions, formatPrice } from '@/content/product-format';
import { ProjectButton } from './project-dialog';

type Props = Pick<Product, 'title' | 'price' | 'variants'> & { material?: string; interest: string };

export function ProductPurchase({ title, price, variants, material, interest }: Props) {
  const [selectedId, setSelectedId] = useState(variants?.[0]?.id);
  const selected = variants?.find(variant => variant.id === selectedId);
  const currentPrice = selected?.price ?? price;
  const piece = selected ? `${title} — ${formatDimensions(selected.dimensions)} — ${formatPrice(selected.price)}` : title;
  return <div className="product-purchase">
    {variants?.length ? <fieldset className="product-sizes"><legend>Choose your size</legend>{variants.map(variant => <label key={variant.id}>
      <input type="radio" name="product-size" value={variant.id} checked={selectedId === variant.id} onChange={() => setSelectedId(variant.id)} />
      <span>{formatDimensions(variant.dimensions)}<small>{formatPrice(variant.price)}</small></span>
    </label>)}</fieldset> : null}
    {currentPrice && <p className="product-price" aria-live="polite" aria-atomic="true">{formatPrice(currentPrice)}</p>}
    <div className="product-actions">
      <ProjectButton interest={interest} context={{ piece, material, intent: currentPrice ? 'Product enquiry' : 'Price enquiry' }}>{currentPrice ? 'Enquire about this piece' : 'Request price'}</ProjectButton>
      <ProjectButton interest={interest} context={{ piece, material, intent: 'Customization enquiry' }} className="button button-outline">Customize this piece</ProjectButton>
    </div>
  </div>;
}
