import { useState, useEffect } from "react";

let _cache: Record<string, string> | null = null;
let _promise: Promise<Record<string, string>> | null = null;

function fetchSettings(): Promise<Record<string, string>> {
  if (_cache) return Promise.resolve(_cache);
  if (_promise) return _promise;
  _promise = fetch("/api/site-settings")
    .then((r) => (r.ok ? r.json() : {}))
    .catch(() => ({}))
    .then((data: Record<string, string>) => {
      _cache = data;
      _promise = null;
      return data;
    });
  return _promise;
}

export function invalidateSiteSettings() {
  _cache = null;
  _promise = null;
}

export function useSiteSettings(): Record<string, string> {
  const [settings, setSettings] = useState<Record<string, string>>(_cache ?? {});
  useEffect(() => {
    fetchSettings().then(setSettings);
  }, []);
  return settings;
}
