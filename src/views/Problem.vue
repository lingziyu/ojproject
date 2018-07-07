<template>
  <div class="problem">
    <my-header activeIndex="/"></my-header>
    <h1 class="title" v-model="pname">{{pname}}</h1>
    <div class="detail">
      <p v-model="description">{{description}}</p>
      <p style="font-weight: bold">示例:</p>
      <div class="examples">
        <pre v-model="tips">{{tips}}</pre>
      </div>
      <span>请选择语言</span>
      <el-select v-model="value" placeholder="请选择" class="selet-language">
        <el-option
          v-for="item in languageOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <codemirror class="codemirror" v-model="code" :options="cmOptions"></codemirror>
      <el-button style="margin: 20px 0;width:100px;float: right" type="primary" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import MyHeader from "../components/MyHeader";
  // require component
  import {codemirror} from 'vue-codemirror'

  import 'codemirror/mode/javascript/javascript.js'

  import 'codemirror/mode/python/python.js'

  import 'codemirror/mode/clike/clike.js'

  // require styles
  import 'codemirror/lib/codemirror.css'
  import axios from '../axios/http';
  import server from '../../config/index';

  export default {
    name: 'Problem',
    components: {
      MyHeader,
      codemirror
    },

    data() {
      return {
        url: server.url + '/api/problem',
        resultUrl: server.url + '/api/result',
        codeUrl: server.url + '/api/code',
        pname: "",
        tips: "",
        description: "",
        code: "",
        cmOptions: {
          // codemirror options
          tabSize: 4,
          mode: 'text/x-c++src',
          lineNumbers: true,
          line: true,
          // more codemirror options, 更多 codemirror 的高级配置...
        },
        value:1,
        languageOptions: [
          {
            value: 0,
            label: "C"
          }, {
            value : 1,
            label: "C++"
          },{
            value: 2,
            label: "JAVA"
          }]
      }
    },
    computed: {
      // cmOptions: function(){
      //   this.cmOptions.mode = value;
      //   return this.cmOptions;
      // }
    },
    methods: {
      onSubmit: function(){
        let msg = {
          "uid" : this.$store.state.user.uid,
          "pid" : this.$route.params.pid,
          "pname" : this.pname,
          "code" : this.code,
          "result" : "",
          "status" : 2, //0是编译中，1是运行中，2是等待中，3是运行成功，4是运行失败
          "time" : 0,
          "language" : this.value, //0是C语言，1是C++，2是JAVA
          "memory" : 0
        };
        axios.post(this.resultUrl,msg).then(response => {
            if (response.status !== 200) {
              throw response;
            }
            else {
              this.$message('编译中');
            }
          }
        ).catch((error) => {
          if (error.response) {
            this.$message.error('未知错误');
          }
          else {
            console.log(error);
          }
        });
      }
    },
    mounted(){
      axios.get(this.url + '/' + this.$route.params.pid).then(response => {
          if (response.status !== 200) {
            throw response;
          }
          else {
            this.pname = response.data.pname;
            this.description = response.data.description;
            this.tips = response.data.tips;
          }
        }
      ).catch((error) => {
        if (error.response) {
          this.$message.error('未知错误');
        }
        else {
          console.log(error);
        }
      });
      axios.get(this.resultUrl + '/latest/'+ this.$store.state.user.uid +'/'+ this.$route.params.pid).then(response => {
          if (response.status !== 200) {
            throw response;
          }
          else {
            this.code = response.data.code;
          }
        }
      ).catch((error) => {
        if (error.response) {

        }
        else {
          console.log(error);
        }
      });

    }


  }
</script>
<style scoped>
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

  .codemirror {
    border: 1px solid #ddd;
  }

  .selet-language{
    margin-top: 40px;
    margin-bottom: 20px;
  }
</style>
