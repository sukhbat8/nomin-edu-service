import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response.status === 401) {
      localStorage.clear();
      window.location = "/";
    }
    return Promise.reject(err);
  }
);
