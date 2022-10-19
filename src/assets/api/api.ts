import axios from "./http";

export default{
    loginApi(payload={}){
        return axios.post('/user/login',payload)
    }
}