
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlanType, SubscriptionData, UserUsage } from '../types';

interface SubscriptionContextType {
  subscription: SubscriptionData;
  usage: UserUsage;
  upgradeToPro: (subscriptionId: string) => void;
  incrementUsage: () => void;
  canProcessFile: (fileSize: number) => { allowed: boolean; reason?: string };
  resetUsage: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscription, setSubscription] = useState<SubscriptionData>(() => {
    const saved = localStorage.getItem('pdfmaster_sub');
    return saved ? JSON.parse(saved) : { plan: 'free', status: 'none' };
  });

  const [usage, setUsage] = useState<UserUsage>(() => {
    const saved = localStorage.getItem('pdfmaster_usage');
    const today = new Date().toISOString().split('T')[0];
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) return parsed;
    }
    return { date: today, count: 0 };
  });

  useEffect(() => {
    localStorage.setItem('pdfmaster_sub', JSON.stringify(subscription));
  }, [subscription]);

  useEffect(() => {
    localStorage.setItem('pdfmaster_usage', JSON.stringify(usage));
  }, [usage]);

  const upgradeToPro = (subscriptionId: string) => {
    setSubscription({
      plan: 'pro',
      paypalSubscriptionId: subscriptionId,
      status: 'active',
      billingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  };

  const incrementUsage = () => {
    setUsage(prev => ({ ...prev, count: prev.count + 1 }));
  };

  const canProcessFile = (fileSize: number): { allowed: boolean; reason?: string } => {
    const sizeInMB = fileSize / (1024 * 1024);
    
    if (subscription.plan === 'pro') {
      if (sizeInMB > 500) return { allowed: false, reason: 'Pro plan limit is 500MB per file.' };
      return { allowed: true };
    }

    // Free Plan Checks
    if (usage.count >= 5) {
      return { allowed: false, reason: 'Daily limit reached (5 files). Upgrade to Pro for unlimited access!' };
    }
    if (sizeInMB > 20) {
      return { allowed: false, reason: 'Free plan limit is 20MB. Upgrade to Pro for up to 500MB!' };
    }

    return { allowed: true };
  };

  const resetUsage = () => {
    setUsage({ date: new Date().toISOString().split('T')[0], count: 0 });
  };

  return (
    <SubscriptionContext.Provider value={{ subscription, usage, upgradeToPro, incrementUsage, canProcessFile, resetUsage }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error('useSubscription must be used within SubscriptionProvider');
  return context;
};
