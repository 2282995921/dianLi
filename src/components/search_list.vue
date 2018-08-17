<template>
  <div id="news">
    <div class="search">
      <a href="javascript:;" @click="search">
        <label class="search_icon" v-if="icon">
          <img src="../assets/images/search.png" height="14" width="14" alt="">
          <span>搜索关键字查询</span>
        </label>
        <input type="text" name="search" id="myFocus" v-model="search_vla" v-on:blur="blur">
      </a>
      <!-- <div class="cancel" v-if="cancel_btn">取消</div> -->
    </div>
    <div class="notes">
      <mt-cell v-for="(item, index) in searchList" :key="index" :title="item.title" :to="{path:'/knowledgeDetail',query: {id: item.articleId}}" is-link value=""></mt-cell>
    </div>
    <!-- <demo-footer></demo-footer> -->
  </div>
</template>
<script>
import axios from 'axios'
import { keywordSearch } from '../api/getData.js'
// import DemoFooter from './DemoFooter'
export default {
  data() {
    return {
      icon: true,
      // cancel_btn: true
      search_vla: '',
      searchList: []
    }
  },
  components: {
    // DemoFooter
  },
  created() {
    this.default()
  },
  watch: {
    search_vla: {
      handler: function() {
        this.$get('/powerArea/actionManage/nuusAction/nuus.html', { lookKey: this.search_vla, channelId: this.$route.query.id }).then(res => {
          this.searchList = res.data.retList
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  },
  methods: {
    search() {
      this.icon = false;
      this.myFocus();
    },
    myFocus: function() {
      var idObj = document.getElementById('myFocus');
      idObj.focus();
    },
    blur() {
      if (this.search_vla == '') {
        this.icon = true;
      }
    },
    default () {
      this.$get('/powerArea/actionManage/nuusAction/nuusAll.html', { channelId: this.$route.query.id }).then(res => {
        this.searchList = res.data.data
      })
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#news {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  height: 100%;
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
  padding-top: 10px;
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

</style>
