import request from "./request";
export function getTableData(params) {
  return request({
    url: "/home/getData",
    method: "get",
    data: params,
    mock: true,
  });
}
export function getCountData() {
  return request({
    url: "/home/countData",
    method: "get",
    mock: true,
  });
}
export function getEchartsData() {
  return request({
    url: "/home/getEchartsData",
    method: "get",
    mock: true,
  });
}
