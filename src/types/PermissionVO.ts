import type{ Permission } from "./Permission";
//格式化后的接口定义
export default interface PermissionVO extends Permission {
    children: Permission[]
}

