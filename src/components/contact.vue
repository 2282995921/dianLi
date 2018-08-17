<template>
  <div class="chat-room">
    <div class="main-content" id="bubble">
      <div class="intelligent-box">
        <div class="intelligent">
          <img class="intelligent-icon" src="../../static/image/kefu.png" alt=""> 智能专属客服
        </div>
        <p>智能机器人客服进入会话为您服务</p>
      </div>
      <ul class="bubble-list">
        <li class="clear" v-for="(item, index) in bubbleList" :key="index">
          <p class="user" v-if="item.type === 'user'">客户编号：{{id}}</p>
          <div class="clear bubble" :class="{'left-bubble': item.type === 'kefu', 'right-bubble': item.type === 'user', 'fontLimit': item.limit === 'fontLimit'}">
            <div v-if="item.content !=''">
              <div class="content">{{item.content}}</div>
              <div v-if="item.limit == 'fontLimit'" class="more" @click="more"><span>更多</span></div>
              <mt-popup v-model="popupVisible" position="bottom" id="half">
                <div class="toolbar">
                  <div class="toolbar-inner">
                    <a href="javascript:;" class="picker-button close-popup" @click="whole">x</a>
                  </div>
                </div>
                <div class="modal-content" v-html="item.content"></div>
              </mt-popup>
            </div>
            <div v-else>
              <p>你好，您是不是要质询以下问题？</p>
              <div class="aswer">
                <div v-for="(items, index) in item.aswer" :data="items.articleId" @click="aswer($event,items.articleId)" v-html="index+'、'+items.title"></div>
              </div>
              <p>请单击选择</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="chat-bottom">
      <form action="">
        <textarea id="textarea" placeholder="请输入内容" v-model:value="input_content" @keyup.13="send"></textarea>
      </form>
      <span class="send" @click="send">
        <img src="../../static/image/enter.png" alt="添加" width='20' height='20'>
      </span>
    </div>
    <demo-footer></demo-footer>
  </div>
