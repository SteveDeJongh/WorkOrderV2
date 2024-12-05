export const interceptor = async () => {
  const { fetch: originalFetch } = window;
  window.fetch = async (...args) => {
    let [resource, config, skipAuthTest] = args;
    const response = await originalFetch(resource, config);

    if (skipAuthTest) {
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