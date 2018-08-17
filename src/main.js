// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueWechatTitle from 'vue-wechat-title'
import VueTouch from 'vue-touch'
import VueScroller from 'vue-scroller'
import websdk from 'easemob-websdk'
import store from './store/store.js'
import global from './globalInfo/global.js'
// 引入请求接口
import { getRequest, postRequest } from './api/index.js'

Vue.prototype.$get = getRequest
Vue.prototype.$post = postRequest
Vue.prototype.GLOBAL = global

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(VueWechatTitle)
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(VueScroller)
Vue.use(Vuex)

//webIM配置

let webIM = window.WebIM = websdk
WebIM.Emoji = {
  path: '../static/image/faces/',
  map: {
    '[):]': 'ee_1.png',
    '[:D]': 'ee_2.png',
    '[;)]': 'ee_3.png',
    '[:-o]': 'ee_4.png',
    '[:p]': 'ee_5.png',
    '[(H)]': 'ee_6.png',
    '[:@]': 'ee_7.png',
    '[:s]': 'ee_8.png',
    '[:$]': 'ee_9.png',
    '[:(]': 'ee_10.png',
    '[:\'(]': 'ee_11.png',
    '[:|]': 'ee_12.png',
    '[(a)]': 'ee_13.png',
    '[8o|]': 'ee_14.png',
    '[|]': 'ee_15.png',
    '[+o(]': 'ee_16.png',
    '[<o)]': 'ee_17.png',
    '[|-)]': 'ee_18.png',
    '[*-)]': 'ee_19.png',
    '[:-#]': 'ee_20.png',
    '[:-*]': 'ee_21.png',
    '[^o)]': 'ee_22.png',
    '[8-)]': 'ee_23.png',
    '[(|)]': 'ee_24.png',
    '[(u)]': 'ee_25.png',
    '[(S)]': 'ee_26.png',
    '[(*)]': 'ee_27.png',
    '[(#)]': 'ee_28.png',
    '[(R)]': 'ee_29.png',
    '[({)]': 'ee_30.png',
    '[(})]': 'ee_31.png',
    '[(k)]': 'ee_32.png',
    '[(F)]': 'ee_33.png',
    '[(W)]': 'ee_34.png',
    '[(D)]': 'ee_35.png'
  }
};
Vue.prototype.$WebIM = webIM
const imConn = new webIM.connection({
  isMultiLoginSessions: webIM.config.isMultiLoginSessions,
  https: typeof webIM.config.https === 'boolean' ? webIM.config.https : location.protocol === 'https:',
  url: webIM.config.xmppURL,
  isAutoLogin: true,
  heartBeatWait: webIM.config.heartBeatWait,
  autoReconnectNumMax: webIM.config.autoReconnectNumMax,
  autoReconnectInterval: webIM.config.autoReconnectInterval,
  apiUrl: webIM.config.apiURL
})

// const options = {
//   apiUrl: webIM.config.apiURL,
//   user: 'wz',
//   pwd: '123456',
//   appKey: webIM.config.appkey,
//   success: function(res) {
//     console.log('登录成功！')
//     console.log(res)
//   },
//   error: function(err) {
//     alert(err)
//   }
// }
Vue.prototype.$imConn = imConn
// Vue.prototype.$imoption = options


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
