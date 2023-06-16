import request from "./request";
export const getUserInfo = (params) => {
  return request({
    url: "/user/getData",
    method: "get",
    mock: false,
    data: params,
  });
};
export const createUserInfo = (params) => {
  return request({
    url: "/user/postUser",
    method: "post",
    mock: false,
    data: params,
  });
};
