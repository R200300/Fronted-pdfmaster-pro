
import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';

// Declaring paypal on the window object
declare global {
  interface Window {
    paypal: any;
  }
}

interface PayPalButtonProps {
  planId: string;
  onSuccess: (subscriptionId: string) => void;
  onError: (err: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ planId, onSuccess, onError }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonInstance = useRef<any>(null);
  const [sdkError, setSdkError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const renderPayPalButtons = async () => {
      // 1. Check if we can access the host (prevents "Can not read window host" crash)
      try {
        const _host = window.location.host;
        if (!_host) throw new Error("Host inaccessible");
      } catch (e) {
        if (isMounted) setSdkError("Environment restricted: PayPal SDK cannot verify the host domain. Please try in a standard browser tab.");
        return;
      }

      // 2. Check if SDK is available
      if (!window.paypal || !window.paypal.Buttons) {
        console.warn('PayPal SDK not loaded yet.');
        return;
      }

      if (!containerRef.current) return;

      try {
        // Clear previous content
        containerRef.current.innerHTML = '';
        
        buttonInstance.current = window.paypal.Buttons({
          style: {
            shape: 'pill',
            color: 'blue',
            layout: 'vertical',
            label: 'subscribe'
          },
          createSubscription: (data: any, actions: any) => {
            return actions.subscription.create({
              'plan_id': planId
            });
          },
          onApprove: (data: any, actions: any) => {
            if (isMounted) onSuccess(data.subscriptionID);
          },
          onError: (err: any) => {
            // Suppress the specific "Can not read window host" error from bubbling up
            if (err?.message?.includes('window host') || String(err).includes('window host')) {
              if (isMounted) setSdkError("PayPal restricted in this preview environment. Please use a direct browser window.");
            } else {
              if (isMounted) onError(err);
            }
          },
          onCancel: () => {
            console.warn('PayPal payment cancelled');
          }
        });

        if (buttonInstance.current && containerRef.current) {
          await buttonInstance.current.render(containerRef.current);
        }
      } catch (err: any) {
        console.error('Error rendering PayPal buttons:', err);
        if (err?.message?.includes('window host') || String(err).includes('window host')) {
          if (isMounted) setSdkError("Security restriction: PayPal cannot be loaded inside this frame.");
        } else {
          if (isMounted) onError(err);
        }
      }
    };

    // Use a slightly longer delay to ensure the window environment is stable
    const timeoutId = setTimeout(renderPayPalButtons, 800);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (buttonInstance.current && typeof buttonInstance.current.close === 'function') {
        buttonInstance.current.close().catch(() => {});
      }
    };
  }, [planId, onSuccess, onError]);

  // Fallback UI if the SDK is blocked by host-read restrictions (common in sandboxed iframes)
  if (sdkError) {
    return (
      <div className="w-full mt-4 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
        <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-3" />
        <h4 className="text-sm font-bold text-slate-900 mb-1">Checkout Restricted</h4>
        <p className="text-xs text-slate-500 mb-4">{sdkError}</p>
        <button 
          onClick={() => window.open(window.location.href, '_blank')}
          className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700 underline"
        >
          Open in New Tab to Pay <ExternalLink className="w-3 h-3 ml-1" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mt-4">
      <div ref={containerRef} className="min-h-[150px] flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl border border-slate-100 animate-pulse">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Initialising Secure Checkout...</span>
      </div>
    </div>
  );
};

export default PayPalButton;