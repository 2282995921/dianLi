<template>
  <div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="index" isRouter>
        <img src="../assets/images/ic_tab_home_normal.png" alt="" slot="icon-normal">
        <img src="../assets/images/ic_tab_home_active.png" alt="" slot="icon-active"> 新闻公告
      </mt-tab-item>
      <mt-tab-item id="news" isRouter>
        <img src="../assets/images/ic_tab_subject_normal.png" alt="" slot="icon-normal">
        <img src="../assets/images/ic_tab_subject_active.png" alt="" slot="icon-active"> 用电知识
      </mt-tab-item>
      <mt-tab-item id="contact" isRouter v-on:watchShow="childByValue">
        <img src="../assets/images/ic_tab_status_normal.png" alt="" slot="icon-normal">
        <img src="../assets/images/ic_tab_status_active.png" alt="" slot="icon-active"> 联系我们
      </mt-tab-item>
      <mt-tab-item id="address_manage" isRouter>
        <img src="../assets/images/ic_tab_address_normal.png" alt="" slot="icon-normal">
        <img src="../assets/images/ic_tab_address_active.png" alt="" slot="icon-active"> 地址管理
      </mt-tab-item>
    </mt-tabbar>
    <div v-show="isShow">
    <div class="mask" @click="close"></div>
      <div class="address-box">
        <div>
          <p class="title">选择地址</p>
          <img class="close" src="../../static/image/close.png" alt="关闭" width="20" height="20" @click="close">
        </div>
        <ul class="address-list">
          <li v-for="(item, index) in addressList" :key="index" @click.stop="toContant(index,item.id,$event)" :data-num="item.userId">
            <a class="address" :data-num="item.houserholdNumber" :data-name="item.userId" :class="{'selected' : currentAddId === index}">{{item.fullAddress}}</a>
            <img v-if="currentAddId === index" class="selected-icon" src="../../static/image/duigou.png" alt="" width="20" height="20">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import mtTabbar from './tabbar'
import mtTabItem from './tabbar-item'

export default {
  components: {
    mtTabbar,
    mtTabItem
  },
  data() {
    return {
      selected: "index",
      isShow: false,
      currentAddId: this.GLOBAL.selectedAddIndex,
      addressList: []
    }
  },
  // computed: {
  //   addressList (){
  //     return this.GLOBAL.userInfo
  //   }
  // },
  watch: {
    isShow: {
      handler: function() {
        this.addressList = JSON.parse(localStorage.getItem('saveAddress'))
      }
    }
  },
  methods: {
    close() {
      this.isShow = false;
    },
    toContant(index, userId, e) {
      this.isShow = false;
      this.currentAddId = index;
      this.GLOBAL.selectedAddIndex = index;
      this.GLOBAL.currentUser = userId;
      this.$router.push({ path: '/contact', query: { id: e.target.getAttribute('data-num'), userId: e.target.getAttribute('data-name')} });
    },
    childByValue: function(childValue) {
      this.isShow = childValue;
    },
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer {
  position: fixed;
  height: 50px;
  width: 100%;
  bottom: 0;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, .4);
  z-index: 3;
}

.address-box {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 4rem;
  background-color: #FFF;
  border-top-left-radius: .1rem;
  border-top-right-radius: .1rem;
  z-index:3;
}

.title {
  font-size: .14rem;
  color: #848484;
  line-height: .5rem;
  height: .5rem;
  text-align: center;
  border-top-left-radius: .1rem;
  border-top-right-radius: .1rem;
  border-bottom: 1px solid #E4E5E9;
}

.close {
  position: absolute;
  top: .17rem;
  right: .1rem;
  width: .16rem;
  height: .16rem;
}

.address-list {
  padding-left: .2rem;
}

.address-list>li {
  font-size: 0;
  border-bottom: 1px solid #E4E5E9;
}

.address-list>li:last-child {
  border-bottom: none;
}

.address {
  display: inline-block;
  padding: .1rem 0;
  box-sizing: border-box;
  width: 80%;
  line-height: .3rem;
  font-size: .14rem;
  color: #454545;
}

.selected {
  color: #1BBC9B;
}

.selected-icon {
  float: right;
  margin-right: .1rem;
  margin-top: .15rem;
  width: 20px;
  height: 20px;
}

</style>
