axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net';
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // 在发送请求之前判断是否有/my开头的请求路径
    if (config.url.startsWith('/my')) {
        const token = localStorage.getItem('token') || ''
        config.headers.Authorization = token;
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    //先判断身份验证是否成功
    const { status, message } = response.data;
    if (message == '身份验证失败!' && status == 1) {
        //清除本地token
        localStorage.removeItem('token');
        //跳转登录页
        location.href = './login.html';
    }

    // 对响应数据做点什么
    return response.data;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});