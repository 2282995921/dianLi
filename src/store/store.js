import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
// 删除数组创建原型链 调用remove()
Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};

Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
const state = {
  isActive: [],
  saveAddress: [],
  saveOpenId: ''
}
const mutations = {
  setAddressList(state, status) {
    localStorage.setItem("isActive", JSON.stringify(status));
    state.isActive = JSON.parse(localStorage.getItem("isActive"));
  },
  deleteAddress(state, status) {
    state.isActive.remove(status);
    localStorage.setItem("isActive", JSON.stringify(state.isActive));
  },
  saveOpenId(state, status) {
    localStorage.setItem("saveOpenId", status);
    state.saveOpenId = localStorage.getItem("saveOpenId");
    // console.log(state.saveOpenId)
  }
}

const actions = {
  loginAction({ commit }) {
    commit('setAddressList', 1);
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
// for(var item in state){
//    localStorage.getItem(item)?state[item] = JSON.parse(localStorage.getItem(item)): '';
// }