export interface UserInfo{
    userId:number
    avatarImg?: string
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
