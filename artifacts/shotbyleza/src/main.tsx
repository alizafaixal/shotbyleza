import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
  }
}

// GA4 — set VITE_GA4_ID in Replit Secrets to activate
const ga4Id = import.meta.env.VITE_GA4_ID as string | undefined;
if (ga4Id?.startsWith("G-")) {
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
  document.head.appendChild(s);
  s.onload = () => {
    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.gtag = function (...args: any[]) { window.dataLayer.push(args); };
    window.gtag("js", new Date());
    window.gtag("config", ga4Id);
  };
}

createRoot(document.getElementById("root")!).render(<App />);
