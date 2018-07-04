<template>
  <div class="history">
    <my-header activeIndex="/history"></my-header>

  </div>
</template>

<script>
  // @ is an alias to /src
  import MyHeader from "../components/MyHeader";
  export default {
    name: 'history',
    components: {
      MyHeader,

    }
  }
</script>