</template>
<script>
import DemoFooter from './DemoFooter'
import axios from 'axios'
import { Popup } from 'mint-ui';
export default {
  data() {
    return {
      input_content: '',
      bubbleList: [],
      popupVisible: false,
      id: this.$route.query.id
    }
  },
  components: {
    DemoFooter
  },
  created() {
    this.defaultReply();
  },
  //监听scroll
  watch: {
    bubbleList: {
      handler: function() {
        this.$nextTick(() => { //$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用
          var div = document.getElementById('bubble')
          div.scrollTop = div.scrollHeight;
        })
      }
    }
  },
  methods: {
    defaultReply() {
      var obj = {};
      obj.type = 'kefu';
      obj.content = '你好，我是智能机器人专属客服，有什么问题你都可以问我哦！';
      this.bubbleList.push(obj);
    },
    //发送
    send() {
      if (this.input_content == 5) {
        this.$router.push({ path: '/contact_artificial', query: { id: this.$route.query.id, userId: this.$route.query.userId } });
      }
      if (this.input_content != '') {
        var obj = {};
        obj.type = 'user';
        obj.content = this.input_content;
        this.bubbleList.push(obj);
        axios.get('/powerArea/actionManage/articleHelpAction/question.html', { params: { lookForQuestion: this.input_content } })
          .then((data) => {
            if (data.data.code == 0) {
              var obj = {};
              obj.type = 'kefu';
              obj.content = '';
              obj.aswer = [];
              for (var i = 0; i < data.data.retList.length; i++) {
                var titleString = data.data.retList[i].title;
                var replaceReg = new RegExp(data.data.retList[i].keywords, 'g');
                var replaceString = '<span style="color:#1BBC9B">' + data.data.retList[i].keywords + '</span>';
                titleString = titleString.replace(replaceReg, replaceString);
                obj.aswer.push({ title: titleString, articleId: data.data.retList[i].articleId })
              }
              obj.aswer.push({ title: '<a style="font-size:0.16rem" href="#/contact_artificial?id=' + this.$route.query.id + '&userId=' + this.$route.query.userId + '">转人工服务</a>' })
              this.bubbleList.push(obj);
            }else{
              this.bubbleList.push({
                type: 'kefu',
                content: '暂未找到您要的问题！'
              });
            }
          }).catch((error) => {
            console.log(error);
          });
      } else {
        return false;
      }
      this.input_content = '';
    },
    aswer(e, articleId) {
      var obj = {};
      obj.type = 'user';
      obj.content = e.target.innerText;
      this.bubbleList.push(obj);
      axios.get('/powerArea/actionManage/articleHelpAction/answer.html', { params: { articleId: articleId } })
        .then((data) => {
          this.input_content = '';
          if (data.data.code == 0) {
            var obj = {};
            obj.type = 'kefu';
            obj.content = data.data.answer;
            if (data.data.answer.length > 90) {
              obj.limit = 'fontLimit';
            }
            this.bubbleList.push(obj);
          }
        }).catch((error) => {
          console.log(error);
        });
    },
    more() {
      this.popupVisible = true;
    },
    whole() {
      this.popupVisible = false;
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.close-popup{
  font-size: 0.14rem;
  padding-right: 0.1rem;
  color: #1BBC9B
}
.toolbar{
  text-align: right;
}
.modal-content{
  padding: 0.1rem;
  line-height: 1.5;
}
#half {
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 0.14rem;
}

.more {
  text-align: center;
  padding: 0.1rem 0;
  font-size: 0.14rem;
}

.more span {
  border: 1px #ddd solid;
  padding: 5px 10px;
  border-radius: 10px;
}

.fontLimit .content {
  position: relative;
  max-height: 115px;
  overflow: hidden;
  word-wrap: break-word;
}

.aswer {
  margin: 0.1rem 0;
}
.aswer > div{
  line-height: 1.5;
}

.clear:after {
  content: '';
  display: block;
  clear: both;
}

.main-content {
  box-sizing: border-box;
  padding: 20px 10px 0;
  height: 100vh;
  border-bottom: 90px solid transparent;
  overflow-y: auto;
}

.intelligent-box {
  margin: 10px auto;
}

.intelligent {
  position: relative;
  margin: 10px auto;
  box-sizing: border-box;
  padding-top: 20px;
  width: 140px;
  height: 45px;
  font-size: 14px;
  color: #C9C9C9;
  text-align: center;
  background-color: #FFF;
  border-radius: 5px;
}

.intelligent-icon {
  position: absolute;
  top: -18px;
  left: 52px;
  width: 36px;
  height: 36px;
}

.intelligent-box>p {
  width: 100%;
  text-align: center;
  line-height: 1.5;
  font-size: 12px;
  color: #C9C9C9;
}

.bubble {
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 10px 20px;
  max-width: 280px;
  font-size: 16px;
  color: #333;
  line-height: 1.2;
  border-radius: 20px;
}

.user {
  padding-right: 20px;
  height: 20px;
  line-height: 20px;
  text-align: right;
  font-size: 12px;
  color: #C9C9C9;
}

.left-bubble {
  float: left;
  border-bottom-left-radius: 5px;
  background-color: #FFF;
}

.right-bubble {
  float: right;
  border-bottom-right-radius: 5px;
  background-color: #DEF8F2;
}

.chat-room {
  height: 100vh;
  background-color: #F6F6F6;
}

.chat-bottom {
  position: fixed;
  bottom: 50px;
  left: 0;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
}

form {
  width: 100%;
  background: #fff;
}

.chat-bottom textarea {
  position: absolute;
  display: block;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  padding-left: 10px;
  width: 100%;
  height: 40px;
  max-height: 120px;
  /*line-height: 40px;*/
  background-color: #FFF;
  border: none;
  border-right: 40px solid #FFF;
  resize: none;
  padding-top: 12px;
  font-size: 0.16rem;
}

.send {
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px;
  width: 30px;
  height: 30px;
  font-size: 0;
  background-color: #FFF;
  z-index: 2;
  text-align: center;
}

.send>img {
  width: 0.2rem;
  height: 0.2rem;
  padding-top: 5px;
}

</style>
