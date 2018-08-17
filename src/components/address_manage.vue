<template>
  <div id="address">
    <div class="search">
      <router-link to="/address_search">
        <label class="search_icon">
          <img src="../assets/images/search.png" height="14" width="14" alt="">
          <span>搜索用电户号或手机号查询</span>
        </label>
        <input type="text" name="search" id="myFocus" v-model="search_vla">
      </router-link>
    </div>
    <div class="content">
      <div class="list_address" v-for="(item,index) in arr" :class="{amited: index == current}">
        <router-link :to="{path:'/contact',query: {id: item.houserholdNumber,userId: item.userId}}">
          <div class="address_info">
            <div class="name">
              <span class="username">{{item.realName}}</span>
              <span class="phone">{{item.loginName}}</span>
              <span class="number">{{item.houserholdNumber}}</span>
            </div>
            <div class="address">{{item.fullAddress}}</div>
          </div>
        </router-link>
        <div class="cancel_btn" :data-num="item.userId" ref="dataNum" @click="cancel_btn($event,index)">删除</div>
      </div>
    </div>
    <div class="v-modal" v-show="modal" style="z-index: 2002;"></div>

    <demo-footer></demo-footer>
  </div>
</template>
<script>
import axios from 'axios';
import DemoFooter from './DemoFooter'
import { MessageBox } from 'mint-ui';
// import Vuex from 'vuex'
// import store from '../store/store.js'

export default {
  data() {
    return {
      icon: true,
      search_vla: '',
      arr: [],
      current: null
    }
  },
  components: {
    DemoFooter
  },
  created() {
    this.getAddress();
  },
  methods: {
    getAddress() {
      this.$get('/powerArea/actionManage/userAction/queByWechat.html', { wechatOpenId: this.$store.state.saveOpenId }).then((res) => {
        var selected = [];
        if (res.data.code == 0) {
          this.arr = res.data.result;
          for (var i = 0; i < res.data.result.length; i++) {
            selected.push(res.data.result[i].userId);
            this.$store.commit('setAddressList', selected);
          }
        }else{
          this.$store.commit('setAddressList', selected);
        }
        localStorage.setItem("saveAddress", JSON.stringify(this.arr));
      }).catch((error) => {
        console.log(error);
      });
    },
    cancel_btn(e, index) {
      MessageBox.confirm('', {
        message: '您确定？',
        title: '提示',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        if (action == 'confirm') { //确认的回调
          this.current = index;
          this.$get('/powerArea/actionManage/userAction/upWechat.html', { userId: e.target.getAttribute('data-num'), wechatOpenId: '' }).then((res) => {
            if (res.data.code == 0) {
              this.arr.splice(this.current, 1);
              this.current = null;
              this.$store.commit('deleteAddress', e.target.getAttribute('data-num'));
              localStorage.setItem("saveAddress", JSON.stringify(this.arr));
            }
          }).catch((error) => {
            console.log(error);
          });
        }
      }).catch(err => {
        if (err == 'cancel') { //取消的回调
          console.log(2);
        }
      });
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.amited {
  transform: translateX(-100%);
  transition: transform .2s linear;
}

.cancel_btn {
  color: #ccc;
  padding: 0.08rem 0.1rem;
  position: relative;
  white-space: nowrap;
}

.cancel_btn:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 0.3rem;
  border-left: 1px #ccc solid;
}

.phone,
.number {
  margin: 0 0.1rem;
  font-size: 0.12rem;
  color: #ccc;
}

.address {
  padding-right: 10px;
  line-height: 1.5;
}

.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0.1rem 0.15rem;
  position: relative;
  margin-bottom: 0.1rem;
}

.search a {
  display: inline-block;
  width: 100%;
  position: relative;
}

.search input {
  border: none;
  width: 100%;
  display: inline-block;
  border-radius: 4px;
  padding: 0.1rem 0.15rem;
  box-sizing: border-box;
  color: #9a9a9a;
  background: #ededee;
}

.search_icon {
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  left: 1px;
  z-index: 2;
  border-radius: 3px;
  text-align: center;
  color: #9b9b9b;
  background: #ededee;
  padding-top: 0.1rem;
  display: flex;
  justify-content: center;
}

.search_icon img {
  display: inline-block;
  vertical-align: middle;
  font: normal normal normal 14px/1 weui;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  margin-right: 5px;
}

.search_icon span {
  font-size: 0.14rem;
}

.notes {
  background: #fff;
}

.cancel {
  font-size: 0.14rem;
}

.content {
  font-size: 0.14rem;
  color: #666;
}

.list_address {
  padding: 0.15rem;
  margin-bottom: 0.1rem;
  background: #fff;
}

.list_address {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.name {
  margin-bottom: 0.1rem;
}

.username {
  font-size: 0.16rem;
}

</style>
