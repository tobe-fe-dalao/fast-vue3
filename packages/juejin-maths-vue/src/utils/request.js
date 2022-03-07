import axios from "axios";

const service = axios.create({
  timeout: 1000 * 60 * 5, // request timeout
});

const tokenHeader = "authorization"; // token自定义头部名称
service.interceptors.request.use(
  (config) => {
   const token = localStorage.getItem('token');
    if (token) {
      /* eslint-disable no-param-reassign */
      config.headers[tokenHeader] = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (res) => res.data,
  (err) => {
    return Promise.reject(err);
  }
);

export default service;
