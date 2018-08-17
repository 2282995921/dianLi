<template>
  <div class="chat-room">
    <div class="main-content" id="bubble">
      <div class="intelligent-box">
        <div class="intelligent">
          <img class="intelligent-icon" src="../../static/image/kefu.png" alt=""> 在线人工客服
        </div>
        <p>在线人工客服进入会话为您服务</p>
      </div>
      <ul class="bubble-list">
        <li class="clear" v-for="(item, index) in bubbleList" :key="index">
          <p class="user" v-if="item.type === 'user'">客户编号：{{houserholdNumber}}</p>
          <div class="clear bubble" :class="{'left-bubble': item.type === 'kefu', 'right-bubble': item.type === 'user'}">
            <div v-html="item.content" @click="clickImg(index,$event)"></div>
            <div class="txt" v-if="item.ext">
              <!-- <div class="img_list" v-for="(item,index) in img_list" v-if="img_list[index] == starNum"> -->
              <img v-for="(item,index) in stars" v-bind:src="item.src" v-on:click="flag&&rating(index)" alt="星星图片" width="28" height="25" />
              <!-- </div> -->
            </div>
          </div>
        </li>
      </ul>
      <transition name="bounce">
        <div id="enlarge" v-if="img.show" @click="enlarge"><img :src="img.url" alt=""></div>
      </transition>
    </div>
    <div class="chat-bottom">
      <form action="">
        <textarea v-model="mySendMessage" id="textarea" placeholder="请输入内容" @keyup.13="sendPrivateText"></textarea>
      </form>
      <div class="toobar">
        <input type="file" id="image" @change="selectVal">
      </div>
      <span class="send" @click="sendPrivateText">
        <img src="../../static/image/enter.png" alt="" width='25' height='25'>
      </span>
    </div>
    <demo-footer></demo-footer>
  </div>
