const env = import.meta.env.MODE || "prod";
const EnvConfig = {
  development: {
    baseApi: "/api",
    mockApi:
      "https://www.fastmock.site/mock/7029fc7122085de783bb7501c6e49acc/admin",
  },
  test: {
    baseApi: "/test",
    mockApi:
      "https://www.fastmock.site/mock/7029fc7122085de783bb7501c6e49acc/admin",
  },
  pro: {
    baseApi: "future",
    mockApi:
      "https://www.fastmock.site/mock/7029fc7122085de783bb7501c6e49acc/admin",
  },
};
export default {
  env,
  mock: false,
  ...EnvConfig[env],
};
