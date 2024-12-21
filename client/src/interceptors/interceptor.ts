type ExtendedFetchProps = RequestInit & {
  input: RequestInfo | URL;
  init?: RequestInit & {
    skipAuthTest: Boolean;
  };
}

export const interceptor = async () => {
  const { fetch: originalFetch } = window;
  window.fetch = async (...args) => {
    let [resource, config] = args;
    const response = await originalFetch(resource, config);

    if (config.skipAuthTest) {
      console.log("Skipping reponse Authenticaion error test.");
      return response;
    }

    if (response.status === 401) {
      localStorage.removeItem("authToken");
      window.dispatchEvent(new Event("authChange"));
      return response;
    } else {
      return response;
    }
  };
};