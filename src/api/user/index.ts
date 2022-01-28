// 权限问题后期增加
// import { get, post } from '@utils/http/axios'
import { IResponse } from '@utils/http/axios/type'
import { ReqAuth, ReqParams, ResResult } from './types';
import { UserState } from '@/store/modules/user/types';
import axios from 'axios';
enum URL {
    login = '/api/user/login',
    logout = '/api/user/logout',
    profile = '/api/userProfile'
}
interface LoginRes {
    token: string
}
export interface LoginData {
    username: string;
    password: string;
}

const getUserProfile = async () => axios.get<UserState>(URL.profile);
const login = async (data: LoginData) => axios.post<ResResult>(URL.login, data);
const logout = async () => axios.post<LoginRes>(URL.logout);
export { getUserProfile, logout, login };