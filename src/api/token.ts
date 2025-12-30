let accessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;

export const tokenStore = {
  get: () => accessToken,

  set: (token: string) => {
    accessToken = token;
    refreshPromise = null;
  },

  clear: () => {
    accessToken = null;
    refreshPromise = null;
  },

  getRefreshPromise: () => refreshPromise,
  setRefreshPromise: (p: Promise<string | null> | null) => {
    refreshPromise = p;
  },
};
