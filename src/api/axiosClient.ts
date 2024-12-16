"use client";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AWS_MAIN_APIGATEWAY_URL,
});

axiosClient.interceptors.request.use((config) => {

  const headersConf = config.headers;
  headersConf.set('Authorization', `Bearer 
`);
  headersConf["Content-Type"] = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  config.headers = headersConf;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    console.log('error')
    console.log(error);
    return Promise.reject(error); // Propagate the error
  }
);

export default axiosClient;
