export const interceptor = async () => {
  const { fetch: originalFetch } = window;
  window.fetch = async (...args) => {
    let [resource, config] = args;

    const token = localStorage.getItem("authToken");
    
    const headers = new Headers(config?.headers)
    if (token) {
      headers.append('Authorization', token)
    }

    const response = await originalFetch(resource, {...config, headers});

    if (response.status === 401) {
      localStorage.removeItem("authToken");
      window.dispatchEvent(new Event("authChange"));
    }

    return response;
  };
};