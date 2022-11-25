import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
let router = useRouter()

const $http = axios.create({
  baseURL: import.meta.env.MODE == 'production' ? 'http://8.131.89.181:8080' : '/api',
  timeout: 5000,   //如果接口5秒钟都没有返回，则axios会自动帮我们做失败的处理
  headers: { 'Content-Type': 'application/json' }  // 发送服务端之前，axios设置请求头信息
});

// 添加请求拦截器
$http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //作用一：统一设置请求头信息
  // 作用二： 给所有的接口加一些公共的弹层  
  // console.log(config);
  if (config.headers) {
    config.headers.token = sessionStorage.getItem('token');
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});



// 添加响应拦截器
$http.interceptors.response.use(function (response:any) {
  // 2xx 范围内的状态码都会触发该函数。
  //作用1：关闭弹层
  //作用2: 根据不同的状态码，提示不同的信息
  //作用3：改变接口的返回数据类型

  const { msg } = response.data
  if (response.status == 1) {
    ElMessage.success(msg)
  } else {
    ElMessage.warning(msg)
    return Promise.reject('登录失败')
  }
  if (response.data.status == 401) {
    router.push('/login')
  }
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default $http;