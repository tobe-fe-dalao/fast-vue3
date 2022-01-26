import request from '../../utils/http/axios'
import { IResponse } from '../../utils/http/axios/type'
import { ReqAuth, ReqParams, ResResult } from './type';
enum URL {
    login = '/v1/user/login',
    permission = '/v1/user/permission',
    userProfile = ''
}
export const getUserProfile = (): Promise<IResponse> => {
    return request('mock/api/userProfile').then(res => res.data);
};