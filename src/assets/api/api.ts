import axios from "./http";
import type { UserList, UserRegister } from "@/types/User";
import type { UpdatePermission } from "@/types/Permission";
import type { CreateLeave, ExamineUserLeave } from "@/types/Leave";
import type { CreatedTask } from "@/types/Task";
import type{ Result } from "@/types/Result";
/**
* @description 登录接口
* @param payload
* @param payload.username  string  用户名
* @param payload.password  string 密码
**/
export function loginApi(payload = {}): Promise<Result> {
    return axios.post('/user/login', payload)
}
/**
* @description 获取请假列表接口
* @param payload
* @param payload.userId  string  用户id
* @param payload.reason  string 请假原因
* @param payload.startTime  string  
* @param payload.endTime  string  
**/
export function getLeaveListApi(payload = {}): Promise<Result> {
    return axios.post('/user/leave/list', payload)
}
/**
* @description 请假申请接口
* @param payload
* @param payload.reason  string  请假原因
* @param payload.userId  string  用户id
* @param payload.subject  string 
* @param payload.endTime  string  
**/
export function createLeaveApi(payload: CreateLeave): Promise<Result> {
    return axios.post('/user/leave/create', payload)
}
/**
* @description 用户注册接口
* @param payload
* @param payload.username  string  用户名
* @param payload.password  string 密码
* @param payload.avatarName  string  昵称
* @param payload.phoneNumber  string  手机号
**/
export function registerApi(payload: UserRegister) {
    return axios.post('/user/register', payload)
}
/**
* @description 获取用户列表接口
* @param payload
* @param payload.pageNum  string  非必填，如果不传则为1
* @param payload.pageSize  string 标题每页展示多少条数据
**/
export function getUserListApi(payload: UserList) {
    return axios.post('/user/list', payload)
}
/**
* @description 发送邮件的接口
* @param payload
* @param payload.userId  string  如果不传,查询的是自己的用户信息，
**/
export function queryUserInfoApi(payload = {}) {
    return axios.post('/user/info', payload)
}
/**
* @description 修改用户信息接口
* @param payload
* @param payload.userId  string  
* @param payload.avatarImg  string 
* @param payload.phoneNumber  string  
* @param payload.avatarName  string  
* @param payload.sex  string   1 男 0女
* @param payload.birthday  string  生日
* @param payload.personalSignature  string  个性签名
* @param payload.hobby  string   爱好
* @param payload.address  string   详细地址
**/
export function updateUserInfoApi(payload = {}) {
    return axios.post('/user/update', payload)
}
/**
* @description 获取权限列表的接口
**/
export function getPermissionListApi(payload = {}) {
    return axios.post('/permission/list', payload)
}
/**
* @description 新增权限的接口
* @param payload
* @param payload.permissionName  string  权限名称
* @param payload.pid  number  如果是0 为最外层父级，不为0 则为子级 *
**/
export function addPermissionApi(payload = {}) {
    return axios.post('/permission/add', payload)
}
/**
* @description 修改权限的接口
* @param payload
* @param payload.id  string  必填
* @param payload.permissionName  string 新修改的权限名称
* @param payload.pid  string  如果是0 为最外层父级，不为0 则为子级   必填
**/
export function updatePermissionApi(payload: UpdatePermission) {
    return axios.post('/permission/update', payload)
}
/**
* @description 发送邮件的接口
* @param payload
* @param payload.id  string  用户 id
**/
export function deletePermissionApi(payload = {}) {
    return axios.post('/permission/delete', payload)
}
/**
* @description 请假审核接口
* @param payload
* @param payload.id  string  邮件接收人
* @param payload.auditStatus  string 标题
**/
export function examineUserLeaveApi(payload: ExamineUserLeave) {
    return axios.post('/user/leave/examine', payload)
}
/**
* @description 给用户添加角色接口
* @param payload
* @param payload.userId  string  用户id
* @param payload.roleId  string  角色id
**/
export function addUserRoleApi(payload = {}) {
    return axios.post('/user/addRole', payload)
}
/**
* @description 删除用户角色接口
* @param payload
* @param payload.to  string  邮件接收人
* @param payload.subject  string 标题
* @param payload.context  string  内容
**/
export function deleteUserRoleApi(payload = {}) {
    return axios.post('/user/deleteRole', payload)
}
/**
* @description 查询用户权限列表接口
* @param payload
* @param payload.userId  string  
**/
export function permissionUserListApi(payload = {}) {
    return axios.post('/user/permission/list', payload)
}
/**
* @description 获取角色列表接口
* @param payload
*
**/
export function getRoleListApi(payload = {}) {
    return axios.post('/role/list', payload)
}
/**
* @description 创建角色接口
* @param payload
* @param payload.roleName  string  角色名称
**/
export function createRoleApi(payload = {}) {
    return axios.post('/role/create', payload)
}
/**
* @description 删除角色接口
* @param payload
* @param payload.id  string  id
* @param payload.subject  string 标题
* @param payload.context  string  内容
**/
export function deleteRoleApi(payload = {}) {
    return axios.post('/role/delete', payload)
}
/**
* @description 给角色添加权限接口
* @param payload
* @param payload.roleId  number  角色id
* @param payload.permissionId  number 权限id
**/
export function addPermissionRoleApi(payload = {}) {
    return axios.post('/role/addPermission', payload)
}
/**
* @description 查询某角色所拥有的权限接口
* @param payload
* @param payload.roleId  number  角色id
**/
export function queryRolePermissionListApi(payload = {}) {
    return axios.post('/role/permission/list', payload)
}
/**
* @description 发送邮件的接口
* @param payload
* @param payload.id  number  
**/
export function deletePermissionRoleApi(payload = {}) {
    return axios.post('/role/deletePermission', payload)
}
/**
* @description 创建文章接口
* @param payload
* @param payload.title  string  标题
* @param payload.content  string  内容
* @param payload.context  string  内容
**/
export function createArticleApi(payload = {}) {
    return axios.post('/article/create', payload)
}
/**
* @description 获取文章列表接口
* @param payload
* @param payload.pageSize  string  每页条数
* @param payload.pageNum  string 第几页
**/
export function getArticleListApi(payload = {}) {
    return axios.post('/article/list', payload)
}
/**
* @description 增加部门
* @param payload
* @param payload.name  string  邮件接收人
* @param payload.subject  string 标题
* @param payload.context  string  内容
**/
export function createDeptApi(payload = {}) {
    return axios.post('/dept/create', payload)
}
/**
* @description 删除部门
* @param payload
* @param payload.id  number  
**/
export function deleteDeptApi(payload = {}) {
    return axios.post('/dept/delete', payload)
}
/**
* @description 修改部门
* @param payload
* @param payload.id  string  
**/
export function updateDeptApi(payload = {}) {
    return axios.post('/dept/update', payload)
}
/**
* @description 获取部门列表
* @param payload
**/
export function getDeptListApi(payload = {}) {
    return axios.post('/dept/list', payload)
}
/**
* @description 给用户添加组
* @param payload
* @param payload.userId  number  用户id
* @param payload.deptId  number 部门(组)
**/
export function addUserDeptApi(payload = {}) {
    return axios.post('/user/dept/add', payload)
}
/**
* @description 删除用户对应的组
* @param payload
* @param payload.userId  number 
* @param payload.deptId  number 部门(组）
**/
export function deleteUserDeptApi(payload = {}) {
    return axios.post('/user/dept/delete', payload)
}
/**
* @description 获取用户所在的组列表
* @param payload
* @param payload.userId  number  
**/
export function getUserDeptListApi(payload = {}) {
    return axios.post('/user/dept/list ', payload)
}
/**
* @description 创建任务
* @param payload
* @param payload.taskName  string  任务名称
* @param payload.description  string 任务描述
* @param payload.level  string  任务等级 0: 普通 1: 紧急
* @param payload.sort  string  排序
**/
export function createTaskApi(payload: CreatedTask) {
    return axios.post('/task/create', payload)
}
/**
* @description 查询任务列表
* @param payload
* @param payload.taskName   string
**/
export function getTaskListApi(payload = {}) {
    return axios.post('/task/list', payload)
}
/**
* @description 修改任务列表
* @param payload
* @param payload.id  number  id
* @param payload.description  string  描述
* @param payload.level  number  紧急程度
* @param payload.sort  number  排序
**/
export function updateTaskApi(payload = {}) {
    return axios.post('/task/update', payload)
}
/**
* @description 删除任务
* @param payload
* @param payload.id   number  任务id
**/
export function deleteTaskApi(payload = {}) {
    return axios.post('/task/delete', payload)
}
/**
* @description 获取用户任务列表
* @param payload
**/
export function getUserTaskListApi(payload = {}) {
    return axios.post('/user/task/list', payload)
}
/**
* @description 发布任务
* @param payload
* @param payload.userId  number  用户id
* @param payload.taskId  number  任务id
**/
export function publishTaskApi(payload = {}): Promise<Result> {
    return axios.post('/task/publish', payload)
}
/**
* @description 修改我的任务状态
* @param payload
* @param payload.taskId  number  任务id
* @param payload.status  number  /0: 未开始 1：进行中 2：已完成 3 已过期
**/
export function setUserTaskStatusApi(payload = {}) {
    return axios.post('/user/task/status/set', payload)
}
/**
* @description 查询组中所有的用户
* @param payload
* @param payload.deptId  number  部门id
**/
export function queryUserMembersApi(payload = {}) {
    return axios.post('/user/dept/members', payload)
}
/**
* @description 查询我发布的消息
* @param payload
**/
export function queryMessageListApi(payload = {}) {
    return axios.post('/message/list', payload)
}
/**
* @description * 发送消息
* @param payload
* @param payload.userId  number  用户id
* @param payload.msgId  number  消息id
**/
export function sendMessageApi(payload = {}) {
    return axios.post('/message/send', payload)
}
/**
* @description 修改消息
* @param payload
* @param payload.id  number  id
* @param payload.content  string 内容
**/
export function updateMessageApi(payload = {}) {
    return axios.post('/message/update', payload)
}
/**
* @description 新增消息通知
* @param payload
* @param payload.content  string  内容
**/
export function createMessageApi(payload = {}) {
    return axios.post('/message/create', payload)
}
/**
* @description 设置消息状态为已读
* @param payload
* @param payload.id  number
**/
export function setStatusMessageApi(payload = {}) {
    return axios.post('/user/message/status/set', payload)
}
/**
* @description 获取我的消息列表
* @param payload
**/
export function getUserMessageApi(payload = {}) {
    return axios.post('/user/message/list', payload)
}
/**
* @description 离职申请
* @param payload
* @param payload.userId  string  用户id
* @param payload.quitTime  string 离职时间
* @param payload.reason  string  离职人
**/
export function userQuitApplyApi(payload = {}) {
    return axios.post('/user/quit/apply', payload)
}/**
* @description 获取离职员工列表
* @param payload
**/
export function getQuitListApi(payload = {}) {
    return axios.post('/user/quit/list', payload)
}/**
* @description 离职审核
* @param payload
* @param payload.id  number  离职id
* @param payload.status  number /0: 待审核 1： 审核通过 2： 拒绝
**/
export function quitUserExamineApi(payload = {}) {
    return axios.post('/user/quit/examine', payload)
}
/**
* @description 发送邮件的接口
* @param payload
* @param payload.to  string  邮件接收人
* @param payload.subject  string 标题
* @param payload.context  string  内容
**/
export function sendMailApi(payload = {}) {
    return axios.post('/mail/send', payload)
}
/**
* @description 修改密码接口
* @param payload
* @param payload.password  number 
**/
export function updatePasswordApi(payload = {}) {
    return axios.post('/user/password/update', payload)
}
/**
* @description 上传附件 通常是员工的审核资料相关的文件
* @param payload
* @param payload.file  string  
**/
export function uploadEnclosureApi(payload = {}) {
    return axios.post('/upload/enclosure', payload)
}
/**
* @description 上传头像接口
* @param payload
* @param payload.file  string  
**/
export function uploadAvatarApi(payload = {}) {
    return axios.post('/upload/avatar', payload)
}


export const apiArr = ['/user/leave/create', '/user/update', '/permission/add', '/permission/update', '/permission/delete', '/user/leave/examine',
    '/user/addRole', '/user/deleteRole', '/role/create', '/role/delete', '/role/addPermission', '/role/deletePermission', '/article/create', '/dept/create', '/dept/delete',
    '/dept/update', '/user/dept/add', '/user/dept/delete', '/task/create', '/task/update', '/task/delete', '/task/publish', '/user/task/status/set', '/message/send', '/message/update',
    '/message/create', '/user/message/status/set', '/user/quit/apply', '/mail/send', '/user/password/update']

