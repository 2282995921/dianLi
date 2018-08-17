<template>
  <div id="address">
    <div class="search">
      <a href="javascript:;">
        <div class="input">
          <img src="../assets/images/search.png" height="14" width="14" alt="" class="input_icon">
          <input type="text" name="search" id="myFocus" v-model="search_vla" placeholder="查询用户">
          <img src="../assets/images/cancel.png" height="15" width="15" alt="" @click="clear" v-show="search_vla.length>0">
        </div>
      </a>
      <div class="cancel" @click="toRouter">取消</div>
    </div>
    <div class="content">
      <div class="list_address" v-for="(item,index) in arr" @click="checkedOne(item.userId)">
        <div class="check_input">
          <input type="checkbox" :checked="selected.indexOf(item.userId)>=0" name="checkboxinput" class="input-checkbox">
        </div>
        <div class="address_info">
          <div class="name">
            <span class="username">{{item.realName}}</span>
            <span class="phone">{{item.loginName}}</span>
            <span class="number">{{item.houserholdNumber}}</span>
          </div>
          <div class="address">{{item.fullAddress}}</div>
        </div>
      </div>
    </div>
    <div class="empty_info" v-show="arr.length == 0"><img src="../assets/images/empty.png" height="84" width="89" alt=""></div>
    <div class="footer_btn" :class="{'footer_btn_active' : selected.length>0}" @click="choose(selected.length)" v-show="arr.length>0 ">
      选好了，确定是本人信息
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import DemoFooter from './DemoFooter'
import { Toast } from 'mint-ui';
import Vuex from 'vuex'
import store from '../store/store.js'

export default {
  data() {
    return {
      search_vla: '',
      arr: [],
      current: null,
      selected: [],
    }
  },
  // computed:{
  //   saveOpenId(){
  //     this.$store.state.saveOpenId = localStorage.getItem('saveOpenId')
  //     return this.$store.state.saveOpenId
  //   }
  // },
  mounted() {
    this.myFocus();
  },
  watch: {
    search_vla: {
      handler: function(newValue, oldval) {
        var self = this;
        if (this.search_vla.length >= 10) {
          var t;
          clearTimeout(t)
          t = setTimeout(() => {
            if (this.search_vla != '') {
              if (oldval != newValue) {
                self.$get('/powerArea/actionManage/userAction/queNumber.html', { userName: this.search_vla }).then((res) => {
                  if (res.data.code == 0) {
                    self.arr = res.data.result;
                  } else {
                    self.arr = []
                  }
                }).catch((error) => {
                  console.log(error);
                });
              }
            } else {
              this.icon = false;
            }
          }, 1000);
        }
      }
    },
  },
  methods: {
    myFocus: function() {
      var idObj = document.getElementById('myFocus');
      idObj.focus();
    },
    clear() {
      this.search_vla = '';
      this.arr = [];
    },
    checkedOne(fruitId) {
      let idIndex = this.selected.indexOf(fruitId)
      if (idIndex >= 0) {
        this.selected.splice(idIndex, 1)
      } else {
        this.selected.push(fruitId);
        // console.log(this.selected)
      }
    },
    toRouter() {
      this.$router.push('/address_manage')
    },
    choose(length) {
      if (length > 0) {
        this.$get('/powerArea/actionManage/userAction/upWechat.html', { userId: this.selected.join(','), wechatOpenId: this.$store.state.saveOpenId }).then((res) => {
          if (res.data.code == 0 || res.data.code == 2) {
            // this.$store.commit('setAddressList', this.selected);
            this.$router.push('/address_manage');
          } else {
            Toast(res.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });
      } else {
        Toast('请选择您的信息或未查询到您的信息');
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.empty_info {
  text-align: center;
  margin-top: 0.5rem;
}

.empty_info p {
  font-size: 0.14rem;
  color: #CACACA;
}

.check_input {
  width: 0.17rem;
  height: 0.17rem;
}

.input-checkbox:after {
  content: '';
  display: block;
  width: 0.17rem;
  height: 0.17rem;
  background: url("../assets/images/select_before.png") no-repeat;
  background-size: 100% 100%;
}

.input-checkbox:checked:after {
  content: '';
  display: block;
  width: 0.17rem;
  height: 0.17rem;
  background: url("../assets/images/select_after.png") no-repeat;
  background-size: 100% 100%;
}

.input-checkbox {
  width: 0.17rem;
  height: 0.17rem;
  -webkit-appearance: none;
  position: absolute;
  outline: none;
  border: none;
  margin: 0;
}

#address .footer_btn_active {
  background: #1BBC9B;
  color: #fff;
}

.footer_btn {
  font-size: 0.16rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  color: #BBBBBC;
  text-align: center;
  padding: 0.16rem 0;
  background: #EDEDEE;
}

.input_icon {
  margin-right: 5px;
}

.input {
  display: flex;
  align-items: center;
  background: #ededee;
  padding: 0.08rem 0.15rem;
  border-radius: 4px;
}

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
  margin-left: 0.1rem;
  /*font-size: 0.14rem;*/
}

.address {
  padding-right: 10px;
  line-height: 1.5;
  color: #828282;
  font-size: 0.14rem;
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
  box-sizing: border-box;
  color: #333;
  background: #ededee;
  font-size: 0.14rem;
}

.search_icon {
  position: absolute;
  top: 1px;
  /*right: 1px;*/
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
  white-space: nowrap;
  padding: 0.1rem 0 0.1rem 0.15rem;
  font-size: 0.16rem;
  color: #33C3A6;
}

.cancel a {
  color: #33C3A6;
  font-size: 0.16rem;
}

.content {
  font-size: 0.14rem;
  color: #666;
}

.list_address {
  padding: 0.15rem;
  margin-bottom: 0.1rem;
  background: #fff;
  display: flex;
  align-items: center;
}

.name {
  margin-bottom: 0.1rem;
  color: #333;
  font-size: 0.16rem;
}

.username {
  /*font-size: 0.14rem;*/
}

.address_info {
  padding-left: 0.15rem;
}

</style>
