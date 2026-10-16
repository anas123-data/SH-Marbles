'use client';

import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { emptyInquiry, type BriefReference, type Configuration, type InquiryFields } from './model';

interface Journey {
  configuration: Configuration | null; setConfiguration: Dispatch<SetStateAction<Configuration | null>>;
  fields: InquiryFields; setFields: Dispatch<SetStateAction<InquiryFields>>;
  reference: BriefReference; setReference: Dispatch<SetStateAction<BriefReference>>;
  files: File[]; setFiles: Dispatch<SetStateAction<File[]>>;
  reset: () => void;
}
const JourneyContext = createContext<Journey | null>(null);
export function JourneyProvider({ children }: { children: ReactNode }) {
  const [configuration, setConfiguration] = useState<Configuration | null>(null);
  const [fields, setFields] = useState(emptyInquiry);
  const [reference, setReference] = useState<BriefReference>({});
  const [files, setFiles] = useState<File[]>([]);
  function reset() { setConfiguration(null); setFields(emptyInquiry()); setReference({}); setFiles([]); }
  return <JourneyContext.Provider value={{ configuration, setConfiguration, fields, setFields, reference, setReference, files, setFiles, reset }}>{children}</JourneyContext.Provider>;
}
export function useJourney() {
  const value = useContext(JourneyContext);
  if (!value) throw new Error('Bespoke journey provider is missing.');
  return value;
}
