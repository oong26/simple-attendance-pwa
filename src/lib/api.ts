export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

type FetchOptions = RequestInit & {};

export async function fetchApi(endpoint: string, options: FetchOptions = {}) {
  const { ...fetchOptions } = options;

  const headers = new Headers(fetchOptions.headers || {});

  // Add API Key
  if (API_KEY) {
    headers.set("X-API-KEY", API_KEY);
  }

  // Accept JSON
  headers.set("Accept", "application/json");

  const url = `${API_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  return response;
}
