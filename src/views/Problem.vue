<template>
  <div class="problem">
    <my-header activeIndex="/"></my-header>
    <h1 class="title" v-model="title">{{title}}</h1>
    <div class="detail">
      <p v-model="description">{{description}}</p>
      <p style="font-weight: bold">示例:</p>
      <div class="examples">
        <pre v-model="examples">{{examples}}</pre>
      </div>
      <codemirror class="codemirror"
                  :code="code"
                  :options="cmOptions">

      </codemirror>

      <el-button style="margin: 20px 0;width:100px;float: right" type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import MyHeader from "../components/MyHeader";
  // require component
  import {codemirror} from 'vue-codemirror'

  // require styles
  import 'codemirror/lib/codemirror.css'
  import ElButton from "element-ui/packages/button/src/button";

  export default {
    name: 'Problem',
    components: {
      ElButton,
      MyHeader,
      codemirror

    },

    data() {
      return {
        title: "两数之和",
        examples: "给定 nums = [2, 7, 11, 15], target = 9\n\n因为 nums[0] + nums[1] = 2 + 7 = 9\n所以返回 [0, 1]",
        description: "给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。",
        code: "function myScript(){\n\treturn 100;\n}\n",
        cmOptions: {
          // codemirror options
          tabSize: 4,
          mode: 'javascript',
          lineNumbers: true,
          line: true,
          // more codemirror options, 更多 codemirror 的高级配置...
        }
      }
    },
    computed: {
      codemirror() {
        return this.$refs.myCm.codemirror
      }
    },
    method: {

    }
  }
</script>
<style>
  .editor {
    margin-top: 20px;
  }

  .title {
    margin-left: 30px;
  }

  .detail {
    margin: 30px;
  }

  .examples {
    width: 100%;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
  }

  p {
    line-height: 30px;
    width: 500px;
  }

  pre {
    width: 300px;
  }

  .codemirror{
    margin-top: 40px;
    border: 1px solid #ddd;
  }
</style>
