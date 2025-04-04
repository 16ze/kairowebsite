"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

// Remplacer par votre ID de mesure Google Analytics
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

// Fonction pour envoyer des pageviews à GA4
export const pageview = (url: string) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Fonction pour suivre les événements spécifiques
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Définition des types pour l'objet window avec gtag
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "consent" | "set",
      targetId: string,
      config?: Record<string, unknown> | undefined
    ) => void;
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Suivi des changements de page
  useEffect(() => {
    if (pathname && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
      const url = pathname + searchParams.toString();
      pageview(url);
    }
  }, [pathname, searchParams]);

  if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    console.warn("Google Analytics ID non configuré");
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure',
            });
          `,
        }}
      />
    </>
  );
}