</template>
<script>
import axios from 'axios'
import DemoFooter from './DemoFooter'
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      mySendMessage: '',
      toObj: '',
      userId: '',
      houserholdNumber: this.$route.query.id,
      starOffImg: "../../static/image/star_noal.png",
      starOnImg: "../../static/image/star_active.png",
      bubbleList: [],
      stars: [{
          src: "../../static/image/star_noal.png",
          active: false
        }, {
          src: "../../static/image/star_noal.png",
          active: false
        }, {
          src: "../../static/image/star_noal.png",
          active: false
        },
        {
          src: "../../static/image/star_noal.png",
          active: false
        }, {
          src: "../../static/image/star_noal.png",
          active: false
        }
      ],
      starNum: 0,
      flag: true,
      img: {
        show: false,
        url: ''
      }
    }
  },
  components: {
    DemoFooter
  },
  created() {
    this.getCustomerID();
    // this.hxLogin();
    this.findCustomer();
    // this.defaultReply();
    this.setHX();
    Toast('正在为您查找人工客服...');
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
    // 初始化 =》应在登录成功后
    // defaultReply() {
    //   var obj = {};
    //   obj.type = 'kefu';
    //   obj.ext = false,
    //     obj.content = '你好，我是人工客服工号'+this.toObj+'，有什么问题可以帮到您呢~';
    //   this.bubbleList.push(obj);
    // },
    // 环信注册
    getCustomerID() {
      // console.log(this.$route.query.id)
      axios.get('/powerArea/actionManage/userAction/register.html', { params: { userName: this.$route.query.id } })
        .then((data) => {
          if (data.data.code == 0) {
            console.log(data.data.msg)
            this.hxLogin();
          } else {
            this.hxLogin();
            console.log(data.data.msg)
          }
        }).catch((error) => {
          console.log(error);
        });
    },
    // 环信登录
    hxLogin() {
      this.$imConn.open({
        apiUrl: this.$WebIM.config.apiURL,
        user: this.$route.query.id,
        pwd: '123456',
        appKey: this.$WebIM.config.appkey,
        success: function(res) {
          console.log('登录成功！')
        },
        error: function(err) {
          alert(err)
        }
      });
    },
    // 查找客服
    findCustomer() {
      axios.get('/powerArea/actionManage/Customer/findCustomer.html', { params: { houserholdNumber: this.$route.query.id } })
        .then((data) => {
          var obj = {};
          obj.type = 'kefu';
          obj.ext = false;
          if (data.data.code == 0) {
            this.toObj = data.data.data.houserholdNumber;
            this.userId = data.data.data.userId;
            obj.content = '你好，我是人工客服工号' + data.data.data.houserholdNumber + '，有什么问题可以帮到您呢~';
            this.bubbleList.push(obj);
          } else {
            obj.content = '暂未找到客服！';
            this.bubbleList.push(obj);
            // console.log(data.data)
            // Toast('人工客服忙，暂未找到客服！');
          }
        }).catch((error) => {
          console.log(error);
        });
    },
    selectVal() {
      this.sendPrivateImg();
    },
    // 设置环信消息回调
    setHX() {
      let self = this
      this.$imConn.listen({
        onOpened: function(message) { // 连接成功回调
          // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
          // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
          // 则无需调用conn.setPresence();
          // var obj = {};
          // obj.type = 'kefu';
          // obj.content = '你好，我是人工客服工号007，有什么问题可以帮到您呢~';
          // self.bubbleList.push(obj);
        },
        onClosed: function(message) {}, // 连接关闭回调
        onTextMessage: function(message) {
          console.log('接收到文本消息')
          if (message.ext.identifier == 'customMessage') {
            self.bubbleList.push({
              type: 'kefu',
              ext: true,
              content: message.data
            })
          } else {
            self.bubbleList.push({
              type: 'kefu',
              ext: false,
              content: message.data
            })
          }
        }, // 收到文本消息
        onEmojiMessage: function(message) {
          // 当为WebIM添加了Emoji属性后，若发送的消息含WebIM.Emoji里特定的字符串，connection就会自动将
          // 这些字符串和其它文字按顺序组合成一个数组，每一个数组元素的结构为{type: 'emoji(或者txt)', data:''}
          // 当type='emoji'时，data表示表情图像的路径，当type='txt'时，data表示文本消息
          console.log('接收到表情消息')
          console.log(message)
          var data = message.data;
          var obj = {};
          obj.type = 'kefu';
          var Emoji = [];
          for (var i = 0, l = data.length; i < l; i++) {
            if (data[i].type == 'emoji') {
              Emoji.push('<img src="' + data[i].data + '" alt=""/>');
            }
            if (data[i].type == 'txt') {
              Emoji.push(data[i].data);
            }
          }
          obj.content = Emoji.join('');
          self.bubbleList.push(obj);

        }, // 收到表情消息
        onPictureMessage: function(message) {
          console.log('收到图片信息')
          console.log(message)
          var obj = {};
          obj.type = 'kefu';
          obj.content = '<img src="' + message.url + '" alt=""  width="80" height="80"/>';
          self.bubbleList.push(obj);
        }, // 收到图片消息

        onAudioMessage: function(message) {}, // 收到音频消息
        onLocationMessage: function(message) {}, // 收到位置消息
        onFileMessage: function(message) {}, // 收到文件消息
        onOnline: function() {}, // 本机网络连接成功
        onOffline: function() {}, // 本机网络掉线
        onError: function(message) {}, // 失败回调
        onReceivedMessage: function(message) {}, // 收到消息送达服务器回执
        onDeliveredMessage: function(message) {}, // 收到消息送达客户端回执
        onReadMessage: function(message) {} // 收到消息已读回执
      })
    },

    // 单聊发送文本消息
    sendPrivateText() {
      var id = this.$imConn.getUniqueId();
      var msg = new WebIM.message('txt', id);
      console.log(id)
      var obj = {};
      obj.type = 'user';
      var self = this;
      msg.set({
        msg: this.mySendMessage,
        to: self.toObj,
        roomType: false,
        success: function(id, serverMsgId) {
          console.log('发送消息成功');
          obj.ext = false;
          obj.content = self.mySendMessage;
          self.bubbleList.push(obj);
          self.mySendMessage = '';
        },
        fail: function(e) {
          console.log("Send private text error");
        }
      });
      console.log(msg)
      msg.body.chatType = 'singleChat';
      this.$imConn.send(msg.body);
    },

    // 单聊发送图片消息
    sendPrivateImg() {
      var id = this.$imConn.getUniqueId(); // 生成本地消息id
      var msg = new WebIM.message('img', id); // 创建图片消息
      var input = document.getElementById('image'); // 选择图片的input
      var file = WebIM.utils.getFileUrl(input); // 将图片转化为二进制文件
      var allowType = {
        'jpg': true,
        'gif': true,
        'png': true,
        'bmp': true
      };
      var self = this;
      if (file.filetype.toLowerCase() in allowType) {
        var option = {
          apiUrl: WebIM.config.apiURL,
          file: file,
          to: self.toObj, // 接收消息对象
          roomType: false,
          chatType: 'singleChat',
          onFileUploadError: function() { // 消息上传失败
            console.log('onFileUploadError');
          },
          onFileUploadComplete: function() { // 消息上传成功
            console.log('onFileUploadComplete');
          },
          success: function(res) { // 消息发送成功
            console.log('Success');
            var obj = {};
            obj.ext = false;
            obj.type = 'user';
            obj.content = '<img src="' + file.url + '" alt=""  width="80" height="80"/>';
            self.bubbleList.push(obj);
            console.log(self.bubbleList);
          },
          flashUpload: WebIM.flashUpload
        };
        msg.set(option);
        this.$imConn.send(msg.body);
      }
    },
    rating: function(index) {

      var total = this.stars.length; //星星总数
      var idx = index + 1; //这代表选的第idx颗星-也代表应该显示的星星数量

      //进入if说明页面为初始状态
      if (this.starNum == 0) {
        this.starNum = idx;
        for (var i = 0; i < idx; i++) {
          this.stars[i].src = this.starOnImg;
          this.stars[i].active = true;
        }
      } else {
        //如果再次点击当前选中的星级-仅取消掉当前星级，保留之前的。
        if (idx == this.starNum) {
          for (var i = index; i < total; i++) {
            this.stars[i].src = this.starOffImg;
            this.stars[i].active = false;
          }
        }
        //如果小于当前最高星级，则直接保留当前星级
        if (idx < this.starNum) {
          for (var i = idx; i < this.starNum; i++) {
            this.stars[i].src = this.starOffImg;
            this.stars[i].active = false;
          }
        }
        //如果大于当前星级，则直接选到该星级
        if (idx > this.starNum) {
          for (var i = 0; i < idx; i++) {
            this.stars[i].src = this.starOnImg;
            this.stars[i].active = true;
          }
        }

        var count = 0; //计数器-统计当前有几颗星
        for (var i = 0; i < total; i++) {
          if (this.stars[i].active) {
            count++;
          }
        }
        this.starNum = count;
      }
      this.sendStar();
      this.flag = false;
      this.sendAjax();
    },
    sendAjax() {
      this.$get('/powerArea/actionManage/evaluationAction/insert.html', {
          userId: this.$route.query.userId,
          servicerId: this.userId,
          evaluatePoints: this.starNum
        }).then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sendStar() {
      var id = this.$imConn.getUniqueId();
      var msg = new WebIM.message('txt', id);
      console.log(id)
      var obj = {};
      obj.starNum = this.starNum.toString();
      obj.identifier = 'customMessage';
      var self = this;
      msg.set({
        msg: this.mySendMessage,
        to: self.toObj,
        roomType: false,
        ext: obj,
        success: function(id, serverMsgId) {
          console.log('发送消息成功');
        },
        fail: function(e) {
          console.log("Send private text error");
        }
      });
      console.log(msg)
      msg.body.chatType = 'singleChat';
      this.$imConn.send(msg.body);
    },
    clickImg(index, e) {
      if (e.srcElement.localName == 'img') {
        this.img.url = e.target.src;
        this.img.show = true;
      }
    },
    enlarge() {
      this.img.show = false;
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#enlarge {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

#enlarge img {
  max-width: 100%;
}

.toobar {
  position: absolute;
  right: 40px;
  top: 5px;
  width: 30px;
  height: 30px;
  background: url(../../static/image/picture.png) no-repeat center;
  background-size: 100% 100%;
}

#image {
  width: 30px;
  height: 30px;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
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
  line-height: 20px;
  height: 20px;
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
  line-height: 40px;
  background-color: #FFF;
  border: none;
  border-right: 80px solid #FFF;
  resize: none;
  font-size: 0.16rem;
}

.send {
  position: absolute;
  right: 5px;
  top: 5px;
  /*padding: 5px;*/
  width: 30px;
  height: 30px;
  font-size: 0;
  background-color: #FFF;
  z-index: 2;
  text-align: center;
  box-sizing: border-box;
}

.send>img {
  width: 23px;
  height: 23px;
  position: absolute;
  top: 5px;
  left: 5px;
}

</style>
