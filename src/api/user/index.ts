import { get, post } from '@utils/http/axios'
import { IResponse } from '@utils/http/axios/type'
import { ReqAuth, ReqParams, ResResult } from './type';
enum URL {
    login = '/api/user/login',
    logout = '/api/user/logout',
    permission = '/api/user/permission',
    profile = '/api/userProfile'
}
interface LoginRes {
    token: string
}
export interface LoginData {
    username: string
    password: string
}

const getUserProfile = async (data: ReqParams) => post<LoginRes>({ url: URL.profile });
const login = async (data: ReqParams) => post<ResResult>({ url: URL.login, data });
const logout = async (data: ReqParams) => post<LoginRes>({ url: URL.logout, data });
const permission = async () => get<ReqAuth>({ url: URL.permission });
export { getUserProfile, logout, login, permission };