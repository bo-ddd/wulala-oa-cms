import axios from "./http";

export default{
     /**
     * 登录接口**/
    loginApi(payload={}){
        return axios.post('/user/login',payload)
    },
     /**
     * 获取请假列表接口**/
    leaveListApi(payload={}){
        return axios.post('/user/leave/list',payload)
    },
    /**
     * 请假申请接口**/
    leaveCreateApi(payload={}){
        return axios.post('/user/leave/create',payload)
    },
    /**
     * 用户注册接口**/
     userRegisterApi(payload={}){
        return axios.post('/user/register',payload)
    }
}
