<template>
  <div class="history">
    <my-header activeIndex="/history"></my-header>
    <h1 class="title">提交历史</h1>
    <my-problem-set></my-problem-set>
  </div>
</template>

<script>
  // @ is an alias to /src
  import MyHeader from "../components/MyHeader";
  import MyProblemSet from "../components/MyProblemSet";
  export default {
    name: 'history',
    components: {
      MyProblemSet,
      MyHeader
    }
  }
</script>
<style scoped>
  .title{
    margin-left: 20px;
  }
</style>
