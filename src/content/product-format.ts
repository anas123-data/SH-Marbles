import type { Product } from './catalogue-models';

export function formatPrice(price: NonNullable<Product['price']>) {
  return `${price.currency} ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(price.amount)}`;
}

export function productPriceLabel(product: Pick<Product, 'price' | 'variants'>) {
  if (product.variants?.length) {
    const lowest = product.variants.reduce((a, b) => a.price.amount <= b.price.amount ? a : b);
    return `From ${formatPrice(lowest.price)}`;
  }
  return product.price ? formatPrice(product.price) : null;
}

export function formatDimensions(dimensions: NonNullable<Product['dimensions']>) {
  const unit = dimensions.unit === 'in' ? 'inches' : 'mm';
  if (dimensions.diameter !== undefined) return `${dimensions.diameter} ${unit} diameter${dimensions.depth !== undefined ? ` × ${dimensions.depth} ${unit} deep` : ''}${dimensions.height !== undefined ? ` × ${dimensions.height} ${unit} high` : ''}`;
  return ([['length', 'L'], ['width', 'W'], ['depth', 'D'], ['height', 'H']] as const)
    .filter(([key]) => dimensions[key] !== undefined)
    .map(([key, label]) => `${dimensions[key]} ${label}`).join(' × ') + ` ${unit}`;
}
