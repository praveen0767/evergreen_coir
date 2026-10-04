import React, { createContext, useContext, useState, useEffect } from 'react';

interface Customer {
  id: number;
  name: string;
  mobile: string;
}

interface AuthContextType {
  customer: Customer | null;
  setCustomer: (customer: Customer | null) => void;
  logout: () => void;
  isLoginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
}

const STORAGE_KEY = 'evergreen_customer';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customer, setCustomerState] = useState<Customer | null>(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCustomerState(JSON.parse(stored));
    } catch (error) {
      console.error('Failed to restore customer session:', error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const setCustomer = (cust: Customer | null) => {
    setCustomerState(cust);
    if (cust) localStorage.setItem(STORAGE_KEY, JSON.stringify(cust));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const logout = () => setCustomer(null);

  return (
    <AuthContext.Provider
      value={{ customer, setCustomer, logout, isLoginModalOpen, setLoginModalOpen }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
