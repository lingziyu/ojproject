<template>
  <div class="admin-problem">
    <my-header activeIndex="/"></my-header>
    <h1 class="title">编辑题目</h1>
    <el-form class="form" :model="elForm" label-position="top">
      <el-form-item label="标题">
        <el-input v-model="elForm.pname"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" :rows="3" v-model="elForm.description"></el-input>
      </el-form-item>
      <el-form-item label="实例">
        <el-input type="textarea" :rows="4" v-model="elForm.tips"></el-input>
      </el-form-item>
      <el-form-item label="难度">
        <el-select v-model="elForm.value" placeholder="请选择">
          <el-option
            v-for="item in difficultyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测试用例">
        <br>
        <el-button style="margin-bottom: 20px" size="small" type="primary" icon="el-icon-plus" @click="addCase"></el-button>
        <v-table
          @on-custom-comp="customCompFunc"
          is-horizontal-resize
          style="width:100%"
          :columns="columns"
          :table-data="caseTable"
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          :cell-edit-done="cellEditDone"
        ></v-table>
      </el-form-item>
      <el-form-item>
        <el-button style="float:right;width:100px;margin-top: 20px" type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // @ is an alias to /src
  import MyHeader from "../components/MyHeader";
  import axios from '../axios/http';
  import server from '../../config/index';
  import Vue from 'vue'

  export default {
    name: 'AdminProblem',
    components: {
      MyHeader,
    },

    data() {
      return {
        caseTable: [
          {"input": "1 3", "output": "4"},
          {"input": "3 4", "output": "7"}
        ],
        difficultyOptions:[
          {"value" : 0, "label" :"容易"},
          {"value" : 1, "label" :"中等"},
          {"value" : 2, "label" :"困难"}
        ],
        columns: [
          {
            field: 'input', title: '输入', width: 200, titleAlign: 'center', columnAlign: 'center', isEdit: true,
            formatter: function (rowData, rowIndex, pagingIndex, field) {

              return `<span class='cell-edit-color'>${rowData[field]}</span>`;
            }, isResize: true
          },
          {
            field: 'output',
            title: '输出',
            width: 200,
            titleAlign: 'center',
            columnAlign: 'center',
            isEdit: true,
            isResize: true
          },
          {
            field: 'custome-adv',
            title: '',
            width: 40,
            titleAlign: 'center',
            columnAlign: 'center',
            componentName: 'table-delete',
            isResize: true
          }

        ],

        elForm: {
          pname: "",
          tips: "",
          description: "",
          value: 0
        },
        url: server.url + '/api/problem',
        codeUrl: server.url + '/api/testCase',
      }
    },

    methods: {
      addCase(){
        this.caseTable.push({
          input:'',
          output:''
        })
      },
      // 单元格编辑回调
      cellEditDone(newValue, oldValue, rowIndex, rowData, field) {

        this.caseTable[rowIndex][field] = newValue;

        // 接下来处理你的业务逻辑，数据持久化等...
      },
      customCompFunc(params) {

        console.log(params);

        if (params.type === 'delete') { // do delete operation

          this.$delete(this.caseTable, params.index);

        }

      },
      onSubmit: function () {
        let inputs = [];
        let outputs = [];
        for(let i = 0; i < this.caseTable.length;i++){
          inputs.push(this.caseTable[i].input);
          outputs.push(this.caseTable[i].output);
        }
        let msg = {
          "pid": this.$route.params.pid,
          "pname": this.elForm.pname,
          "description": this.elForm.description,
          "tips": this.elForm.tips,
          "difficulty": this.elForm.value,
          "inputs" : inputs,
          "outputs" : outputs
        };
        axios.put(this.url, msg).then(response => {
            if (response.status !== 200) {
              throw response;
            }
            else {
              this.$message('更新成功');
              this.$router.push('/adminhome')
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
    mounted() {
      axios.get(this.url + '/' + this.$route.params.pid).then(response => {
          if (response.status !== 200) {
            throw response;
          }
          else {
            this.elForm.pname = response.data.pname;
            this.elForm.description = response.data.description;
            this.elForm.tips = response.data.tips;
            this.elForm.value = response.data.difficulty;
            let inputs = response.data.inputs;
            let outputs = response.data.outputs;
            this.caseTable = [];
            for(let i = 0; i < inputs.length; i++){
              let tmp = {
                "input" : inputs[i],
                "output" : outputs[i]
              };
              this.caseTable.push(tmp);
            }
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
  }


  // 自定义列组件
  Vue.component('table-delete', {
    template: `<span>
        <a style="color:#08c;text-decoration: none;" href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
        </span>`,
    props: {
      rowData: {
        type: Object
      },
      field: {
        type: String
      },
      index: {
        type: Number
      }
    },
    methods: {
      deleteRow() {

        // 参数根据业务场景随意构造
        let params = {type: 'delete', index: this.index};
        this.$emit('on-custom-comp', params);

      }
    }
  })
</script>
<style scoped>

  .title {
    margin-top: 50px;
    margin-left: 50px;
  }

  .form {
    margin: 50px;
    max-width: 800px;
  }

  .cell-edit-color {
    color: #2db7f5;
    font-weight: bold;
  }

</style>
