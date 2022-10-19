import axios from "./http";
//用户
interface userRegister{
    username:string;
    password:string
    avatarName?:string 
    phoneNumber:string
}

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
     * @description  * 请假申请接口**
 ***/
    leaveCreateApi(payload={}){
        return axios.post('/user/leave/create',payload)
    },
    /**
     * 用户注册接口**/
     userRegisterApi(payload:userRegister){
        return axios.post('/user/register',payload)
    }
}
