import axios from "./http";
import type { UserList, UserRegister } from "@/types/User";
import type { UpdatePermission } from "@/types/Permission";
import type { CreateLeave, ExamineUserLeave } from "@/types/Leave";
import type { CreatedTask } from "@/types/Task";

interface Result {
    status: number;
    data: any;
    msg: string;
  }

//用户
export default {
    /**
    * 登录接口**/
    loginApi(payload = {}): Promise<Result> {
        return axios.post('/user/login', payload)
    },
    /**
    * 获取请假列表接口*
    * params "userId": 1, //用户id
             "reason": "世界那么大，我想去看看",  //请假原因
             "startTime": 1280977330000,
             "endTime": 128097743000*/

    getLeaveListApi(payload = {}) {
        return axios.post('/user/leave/list', payload)
    },
    /**
     * @description  * 请假申请接口** 
 * **/
    createLeaveApi(payload: CreateLeave) {
        return axios.post('/user/leave/create', payload)
    },
    /**
     * 用户注册接口*
     * "username": //用户名，6-20位之间
     * "password":  //密码，6-20位之间
     *  avatarName": //昵称，1-12位之间
     *  "phoneNumber":  //手机号*/
    registerApi(payload: UserRegister) {
        return axios.post('/user/register', payload)
    },
    /**
     * 获取用户列表接口
     * **/
    getUserListApi(payload: UserList) {
        return axios.post('/user/list', payload)
    },
    /**
     * 查询用户信息接口
     * **/
    queryUserInfoApi(payload = {}) {
        return axios.post('/user/info', payload)
    },
    /**
     * 修改用户信息接口
     * **/
    updateUserInfoApi(payload = {}) {
        return axios.post('/user/update', payload)
    },
    /**
     * 获取权限列表的接口
     * **/
    getPermissionListApi(payload = {}) {
        return axios.post('/permission/list', payload)
    },
    /**
     * 新增权限的接口
     * params: "permissionName": "人员管理" 
     * params: "pid": 如果是0 为最外层父级，不为0 则为子级 **/
    addPermissionApi(payload = {}) {
        return axios.post('/permission/add', payload)
    },
    /**
     * 修改权限的接口
     * params: "id": ", //id  必填
     * params: "permissionName": "新修改的权限名称", //权限名称 必填
     * params: "pid": 如果是0 为最外层父级，不为0 则为子级   必填**/
    updatePermissionApi(payload: UpdatePermission) {
        return axios.post('/permission/update', payload)
    },
    /**
     * 删除权限的接口
     * params: "id" 用户 id**/
    deletePermissionApi(payload = {}) {
        return axios.post('/permission/delete', payload)
    },
    /**
  * 请假审核接口
  * params: id:
  * params: auditStatus:
  * **/
    examineUserLeaveApi(payload: ExamineUserLeave) {
        return axios.post('/user/leave/examine', payload)
    },
    /**
  * 给用户添加角色接口
  * params: userId": 1, 
  * params: "roleId": 1 
  * **/
    addUserRoleApi(payload = {}) {
        return axios.post('/user/addRole', payload)
    },

    /**
  * 删除用户角色接口
  * **/
    deleteUserRoleApi(payload = {}) {
        return axios.post('/user/deleteRole', payload)
    },
    /**
  * 查询用户权限列表接口
  * params  userId": 1 
  * **/
    permissionUserListApi(payload = {}) {
        return axios.post('/user/permission/list', payload)
    },

    /**
  * 获取角色列表接口
  * **/
    getRoleListApi(payload = {}) {
        return axios.post('/role/list', payload)
    },
    /**
   * 创建角色接口                  
   * params  roleName": string
   * **/
    createRoleApi(payload = {}) {
        return axios.post('/role/create', payload)
    },
    /**
   * 删除角色接口                  
   * params  id": string
   * **/
    deleteRoleApi(payload = {}) {
        return axios.post('/role/delete', payload)
    },
    /**
  *给角色添加权限接口
  * params  roleId": number
  * params  permissionId": number
  * **/
    addPermissionRoleApi(payload = {}) {
        return axios.post('/role/addPermission', payload)
    },
    /**
  *查询某角色所拥有的权限接口
  * params  roleId": number
  * **/
    queryRolePermissionListApi(payload = {}) {
        return axios.post('/role/permission/list', payload)
    },
    /**
  *删除角色对应权限接口
  * params  Id": number
  * **/
    deletePermissionRoleApi(payload = {}) {
        return axios.post('/role/deletePermission', payload)
    },
    /**
  *创建文章接口
  * title	2022.10.28日报	String	
    content	哇哈哈哈哈，今天吃了一只烤鸡，好开心鸭！
  * **/
    createArticleApi(payload = {}) {
        return axios.post('/article/create', payload)
    },
    /**
  *获取文章；列表接口
   *pageSize	2	Integer	
    pageNum	1	Integer
  * **/
    getArticleListApi(payload = {}) {
        return axios.post('/article/list', payload)
    },
    /**
    *增加部门
    * "name": "呜啦啦oa项目组" 
    * **/
    createDeptApi(payload = {}) {
        return axios.post('/dept/create', payload)
    },
    /**
    *删除部门
    *  "id": 1 
    * **/
    deleteDeptApi(payload = {}) {
        return axios.post('/dept/delete', payload)
    },
    /**
    *修改部门
    *  "id": 1 
    * **/
    updateDeptApi(payload = {}) {
        return axios.post('/dept/update', payload)
    },
    /**
    *获取部门列表
    *   "id": 2, 
    "name": "oa项目组" 
    * **/
    getDeptList(payload = {}) {
        return axios.post('/dept/list', payload)
    },
    /**
    *给用户添加组
     *  "userId": 151, //用户id
        "deptId": 4 //部门(组) 
    * **/
    addUserDeptApi(payload = {}) {
        return axios.post('/user/dept/add', payload)
    },
    /**
    *删除用户对应的组
    * userId": 151, 
     "deptId": 2 // 部门(组）id
    * **/
    deleteUserDeptApi(payload = {}) {
        return axios.post('/user/dept/delete ', payload)
    },
    /**
    *获取用户所在的组列表
    *   "userId": 151, 
    * **/
    getUserDeptListApi(payload = {}) {
        return axios.post('/user/dept/list ', payload)
    },
    /**
    *创建任务
    * "taskName":  //任务名称
     "description": //任务描述
     "level" //任务等级 0: 普通 1: 紧急
     "sort" //排序
    * **/
    createTaskApi(payload: CreatedTask) {
        return axios.post('/task/create', payload)
    },
    /**
    *获取任务列表
    * "taskName" //任务名称
    * **/
    getTaskListApi(payload = {}) {
        return axios.post('/task/list', payload)
    },
    /**
    *修改任务列表
    * "id": 1,
      "description": "abc",描述
      "level": 1, 紧急程度
      "sort": 2   排序
    * **/
    updateTaskApi(payload = {}) {
        return axios.post('/task/update', payload)
    },
    /**
    * 删除任务
    * "id": 1,
    * **/
    deleteTaskApi(payload = {}) {
        return axios.post('/task/delete', payload)
    },
    /**
   * 获取用户任务列表
   * 
   * **/
    getUserTaskListApi(payload = {}) {
        return axios.post('/user/task/list', payload)
    },

    
 
    /**
   * 发布任务
   * "userId": 152,
     "taskId": 2
   * **/
    publishTaskApi(payload = {}): Promise<Result> {
        return axios.post('/task/publish', payload)
    },
    /**
   * 修改我的任务状态
   * "taskId": 2,
     "status": 1 //0: 未开始 1：进行中 2：已完成 3 已过期
   * **/
    setUserTaskStatusApi(payload = {}) {
        return axios.post('/user/task/status/set', payload)
    },
    /**
   * 查询组中所有的用户
   * "deptId": 2    部门id
   * **/
    queryUserMembersApi(payload = {}) {
        return axios.post('/user/dept/members', payload)
    },
    /**
   * 查询我发布的消息
   * 
   * **/
    queryMessageListApi(payload = {}) {
        return axios.post('/message/list', payload)
    },
    /**
    * 发送消息
    * 
    * **/
    sendMessageApi(payload = {}) {
        return axios.post('/message/send', payload)
    },
    /**
    * 修改消息
    * 
    * **/
    updateMessageApi(payload = {}) {
        return axios.post('/message/update', payload)
    },
    /**
    * 新增消息通知
    * 
    * **/
    createMessageApi(payload = {}) {
        return axios.post('/message/create', payload)
    },
    /**
    * 设置消息状态为已读
    * 
    * **/
    setStatusMessageApi(payload = {}) {
        return axios.post('/user/message/status/set', payload)
    },
    /**
    * 获取我的消息列表
    * 
    * **/
    getUserMessageApi(payload = {}) {
        return axios.post('/user/message/list', payload)
    },
    /**
    * 离职申请
    * "userId": number
    "quitTime": string
    "reason": string
    * **/
    userQuitApplyApi(payload = {}) {
        return axios.post('/user/quit/apply', payload)
    },
    /**
    * 获取离职员工列表
    * **/
    getQuitListApi(payload = {}) {
        return axios.post('/user/quit/list', payload)
    },
    /**
    * 离职审核
    * "id": number, //离职id
      "status": number //0: 待审核 1： 审核通过 2： 拒绝
    * **/
     quitUserExamineApi(payload = {}) {
        return axios.post('/user/quit/examine', payload)
    },
    /**
    * 发送邮件的接口
    *"to":  string, //邮件接收人
    "subject": string, //标题
    "context": string //内容
    * **/
     sendMailApi(payload = {}) {
        return axios.post('/mail/send', payload)
    },
    /**
    * 修改密码
    *"password": "123456" 
    * **/
    updatePasswordApi(payload = {}) {
        return axios.post('/user/password/update', payload)
    },

    // 
}
