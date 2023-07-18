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
export const updateUserInfo = (params) => {
  return request({
    url: "/user/updateUser",
    method: "post",
    mock: false,
    data: params,
  });
};
export const DeleteUserInfo = (params) => {
  return request({
    url: "/user/deleteUserInfo",
    method: "get",
    mock: false,
    data: params,
  });
};
export const UsrLogin = (params) => {
  return request({
    url: "/permission/userLogin",
    method: "post",
    mock: false,
    data: params,
  });
};
