'use client';

import Script from 'next/script';
import { useCallback, useId, useState } from 'react';

declare global {
  interface Window {
    PayPal?: {
      Donation?: {
        Button: (options: {
          env: 'production';
          hosted_button_id: string;
          image: { src: string; title: string; alt: string };
        }) => { render: (selector: string) => void };
      };
    };
  }
}

export function PayPalDonateButton({ hostedButtonId, fallbackUrl }: { hostedButtonId: string; fallbackUrl: string }) {
  const containerId = `paypal-donate-${useId().replaceAll(':', '')}`;
  const [ready, setReady] = useState(false);

  const renderButton = useCallback(() => {
    const container = document.getElementById(containerId);
    if (!container || container.childElementCount || !window.PayPal?.Donation) return;

    window.PayPal.Donation.Button({
      env: 'production',
      hosted_button_id: hostedButtonId,
      image: {
        src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
        title: 'Donate securely with PayPal',
        alt: 'Donate securely with PayPal',
      },
    }).render(`#${containerId}`);
    setReady(true);
  }, [containerId, hostedButtonId]);

  return (
    <div className="paypal-donate-widget">
      <Script src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js" strategy="afterInteractive" onReady={renderButton} />
      <div id={containerId} />
      {!ready && <a className="paypal-fallback" href={fallbackUrl}>Donate securely with PayPal</a>}
    </div>
  );
}
