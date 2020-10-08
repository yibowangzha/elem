import axios from 'axios'

axios.defaults.withCredentials = true; //配置为true
const server = axios.create({
    baseURL:"http://elm.cangdu.org",
    timeout:"5000"
})




// 请求拦截器
server.interceptors.request.use((config)=>{
    // console.log(config)
    return config
})

// 响应拦截器
server.interceptors.response.use((res)=>{
    // console.log(res)
    return res
})  

export default server