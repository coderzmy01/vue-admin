import axios from "axios";
import config from "../config/index";
import { ElMessage } from "element-plus";
const NETWORK_ERROR = "网络请求异常,请稍后重试.....";
const instance = axios.create({ baseURL: config.baseApi });
instance.interceptors.request.use((req) => {
  return req;
});
instance.interceptors.response.use((req) => {
  const { code, data, msg } = req.data;
  if (code === 200) {
    return data;
  } else {
    console.log(req);
    ElMessage.error(msg || NETWORK_ERROR);
    return Promise.reject(msg || NETWORK_ERROR);
  }
});
function request({ method, mock, params, data, ...args }) {
  method = method || "get";
  if (method.toLowerCase() === "get") {
    params = data;
  }
  let isMock = config.mock;
  if (typeof mock !== "undefined") {
    isMock = mock;
  }
  if (config.env === "prod") instance.defaults.baseURL = config.baseApi;
  else instance.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  
  return instance({ method, mock, params, data, ...args });
}
export default request;
