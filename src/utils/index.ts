/*
 * @GitHub: https://github.com/MaleWeb/fast-vue3
 * @version:
 * @Author: 扫地盲僧
 * @Date: 2022-01-19 21:11:23
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-19 22:33:26
 */
import request from "./http/axios"
const getGithubVersion = (url: string) => {
  return request(url)
};
export default getGithubVersion;
