export interface User {
    id: number
    roleName: string
}
export interface Permission {
    id: number;
    permissionName: string;
    pid: number;
}
//格式化后的接口定义
export interface FormatPermission extends Permission {
    children: Permission[]
}