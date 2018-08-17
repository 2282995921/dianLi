<template>
  <div id="news">
    <div class="search">
      <router-link to="/search_list">
        <label class="search_icon">
          <img src="../assets/images/search.png" height="14" width="14" alt="">
          <span>搜索关键字查询</span>
        </label>
        <input type="text" name="search" readonly="">
      </router-link>
    </div>
    <dian-list></dian-list>
    <demo-footer></demo-footer>
  </div>
</template>
<script>
import DemoFooter from './DemoFooter'
import dianList from './dianList'
import axios from 'axios';

export default {
  data() {
    return {

    }
  },
  components: {
    DemoFooter,
    dianList
  },
  methods: {

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0.1rem 0.15rem;
  position: relative;
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
  text-align: center;
  color: #9a9a9a;
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

.list {
  padding: 0.1rem 0.15rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.list a {
  width: 30%;
  font-size: 0.14rem;
  display: inline-block;
  box-sizing: border-box;
  box-shadow: 0 0 10px -10px #06c;
  padding: 0.05rem;
  background: #fff;
  box-shadow: 0px 3px 8px rgb(221, 221, 221);
  border-radius: 4px;
  margin: 0.1rem 0;
}

.list_img {
  flex-direction: column;
}

.list_img img {
  width: 100%;
  display: inline-block;
}

.list_img p {
  margin: 0.1rem 0;
  color: #9c9c9c;
}

</style>
