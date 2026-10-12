'use client';

import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/content/home';
import { Arrow, Wordmark } from './ui';
import { ProjectButton } from './project-dialog';

export function Header() {
  const menu = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  function close() { menu.current?.close(); }
  return <>
    <header className="site-header shell">
      <a href="#home" className="brand-link"><Wordmark /></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      <div className="header-action"><ProjectButton className="text-link">Start a project</ProjectButton></div>
      <button ref={menuButton} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => { menu.current?.showModal(); setOpen(true); }}>Menu<span className="menu-lines" aria-hidden="true"><i /><i /></span></button>
    </header>
    <dialog id="mobile-menu" ref={menu} className="menu-dialog" aria-label="Main navigation" onClose={() => { setOpen(false); menuButton.current?.focus(); }}>
      <div className="menu-dialog-top"><Wordmark /><button type="button" className="icon-button" onClick={close} aria-label="Close menu">×</button></div>
      <nav aria-label="Mobile navigation">{navigation.map((item, index) => <a key={item.href} href={item.href} onClick={close}><span className="eyebrow">0{index + 1}</span>{item.label}<Arrow /></a>)}<a href="#project" onClick={close}><span className="eyebrow">05</span>Start a project<Arrow /></a></nav>
      <p className="menu-footnote">Stone, given purpose.<br /><span>Tables · Basins · Objects · Bespoke</span></p>
    </dialog>
  </>;
}
