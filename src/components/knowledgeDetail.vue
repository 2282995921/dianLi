<template>
  <div id="knowledgeDetail">
    <div v-html="text"></div>
  </div>
</template>
<script>
import { answerDetail } from '../api/getData.js'
export default {
  name: 'knowledgeDetail',
  data() {
    return {
      text: ''
    }
  },
  created() {
    this.getContent()
  },
  methods: {
    getContent() {
      this.$get(answerDetail, { articleId: this.$route.query.id }).then((res) => {
        if (res.data.code == 0) {
          this.text = res.data.answer
        }
      })
    }
  }
}

</script>
<style scoped>
#knowledgeDetail>div {
  box-sizing: border-box;
  padding: .2rem .1rem;
  font-size: .14rem;
  color: #333;
  line-height: .3rem;
}

</style>
