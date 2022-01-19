/*
 * @GitHub: https://github.com/MaleWeb/vvtp
 * @version: 
 * @Author: 扫地盲僧
 * @Date: 2022-01-19 21:11:23
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-19 21:22:37
 */
import request from '@/utils/http/axios';
const getGithubVersion = (url: string) => {
    return request(url);
}
export default getGithubVersion;