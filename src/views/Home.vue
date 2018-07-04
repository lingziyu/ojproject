<template>
  <div class="home">
    <my-header activeIndex="/"></my-header>
    <h1 class="title">题库</h1>
    <problem-set></problem-set>
  </div>
</template>

<script>
  // @ is an alias to /src
  import MyHeader from "../components/MyHeader";
  import ProblemSet from "../components/ProblemSet";

  export default {
    name: 'Home',
    components: {
      ProblemSet,
      MyHeader,

    }
  }
</script>
<style>
  .title{
    margin-left: 20px;
  }
</style>
