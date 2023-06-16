import Mock from "mockjs";
import home from "./data/home";
import user from "./data/user";

Mock.mock("/home/getData", home.getTableData);
Mock.mock(/user\/getData/, "get", user.getUserList);
Mock.mock(/user\/postUser/, "post", user.createUser);
Mock.mock(/user\/postUser/, "post", user.createUser);
