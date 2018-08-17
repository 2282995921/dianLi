<template>
  <div id="index">
    <div class="head">
      <span @click="notice" v-bind:class="{'selected-color': selected}">新闻公告</span>
      <span @click="news" v-bind:class="{'selected-color': !selected}"><span class="text_span">系统消息<i v-if="sysNews"></i></span></span>
      <i class="anmited" :class="{'anmited-left': !selected}"></i>
    </div>
    <div class="main-container">
      <div class="ul-box" v-bind:class="{'show-message': !selected}">
        <div class="ul-content">
          <v-touch v-on:swipeleft="onSwipeLeft" class="touch-action">
            <news-list></news-list>
          </v-touch>
        </div>
        <div class="ul-content">
          <!-- <v-touch v-on:swiperight="onSwipeRight" v-bind:class="{'touch-action': !selected}"> -->
            <message-list v-on:watchShow="childByValue"></message-list>
          <!-- </v-touch> -->
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" id="half">
      <div class="mo">{{content}}</div>
    </mt-popup>
    <demo-footer></demo-footer>
  </div>
</template>
<script>
import axios from 'axios'
import DemoFooter from './DemoFooter'
import MessageList from './MessageList'
import NewsList from './NewsList'
import { Popup } from 'mint-ui';

export default {
  data() {
    return {
      selected: true,
      sysNews: false,
      popupVisible: false,
      content: null
    }
  },
  components: {
    DemoFooter,
    MessageList,
    NewsList
  },
  created() {
    this.getSysNews();
  },
  mounted() {
    this.notice();
  },
  methods: {
    notice() {
      this.selected = true;
    },
    news() {
      this.selected = false;
      // this.sysNews = false;
    },
    getSysNews() {
      this.$get('/powerArea/actionIntf/informAct/inform.html', { userId: JSON.parse(localStorage.getItem("isActive")).join(','), batchType: '2' }).then((data) => {
        if (data.data.code == 0) {
          if (data.data.type == 0) {
            this.sysNews = true
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    onSwipeLeft() {
      this.news();
    },
    onSwipeRight() {
      this.notice();
    },
    more() {
      this.popupVisible = true;
    },
    whole() {
      this.popupVisible = false;
    },
    childByValue: function(childValue) {
      this.popupVisible = childValue.status;
      this.sysNews = !childValue.message;
      this.content = childValue.content
    },
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#index .touch-action {
  touch-action: pan-y!important;
  height: 100%;
}
.mo{
  padding: 0.1rem;
  font-size: 0.14rem;
}
#half {
  height: 40%;
  background-color: #fff;
  width: 100%;
  border-radius: 10px 10px 0 0;
}

.anmited {
  width: 50%;
  height: 2px;
  background: #1BBC9D;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: left .2s linear;
}

.anmited-left {
  left: 50%;
}

.touch-action {
  touch-action: pan-y!important;
  height: 100%;
}

.head {
  position: fixed;
  display: flex;
  top: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  z-index: 2;
}

.head>span {
  position: relative;
  width: 50%;
  text-align: center;
  line-height: .49rem;
  font-size: .16rem;
  color: #333;
  cursor: pointer;
  border-bottom: 1px #DDD solid;
}

.text_span {
  position: relative;
}

.head span i {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: red;
  top: -4px;
  right: -14px;
  display: inline-block;
}

.head .selected-color {
  color: #1BBC9D;
}




/*.head .selected-color:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  background-color: #1BBC9D;
}*/

.main-container {
  box-sizing: border-box;
  height: 100vh;
  overflow: hidden;
  padding-bottom: 0.4rem;
}

.ul-content {
  float: left;
  box-sizing: border-box;
  /*padding: .5rem 0;*/
  height: 100vh;
  overflow-y: auto;
}

.ul-box {
  width: 200%;
  transform: translateX(0);
  transition: transform .2s linear;
}

.main-container .show-message {
  transform: translateX(-50%);
}

</style>
