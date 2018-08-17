<template>
  <div id="NewsList">
    <scroller :on-refresh="refresh" :on-infinite="infinite" style="padding-top: 55px;">
      <ul class="news-box">
        <li v-for="item in items" class="news-item">
          <div class="time-box">
            <span class="time">{{item.releaseTime}}</span>
          </div>
          <router-link :to="{path:'/details',query: {articleId: item.articleId}}">
            <div class="item-content">
              <img :src="'http://dianli.hbnrtech.com/powerArea/'+item.picPath" alt="" width="" height="" class="item-img">
              <div class="item-text">
                <p class="title">{{item.shortTitle}}</p>
                <p class="text-content ellipsis">{{item.title}}</p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </scroller>
  </div>
</template>
<script>
import axios from 'axios';
import getNewsList from "@/api/getData.js";
export default {
  name: "NewsList",
  data() {
    return {
      items: [],
      offset: 0,
      limit: 10
    };
  },
  methods: {
    getDate(offset, fn) {
      axios.get('/powerArea/actionManage/annouAction/queAnnou.html', { params: { annouName: '新闻公告', begNumber: offset, pageSize: this.limit } }).then((data) => {
        if (data.data.code == 0) {
          if (data.data.data.length < 10) { //每次请求数据是10条，如果数据不够10条，就是没数据了 让页数=0；
            this.offset = 0
            fn(true)
            // return
          } else {
            if (fn) fn()
          }
          if (offset === 1) {
            this.items = data.data.data //如果是想下滑动，刷新数据 就让items等于最新数据
          } else {
            this.items = this.items.concat(data.data.data) //否则就把数据拼接
          }
        }else{
          return false;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    infinite: function(done) {
      this.offset++ //每当向上滑动的时候就让页数加1
        this.getDate(this.offset, done)
    },
    refresh: function(done) {
      this.offset = 0
      this.getDate(1, done)
    }
  }
};

</script>
<style scoped>
#NewsList {
  width: 100vw;
  box-sizing: border-box;
  position: relative;
  height: 100%;
}

.news-box {
  padding: 0.1rem 0.125rem;
  background-color: #f6f6f6;
  box-sizing: border-box;
}

.news-item {
  margin-bottom: 0.2rem;
}

.time-box {
  text-align: center;
  font-size: 0;
}

.time {
  display: inline-block;
  margin: 0.1rem auto;
  padding: 0 0.05rem;
  line-height: 0.2rem;
  font-size: 0.12rem;
  color: #fff;
  background-color: #cecece;
  border-radius: 0.06rem;
}

.item-content {
  border-radius: 0.1rem;
  box-shadow: 0 0.06rem 0.06rem #e4e4e4;
  overflow: hidden;
  font-size: 0;
}

.item-img {
  width: 100%;
  height: 197px;
  display: inline-block;
  background-color: #fff;
}

.item-text {
  margin-top: 0.1rem;
  padding: 0 0.25rem 0.1rem;
}

.title {
  line-height: 0.3rem;
  font-size: 0.16rem;
  color: #333;
}

.text-content {
  line-height: 0.2rem;
  font-size: 0.12rem;
  color: #7f7f7f;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
