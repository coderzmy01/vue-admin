import Mock from "mockjs";
import home from "./data/home";

Mock.mock("/home/getData", home.getTableData);