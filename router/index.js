import TestAPI from './test.js';
import WechatAPI from './wechat.js';
import UsersAPI from './users.js'

// 定义api路由前缀
export const api = {
  prefix: '/api/v1',
  test: '/test',
  wechat: '/wechat',
  users: '/users'
};

export const RouterInit = (app) => {
  app.use(api.prefix + api.test, TestAPI);
  app.use(api.prefix + api.wechat, WechatAPI);
  app.use(api.prefix + api.users, UsersAPI);
};