export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
    name?: string,
    avatar?: string,
    organization?: string,
    location?: string,
    email?: string,
    blogJuejin?: string,
    blogZhihu?: string,
    blogGithub?: string,
    profileBio?: string,
    devLanguages?: string
    role?: RoleType,
}