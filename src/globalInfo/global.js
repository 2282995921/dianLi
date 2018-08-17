import axios from 'axios'

let access_token = '' // 微信授权token
let userInfo = '' // 个人信息
let currentUser = '' // 当前选中用电户号
let selectedAddIndex = 0 // 选中地址下标
let openId = '' // 个人信息

export default {
  access_token, // 微信授权token
  openId, // openId
  userInfo, // 用户信息
  selectedAddIndex,
  currentUser
}
