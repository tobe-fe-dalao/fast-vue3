import request from '@utils/http/axios'
import { IResponse } from '@utils/http/axios/type'
import { ReqAuth, ReqParams, ResResult } from './type';
enum URL {
    login = '/v1/user/login',
    permission = '/v1/user/permission',
    userProfile = 'mock/api/userProfile'
}
const getUserProfile = async () => request<ReqAuth>({ url: URL.userProfile });
const login = async (data: ReqParams) => request({ url: URL.login, data });
const permission = async () => request<ReqAuth>({ url: URL.permission });
export default { getUserProfile, login, permission };