<template>
  <div id="app">
    <div v-wechat-title="$route.meta.title"></div>
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>
<script>
// import Vuex from 'vuex'
// import store from './store/store.js'
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      openID: ''
    }
  },
  created() {
    this.openID = this.GetQueryString("openID");
    if (this.openID != '') {
        this.GLOBAL.openId = this.openID;
        this.$store.commit('saveOpenId', this.openID);
    }else{
      window.location.href='http://dianli.hbnrtech.com/powerArea/actionManage/tokenAction/login.html'
    }
  },
  methods: {
    GetQueryString: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return '';
    },
  }
}

</script>
<style>
@import "assets/style/reset.css";
@media screen and (max-width: 319px) {
  html {
    font-size: 85.33333px;
  }
}

@media screen and (min-width: 320px) and (max-width: 359px) {
  html {
    font-size: 85.33333px;
  }
}

@media screen and (min-width: 360px) and (max-width: 374px) {
  html {
    font-size: 96px;
  }
}

@media screen and (min-width: 375px) and (max-width: 383px) {
  html {
    font-size: 100px;
  }
}

@media screen and (min-width: 384px) and (max-width: 399px) {
  html {
    font-size: 102.4px;
  }
}

@media screen and (min-width: 400px) and (max-width: 413px) {
  html {
    font-size: 106.66667px;
  }
}

@media screen and (min-width: 414px) and (max-width: 767px) {
  html {
    font-size: 110.4px;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  html {
    font-size: 160.4px;
  }
}

@media screen and (min-width: 1024px) {
  html {
    font-size: 210.4px;
  }
}

html {
  /*font-size:625%;*/
  height: 100%;
  position: relative;
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f6f6f6;
}

</style>
