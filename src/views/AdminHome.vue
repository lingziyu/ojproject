<template>
  <div class="admin-home">
    <my-header activeIndex="/adminhome"></my-header>
    <h1 class="title">管理题库</h1>
    <admin-problem-set></admin-problem-set>
  </div>
</template>

<script>
  // @ is an alias to /src
  import MyHeader from "../components/MyHeader";
  import AdminProblemSet from "../components/AdminProblemSet";

  export default {
    name: 'AdminHome',
    components: {
      AdminProblemSet,
      MyHeader,

    }
  }
</script>
<style scoped>
  .title {
    margin-left: 20px;
  }
</style>
