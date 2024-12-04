export const interceptor = async () => {
  const { fetch: originalFetch } = window;
  window.fetch = async (...args) => {
    let [resource, config, skipAuthTest] = args;

    console.log("Using the interceptor", resource)
    const response = await originalFetch(resource, config);

    if (skipAuthTest) {
      console.log("opts was false");
      return response;
    }

    if (response.status === 401) {
      console.log("Unauthorized, removing token.")
      localStorage.removeItem("authToken");
      return response;
    } else {
      return response;
    }
  };
};