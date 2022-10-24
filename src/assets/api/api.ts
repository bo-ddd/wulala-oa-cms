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
    createLeaveApi(payload = {}) {
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
    queryUserInfoApi(payload={}) {
        return axios.post('/user/info', payload)
    },
    /**
     * 修改用户信息接口
     * **/
    updateUserInfoApi(payload={}) {
        return axios.post('/user/update', payload)
    },
    /**
     * 接口
     * **/

}
