import React, { useState } from 'react';
import { Check, Zap, Star, Shield, RefreshCcw, AlertCircle } from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';

const Pricing: React.FC = () => {
  const { subscription, upgradeToPro } = useSubscription();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpgrade = () => {
    // Mocking the upgrade process since the PayPal SDK was removed
    upgradeToPro("mock_subscription_id");
    setIsSuccess(true);
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      description: 'Perfect for casual users and students.',
      features: [
        'Limited to 5 daily files',
        'Basic editing tools',
        'Maximum 20MB file size',
        'Standard conversion speed',
        'Includes subtle watermark',
        'Files deleted after 1 hour'
      ],
      cta: 'Current Plan',
      recommended: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$12',
      period: '/mo',
      description: 'Built for professionals and high-volume work.',
      features: [
        'Unlimited daily usage',
        'All 20+ advanced tools',
        'Maximum 500MB file size',
        'Priority processing (3x faster)',
        'No watermarks, ever',
        'Batch processing enabled',
        'Advanced AI Summarizer'
      ],
      cta: 'Upgrade to Pro',
      recommended: true
    }
  ];

  return (
    <div className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">Simple, transparent pricing</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Choose the plan that fits your needs. Get unlimited access to all professional tools.
          </p>
        </div>

        {isSuccess && (
          <div className="max-w-md mx-auto mb-8 bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl flex items-center animate-in zoom-in">
            <Shield className="w-5 h-5 mr-3 flex-shrink-0" />
            <p className="text-sm font-medium">Subscription activated! Welcome to PDFMaster Pro.</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const isCurrent = subscription.plan === plan.id;
            
            return (
              <div 
                key={plan.name}
                className={`relative bg-white rounded-3xl p-8 border transition-all duration-300 ${
                  plan.recommended 
                    ? 'border-indigo-600 ring-4 ring-indigo-600/10 shadow-2xl shadow-indigo-100' 
                    : 'border-slate-200 shadow-xl shadow-slate-100'
                } ${isCurrent ? 'opacity-90 grayscale-[0.5]' : ''}`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-white" />
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                    {isCurrent && (
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Active</span>
                    )}
                  </div>
                  <div className="flex items-baseline mb-4">
                    <span className="text-5xl font-extrabold text-slate-900">{plan.price}</span>
                    {plan.period && <span className="text-slate-400 font-medium ml-1">{plan.period}</span>}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-600">
                      <div className={`mt-0.5 p-0.5 rounded-full mr-3 ${plan.recommended ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                        <Check className="h-3 w-3" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <div className="w-full py-4 text-center text-slate-400 font-bold bg-slate-50 rounded-2xl border border-slate-100">
                    Current Plan
                  </div>
                ) : (
                  <button 
                    onClick={plan.id === 'pro' ? handleUpgrade : undefined}
                    className={`w-full py-4 rounded-2xl font-bold transition-all ${
                      plan.recommended 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100' 
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {plan.cta}
                  </button>
                )}

                {isCurrent && subscription.billingDate && (
                  <p className="mt-4 text-[10px] text-center text-slate-400 uppercase tracking-widest">
                    Renewing on: {new Date(subscription.billingDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-12 text-center border-t border-slate-200 pt-16">
          <div>
            <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <Shield className="h-6 w-6 text-indigo-600" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Secure Payments</h4>
            <p className="text-sm text-slate-500">We use industry-leading encryption to keep your billing data safe.</p>
          </div>
          <div>
            <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <Zap className="h-6 w-6 text-indigo-600" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Instant Activation</h4>
            <p className="text-sm text-slate-500">Your account is upgraded the moment your payment is processed.</p>
          </div>
          <div>
            <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <RefreshCcw className="h-6 w-6 text-indigo-600" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Cancel Anytime</h4>
            <p className="text-sm text-slate-500">No long-term contracts. You can downgrade your plan at any time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;