import { REFRESH_TOKEN_KEY, TOKEN_KEY, TOKEN_PREFIX } from '@fast-vue3/shared';

const sessionExpiredListeners = new Set<() => void>();

export function getToken(): null | string {
  const token = localStorage.getItem(TOKEN_KEY);
  return token?.trim() ? token : null;
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getRefreshToken(): null | string {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setRefreshToken(token: string): void {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function getAuthHeader(): null | string {
  const token = getToken();
  return token ? `${TOKEN_PREFIX}${token}` : null;
}

/** Subscribe without coupling the HTTP client to stores or a router. */
export function onSessionExpired(listener: () => void): () => void {
  sessionExpiredListeners.add(listener);
  return () => sessionExpiredListeners.delete(listener);
}

/** Ignore a late 401 from an older session, or an unauthenticated request. */
export function expireSession(authorization: null | string): boolean {
  if (!authorization || authorization !== getAuthHeader()) return false;
  clearToken();
  for (const listener of sessionExpiredListeners) listener();
  return true;
}
