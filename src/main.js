import Vue from 'vue'
import App from './App.vue'

import router from './router'
import './plugins/element.js'
//添加全局样式
import './assets/css/global.css'
import './assets/css/public.css'
import './assets/css/index.css'
import './assets/css/article.css'
// 导入iconfront
import './assets/font/iconfont.css'
// 导入axios
import axios from 'axios'
// 挂载axios 到Vue的原型prototype的$http
Vue.prototype.$http = axios
// 设置请求的根路径
axios.defaults.baseURL = "/api"

axios.interceptors.request.use(config => {
  // 请求头挂载信息
  config.headers.Authorization = window.sessionStorage.getItem("flag");
  // 在最后必须return config
  return config;
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
