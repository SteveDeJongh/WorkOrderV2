export const API_URL = import.meta.env.NODE_ENV === "test" ?
"http://mocked-api-url" : import.meta.env.VITE_API_URL;
export const HOST_URL = "http://localhost:3000"