'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useJourney } from '@/features/bespoke/journey-provider';
import type { BriefReference, InquiryFields } from '@/features/bespoke/model';
import { Arrow } from './ui';

/** Carry known context in memory, never personal data in the URL. */
export function BriefLink({ children, reference, interest, sector, className = 'cinema-primary' }: { children: ReactNode; reference?: BriefReference; interest?: InquiryFields['interest']; sector?: InquiryFields['sector']; className?: string }) {
  const journey = useJourney();
  return <Link className={className} href="/bespoke/inquiry" onClick={event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (reference) journey.setReference(reference);
    journey.setFields(previous => ({ ...previous, ...(interest ? { interest } : {}), ...(sector ? { sector } : {}) }));
  }}>{children}<Arrow /></Link>;
}
