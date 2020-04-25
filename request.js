// 全局默认配置baseURL
axios.defaults.baseURL = "https://developer.duyiedu.com/vue/bz/";
// 响应拦截器
axios.interceptors.response.use(res => {
    const { baseURL, url } = res.config;
    if (res.status === 200) {
        if (url === baseURL + 'video') {
            return {
                count: res.data.count,
                data: res.data.data
            }
        }
        return res.data.data;
    }
    return res;
});