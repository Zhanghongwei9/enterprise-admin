import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'default-passive-events'
import './assets/reset.css'
import 'nprogress/nprogress.css'
import '@/assets/reset.css'
import '@/plugins/muse-ui'

// 权限控制
import './utils/authority-control'

Vue.config.productionTip = false

// 工具
import stringUtils from '@/utils/string-utils'
Vue.prototype.$stringUtils = stringUtils

// markdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
mavonEditor.markdownIt.set({ breaks: false })

// 时间格式化
import moment from 'moment'
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY MM DD') {
  return moment(dataStr).format(pattern)
})

// 自定义组件
import myEditor from '@/views/share/my-editor'
Vue.component('my-editor', myEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app') 
