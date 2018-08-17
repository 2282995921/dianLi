<template>
  <a class="m-tabbar-item" :class="{'is-active':isActive}" @click="goToRouter">
        <span class="m-tabbar-item-icon" v-show="!isActive"><slot name="icon-normal"></slot></span>
        <span class="m-tabbar-item-icon" v-show="isActive"><slot name="icon-active"></slot></span>
        <span class="m-tabbar-item-text"><slot></slot></span>
    </a>
</template>
<script>
/**
 * m-tab-item
 * @desc 搭配 tabbar使用
 * @param id - 选中后的返回值，任意类型
 * @param isActive - 根据父组件的value和当前组件的id判断是否为选中状态
 * @param $parent.$emit('input',id) - 触发父组件的自定义事件
 * @param {slot} [icon-normal] - icon-默认图标
 * @param {slot} [icon-active] - icon-选中图标
 * @param {slot} - 文字
 *
 * @example
 * <m-tabbar-item id='tab1'>
 *       <img src="../assets/images/ic_tab_home_normal.png" alt="" slot="icon-normal"> 
 *       <img src="../assets/images/ic_tab_home_active.png" alt="" slot="icon-active"> 
 *       首页
 * </m-tabbar-item>
 */
import Vuex from 'vuex'
import store from '../store/store.js'
import { Toast } from 'mint-ui';

export default {
  props: {
    id: {
      type: String
    },
    isRouter: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isActive() {
      if (this.$parent.value == this.id) {
        return true;
      }
    }
  },
  methods: {
    goToRouter() {
      if (this.isRouter) {
        if (this.id == 'contact') {
          if (localStorage.getItem('isActive') === null) {
            Toast('请选择您的地址');
            return false;
          } else {
            this.$store.state.isActive = JSON.parse(localStorage.getItem('isActive'))
            // console.log(this.$store.state.isActive.length)
            var addressNum = this.$store.state.isActive.length;
          }
          if (addressNum > 1) {
            this.$emit('watchShow', true)
          }
          if (addressNum == 1) {
            var arr= JSON.parse(localStorage.getItem('saveAddress'))
            console.log()
            this.$router.push({ name: this.id ,query:{id:arr[0].houserholdNumber,userId:arr[0].userId}})
          }
          if (addressNum == 0) {
            Toast('请选择您的地址');
          }
        } else {
          this.$router.push({ name: this.id })
        }
      }
    }
  }
}

</script>
<style lang="less">
@import "../assets/less/var.less";
.m-tabbar-item {
  flex: 1;
  text-align: center;
  .m-tabbar-item-icon {
    display: block;
    padding-top: 7px;
    padding-bottom: 3px;
    font-size: 0.12rem;
    img {
      width: 21px;
      height: 21px;
    }
  }
  .m-tabbar-item-text {
    display: block;
    font-size: 12px;
    color: #949494;
  }
  &.is-active {
    .m-tabbar-item-text {
      color: @tabbarActiveColor;
    }
  }
}

</style>
