import axios from "./http";
//用户
interface userRegister {
    username: string;
    password: string
    avatarName?: string
    phoneNumber: string
}

interface userList {
    pageNum?: number,
    pageSize?: number
}
interface createLeave {
    userId: string;
    reason: string;
    startTime: string;
    endTime: string;
}
interface examineUserLeave {
    id: number,
    auditStatus: number
}
interface updatePermission {
    id: number
    permissionName: string
    pid: number
}
export default {
    /**
    * 登录接口**/
    loginApi(payload = {}) {
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
    createLeaveApi(payload: createLeave) {
        return axios.post('/user/leave/create', payload)
    },
    /**
     * 用户注册接口*
     * "username": //用户名，6-20位之间
     * "password":  //密码，6-20位之间
     *  avatarName": //昵称，1-12位之间
     *  "phoneNumber":  //手机号*/
    registerApi(payload: userRegister) {
        return axios.post('/user/register', payload)
    },
    /**
     * 获取用户列表接口
     * **/
    getUserListApi(payload: userList) {
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
    updatePermissionApi(payload: updatePermission) {
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
    examineUserLeaveApi(payload: examineUserLeave) {
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
    }
}
