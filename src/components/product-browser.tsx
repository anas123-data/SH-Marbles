'use client';

import { useState } from 'react';
import type { Product } from '@/content/catalogue-models';
import { ProductCard } from './catalogue-ui';

export function ProductBrowser({ products, showCategories = false }: { products: readonly Product[]; showCategories?: boolean }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const query = search.trim().toLocaleLowerCase();
  const filtered = products.filter(product => (category === 'all' || product.category === category) && `${product.title} ${product.fullTitle ?? ''} ${product.stone ?? ''} ${product.subcategory ?? ''} ${product.form} ${product.character}`.toLocaleLowerCase().includes(query));
  function reset() { setSearch(''); setCategory('all'); }
  return <div className="product-browser"><div className="catalogue-controls"><div className="filter-field search-field"><label htmlFor="piece-search">Find a piece</label><input type="search" id="piece-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search form, colour or name" maxLength={80} /></div>{showCategories && <div className="filter-field"><label htmlFor="piece-category">Collection</label><select id="piece-category" value={category} onChange={event => setCategory(event.target.value)}><option value="all">All collections</option><option value="tables">Tables</option><option value="basins">Wash Basins</option><option value="objects">Objects</option></select></div>}<p className="result-count" role="status">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} to explore</p>{(search || category !== 'all') && <button className="filter-reset" type="button" onClick={reset}>Clear filters</button>}</div>{filtered.length > 0 ? <div className="product-grid">{filtered.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div> : <div className="empty-results"><h3>A different direction?</h3><p>No pieces match these filters. Try a colour or form, or return to the full selection.</p><button className="button button-outline" onClick={reset} type="button">Show all pieces</button></div>}</div>;
}
