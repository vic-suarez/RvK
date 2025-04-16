import React, { createContext, useContext, useState } from 'react';

interface SettingsContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  exchangeRate: number;
  setExchangeRate: (rate: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState('PEN');
  const [exchangeRate, setExchangeRate] = useState(3.7);

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, exchangeRate, setExchangeRate }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 