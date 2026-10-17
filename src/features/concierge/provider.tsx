'use client';

import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { emptyPreferences, type Preferences, type Recommendation } from './model';

interface Consultation {
  preferences:Preferences;setPreferences:Dispatch<SetStateAction<Preferences>>;
  result:Recommendation|null;setResult:Dispatch<SetStateAction<Recommendation|null>>;
  step:number;setStep:Dispatch<SetStateAction<number>>;
}
const Context=createContext<Consultation|null>(null);
/** Per-tab memory only. Survives client navigation; a refresh clears the consultation. */
export function ConciergeProvider({children}:{children:ReactNode}) {
  const [preferences,setPreferences]=useState(emptyPreferences);
  const [result,setResult]=useState<Recommendation|null>(null);
  const [step,setStep]=useState(0);
  return <Context.Provider value={{preferences,setPreferences,result,setResult,step,setStep}}>{children}</Context.Provider>;
}
export function useConsultation(){const value=useContext(Context);if(!value)throw new Error('Concierge context is missing.');return value;}
