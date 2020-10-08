import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/vant.js'
import 'vant/lib/index.css';
// import http from  './utils/request'
// import { gets,posts } from './utils/api'
import '@/assets/common.css'



import ElementUI from 'element-ui';
import Vant from 'vant'
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js'

Vue.use(ElementUI);
Vue.use(Vant);
// Vue.prototype.$http = http
// Vue.prototype.$get = gets
// Vue.prototype.$post = posts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
