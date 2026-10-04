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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customer, setCustomerState] = useState<Customer | null>(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    // Load from local storage
    const stored = localStorage.getItem('evergreen_customer');
    if (stored) {
      setCustomerState(JSON.parse(stored));
    }
  }, []);

  const setCustomer = (cust: Customer | null) => {
    setCustomerState(cust);
    if (cust) {
      localStorage.setItem('evergreen_customer', JSON.stringify(cust));
    } else {
      localStorage.removeItem('evergreen_customer');
    }
  };

  const logout = () => {
    setCustomer(null);
  };

  return (
    <AuthContext.Provider value={{ 
        customer, 
        setCustomer, 
        logout,
        isLoginModalOpen,
        setLoginModalOpen 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
