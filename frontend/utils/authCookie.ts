const COOKIE = "_token";

export default {
  setToken(token: string): void {
    useCookie(COOKIE).value = token;
  },

  getToken(): string | null | undefined {
    return useCookie(COOKIE).value;
  },

  deleteToken(token: string): void {
    useCookie(COOKIE).value = null;
  },
};
