<template>
  <div id="register">
    <form v-model="form">
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">手机号</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" placeholder="请输入您的手机号码" v-model.value="form.phone" @change="checked">
          </div>
        </div>
      </div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">用电户名</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" placeholder="请输入您的姓名" v-model.value="form.name" @change="checked">
          </div>
        </div>
      </div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">用电户号</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" placeholder="请输入您的用电户号" v-model.value="form.number" @change="checked">
          </div>
        </div>
      </div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">所在地区</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" readonly="" v-model.value="form.area" @click="area" @change="checked">
          </div>
        </div>
      </div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">详细地址</label>
          </div>
          <div class="weui-cell__bd">
            <textarea class="weui-input" type="number" placeholder="如街道、门牌号、小区、单元、楼栋号等" v-model.value="form.address" id="textarea" @change="checked"></textarea>
          </div>
        </div>
      </div>
      <div class="submit">
        <a v-bind:class="{ active: check }" @click="checkForm">提交</a>
      </div>
      <mt-popup v-model="popupVisible" position="bottom" id="half">
        <div class="toolbar">
          <div class="toolbar-inner">
            <a href="javascript:;" class="picker-button close-popup" @click="whole">x</a>
            <h1 class="title">配送至</h1>
          </div>
        </div>
        <div class="modal-content">
          <div class="write_address">
            <input type="text" placeholder="省" readonly="">
            <input type="text" placeholder="市" readonly>
            <input type="text" placeholder="区" readonly>
            <input type="text" placeholder="街道" readonly>
          </div>
          <div class="jiedao">
            <p>ss</p>
            <p>ss</p>
            <p>ss</p>
            <p>ss</p>
            <p>ss</p>
            <p>ss</p>
            <p>ss</p>
            <p>ss</p>
            <p>ss</p>
          </div>
        </div>
      </mt-popup>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui';
import { Popup } from 'mint-ui';
export default {
  data() {
    return {
      form: {
        phone: '',
        name: '',
        number: '',
        area: '',
        address: ''
      },
      check: false,
      half: true,
      popupVisible: false
    }
  },
  methods: {
    checked: function() {
      if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.form.phone))) {
        Toast('手机号码有误！');
        this.check = false;
        return false;
      }
      if (this.form.name.trim() == '' || this.form.name.trim() == undefined || this.form.name.trim() == null) {
        Toast('请输入您的姓名！');
        this.check = false;
        return false;
      }
      if (this.form.number.trim() == '' || this.form.number.trim() == undefined || this.form.number.trim() == null) {
        Toast('请输入您的用电户号！');
        this.check = false;
        return false;
      }
      if (this.form.area.trim() == '' || this.form.area.trim() == undefined || this.form.area.trim() == null) {
        Toast('请输入您的所在地区！');
        this.check = false;
        return false;
      }
      if (this.form.address.trim() == '' || this.form.address.trim() == undefined || this.form.address.trim() == null) {
        Toast('请输入您的详细地址！');
        this.check = false;
        return false;
      }
      this.check = true;
    },
    checkForm() {
      this.checked();
      if (this.check) {
        axios.post('http://www.mocky.io/v2/5adeb7bf3300006d00e4d557').then((data) => {
          if (data.data.error_code == 0) {
            Toast({
              message: '提交成功',
              iconClass: 'icon icon-success'
            });
          }
        }).catch((data) => {

        })
      }
    },
    area() {
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
#register {
  font-size: 0.16rem;
  margin-top: 0.1rem;
}

.weui-cells {
  background: #fff;
  position: relative;
}

.weui-cell {
  padding: 10px 15px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.weui-cells:after {
  bottom: 0;
  left: 20px;
  border-bottom: 1px solid #e5e5e5;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
}

.weui-cells:after,
.weui-cells:before {
  content: " ";
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  color: #e5e5e5;
  z-index: 2;
}

.weui-cell__bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}

.weui-label {
  display: block;
  width: 105px;
  word-wrap: break-word;
  word-break: break-all;
}

.weui-input {
  width: 100%;
  border: 0;
  outline: 0;
  -webkit-appearance: none;
  background-color: transparent;
  font-size: inherit;
  color: inherit;
  height: 2.47058824em;
  /*line-height: 2.47058824;*/
}

.submit {
  -webkit-display: flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  margin-top: 0.4rem;
}

.submit a {
  width: 80%;
  display: inline-block;
  font-size: 0.18rem;
  padding: 0.1rem;
  text-align: center;
  background: #ededee;
  border-radius: 20px;
  color: #bbbbbc;
  border: none;
}

#textarea {
  font-size: 16px;
  /*padding-top: 10px;*/
  box-sizing: border-box;
  font-weight: normal;
  outline: none;
  color: #757575;
  resize:none;
}

.submit .active {
  background: #1bbc9b;
  color: #fff;
}

.weui-popup__modal .toolbar {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1;
}

.toolbar .toolbar-inner {
  height: 0.32rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  text-align: center;
}

.toolbar .picker-button {
  position: absolute;
  right: 0;
  box-sizing: border-box;
  height: 0.32rem;
  line-height: 0.32rem;
  color: #04BE02;
  z-index: 1;
  padding: 0 .1rem;
}

.toolbar .title {
  position: absolute;
  display: block;
  width: 100%;
  padding: 0;
  font-size: 0.14rem;
  font-weight: normal;
  line-height: 0.32rem;
  color: #3d4145;
  text-align: center;
  white-space: nowrap;
}

.weui-popup__modal .modal-content {
  height: 100%;
  padding-top: 0.22rem;
  overflow: auto;
  box-sizing: border-box;
}

#half {
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.write_address {
  display: flex;
  flex-direction: row;
  border-bottom: 1px #EFF0F2 solid;
}

.write_address input {
  border: none;
  width: 20%;
  text-align: center;
}
.jiedao{
  padding: 0.1rem;
}
.jiedao p{
  padding: 0.1rem;
}
</style>
