import axios from "axios";

const service = axios.create({
  timeout: 1000 * 60 * 5, // request timeout
});

const tokenHeader = "authorization"; // token自定义头部名称
service.interceptors.request.use(
  (config) => {
    const cmq = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsInNvdXJjZSI6Imp1ZWppbiJ9.eyJleHBpcmVBdCI6MTY0MzIwNDMwMSwidXNlcklkIjoiMzUwMTMwOTQzODQ2NjQ2MiIsImlhdCI6MTY0MDYxMjMwMSwiZXhwIjoxNjQzMjA0MzAxfQ.oWghlcpjTam2q-v-ZQsKRp_s0tBd4MXdYUpyrVIwFlx3-jGkaXOAFhOXiJzEpAnqhrGlx5gBcvZcl_MpDyCXtkhCPbhYI23Xp6JSiAfMV6rgpeWPX632uAxdcpHutqJKkJPvGi5J430AgKp8SNpgdrcWOunpvfqPRtZtNlWvpLlrYmtwxATKHPUyXrCW-WgFYP0RtJYI2-5JK8I8UMO4tIFInVZcrTtW8T0BQul-1jtRAElp88pXoZ4ezjHU2gwsp_Mp0y7lDqwqYxlE2f1bW-7GP1abY1Rv0Y-SOweHGj9ErzFtmGJiZoT4myI38e-kjl7yDzRT-99qMDTA4U05zg";
    const token = localStorage.getItem('token') || cmq;
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
