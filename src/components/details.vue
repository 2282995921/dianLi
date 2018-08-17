<template>
  <div id="details_news" v-html="txt">

  </div>
</template>
<script>

import { answerDetail } from '../api/getData.js'

export default {
  name: "newDetail",
  data() {
    return {
      txt: ''
    }
  },
  created() {
    this.getDetails();
  },
  methods: {
    getDetails() {
      this.$get(answerDetail, { articleId: this.$route.query.articleId }).then((res) => {
        this.txt = res.data.answer;
      })
    }
  }
}

</script>
<style>
#details_news {
  font-size: 0.14rem;
  padding: 0.1rem;
  line-height: 1.5;
  text-indent: 2em
}
#details_news p img{
  width: 100%;
  display: -webkit-box;
}
</style>
