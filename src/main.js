import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "@/router"
import axios from 'axios'
import store from './store'
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;

//为axios添加拦截器,在请求头中加入token
axios.interceptors.request.use(
    config => {
      if(localStorage.getItem("token")){
        config.headers.Authorization = localStorage.getItem("token")
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');