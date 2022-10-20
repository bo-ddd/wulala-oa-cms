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
interface userInfo {
    userId: number
}
export default {
    /**
    * 登录接口**/
    loginApi(payload = {}) {
        return axios.post('/user/login', payload)
    },
    /**
    * 获取请假列表接口**/
    leaveListApi(payload = {}) {
        return axios.post('/user/leave/list', payload)
    },
    /**
     * @description  * 请假申请接口**
 ***/
    leaveCreateApi(payload = {}) {
        return axios.post('/user/leave/create', payload)
    },
    /**
     * 用户注册接口**/
    userRegisterApi(payload: userRegister) {
        return axios.post('/user/register', payload)
    },
    /**
     * 获取用户列表接口
     * **/
    userListApi(payload: userList) {
        return axios.post('/user/list', payload)
    },
    /**
     * 查询用户接口
     * **/
    userInfoApi(payload: userInfo) {
        return axios.post('/user/info', payload)
    },
}
