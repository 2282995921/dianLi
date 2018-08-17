<template>
  <div id="message">
    <ul class="list-box">
      <li v-for="(item,index) in messageList" :key="item.id" class="list-item" @click="more(item.msgContent, item.batchId,index)">
        <div class="flex-box">
          <p class="title ellipsis"><span>{{item.title}}<i class="isRead" v-show="item.isRead == 0"></i></span></p>
          <span class="time">{{item.time.slice(0,10)}}</span>
        </div>
        <p class="text-content ellipsis">
          {{item.msgContent}}
        </p>
      </li>
    </ul>
    <div v-show="messageList.length==0" class="empty">
      <div class="no-data-text active" style="color: rgb(170, 170, 170);">暂无消息</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import getMessageList from "@/api/getData.js";

export default {
  name: "MessageList",
  data() {
    return {
      messageList: [],
    }
  },
  created() {
    this.getNews();
  },
  methods: {
    getNews() {
      this.$get('/powerArea/actionIntf/informAct/inform.html', { userId: JSON.parse(localStorage.getItem("isActive")).join(','), batchType: '2' }).then((data) => {
        if (data.data.code == 0) {
          this.messageList = data.data.data;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    more(content,id,index) {
      var obj = {};
      obj.status = true;
      obj.content = content;
      this.$get('/powerArea/actionIntf/informAct/offtoon.html', { batchId: id , userId: JSON.parse(localStorage.getItem("isActive")).join(',')}).then((data) => {
        if (data.data.code == 0) {
          this.messageList[index].isRead = 1;
          obj.message = data.data.type;
          this.$emit('watchShow', obj)
        }else{
          obj.message = true;
          this.$emit('watchShow', obj)
        }
      }).catch((error) => {
        console.log(error);
      });
    },
  }
}

</script>
<style scoped>
.isRead{
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: red;
  top: 0px;
  right: -15px;
  display: inline-block;
}
#half {
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 0.14rem;
}

.empty {
  font-size: 0.14rem;
  text-align: center;
}

#scroller {
  position: static;
}

#message {
  width: 100vw;
  box-sizing: border-box;
  padding-top: 50px;
  padding-bottom: 50px;
}

.list-box {
  padding: 0.1rem 0.125rem;
  background-color: #f6f6f6;
}

.list-item {
  margin-bottom: 0.1rem;
  padding: 0.2rem;
  background-color: #fff;
  box-shadow: 0 0.06rem 0.06rem 0 #e4e4e4;
  border-radius: 0.06rem;
  position: relative;
}

.list-box .list-item:last-child {
  margin-bottom: 0;
}

.flex-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.time {
  float: right;
  width: 20%;
  font-size: 0.14rem;
  color: #999;
  text-align: right;
}

.title {
  width: 80%;
  /*height: .3rem;*/
  font-size: 0.18rem;
  font-weight: bold;
  color: #333;
  padding: 0.1rem 0;
}
.title span{
  position: relative;
}
.text-content {
  line-height: 0.3rem;
  font-size: 0.14rem;
  color: #999;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
