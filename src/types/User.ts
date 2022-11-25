export interface UserInfo{
    avatarImg: string;
    avatarName: string;
    birthday: string | Date;
    hobby: string;
    personalSignature: string;
    phoneNumber: string;
    sex: number | string;
    userId: number;
    address: string;
}
export interface UserPermissionList{
    permissionName: string;
}
export interface UserList {
    pageNum?: number,
    pageSize?: number
}
export interface UserRegister {
    username: string;
    password: string
    avatarName?: string
    phoneNumber: string
}
export interface UserId{
    userId: number;
}