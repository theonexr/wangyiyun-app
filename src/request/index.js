import axios from "axios";

export const baseURL = 'http://localhost:3000/'

const requests = axios.create({
    // 配置对象
    baseURL: baseURL,
    timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {

    return config;
});
// 响应拦截器
requests.interceptors.response.use((res) => {
    // Do something before request is sent
 //简化服务器返回的数据格式
    return res.data;
},(error)=>{
    return Promise.reject(error)
});


// 对外暴露
export default requests