/*
 * @GitHub: https://github.com/MaleWeb/fast-vue3
 * @version:
 * @Author: 扫地盲僧
 * @Date: 2022-01-19 20:02:33
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-19 20:39:43
 */
// 返回res.data的interface
export interface IResponse {
  code: number | string;
  data: any;
  msg: string;
}

/**用户登录 */
export interface ILogin {
  /** 账户名称 */
  username: string;
  /** 账户密码 */
  password: string;
}
