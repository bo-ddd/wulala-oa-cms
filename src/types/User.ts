export interface User {
    id: number
    date: string
    name: string
    address: string
    hasChildren?: boolean
    children?: User[]
}

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
export interface UserInfoForm {
    avatarName: string;
    birthday: Date | number | null;
    hobby: string;
    personalSignature: string;
    phoneNumber: string;
    sex: number | string;
    userId: number;
    address: string;
}
export interface Form {
    deptId: number | null,
    depName: string,
    searchDepId: number | null,
    userId: number,
    rolesId: number | null,
    userName: string
}
export interface UserRolesInfo extends UserInfo{
    roles: []
}
export interface DepartmentList {
    id: number,
    name: string
}
export interface UserDepartmentList {
    deptId: number,
    deptName: string
}
export interface RoleList {
    id: number,
    roleName: string
}
export interface RoleList {
    id: number,
    roleName: string
}
