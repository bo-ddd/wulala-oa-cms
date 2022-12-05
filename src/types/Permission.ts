export interface Permission {
    id: number;
    permissionName: string;
    pid: number;
}
export interface UpdatePermission extends Permission { };
export interface FormatData extends Permission { //处理数据结构后的权限列表
    children: Permission[]
}
export interface Tree { //无限级树形嵌套;
    id: number,
    permissionName: string,
    pid: number,
    children: Tree[]
}
export interface RolePermission {
    permissionId: number,
    permissionName: string
}