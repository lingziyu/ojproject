<template>
  <div class="login">
    <my-header activeIndex="/login"></my-header>
  </div>
</template>

<script>
  // @ is an alias to /src
  import MyHeader from "../components/MyHeader";
  export default {
    name: 'Login',
    components: {
      MyHeader,

    }
  }
</script>
