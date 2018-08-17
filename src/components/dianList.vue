<template>
  <div class="list">
    <router-link :to="{path:'/search_list',query: {id: item.articleId}}" v-for="(item,index) in newsList">
      <div class="list_img">
        <img :src="'http://dianli.hbnrtech.com/powerArea/'+item.memo" height="" width="" alt="">
        <p>{{item.title}}</p>
      </div>
    </router-link>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      newsList: []
    }
  },
  created() {

  },
  mounted() {
    this.getColumn();
  },
  methods: {
    getColumn() {
      this.$get('/powerArea/actionManage/nuusAction/nuusAll.html', { channelId: '2' }).then((data) => {
          if (data.data.code == 0) {
            data.data.data.push({ title: '' })
            this.newsList = data.data.data;
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

</script>
<style scoped>
.list a:last-child {
  opacity: 0;
  pointer-events: none;
  cursor: default;
}

.list {
  padding: 0.1rem 0.15rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #f6f6f6;
  padding-bottom: 0.5rem;
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
  max-width: 100%;
  height: 93px;
  display: inline-block;
}

.list_img p {
  margin: 0.1rem 0;
  color: #9c9c9c;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
