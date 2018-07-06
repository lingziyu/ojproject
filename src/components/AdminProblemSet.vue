<template>
  <div class="admin-problem-set">
    <el-button style="margin-bottom: 20px;margin-left: 20px" size="small" type="primary" icon="el-icon-plus" @click="addCase"></el-button>

    <v-table
      is-horizontal-resize
      style="width:100%"
      :columns="columns"
      :table-data="tableData"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      even-bg-color="#f4f4f4"
      :show-vertical-border="noVerticalBorder"
      @on-custom-comp="customCompFunc"
    ></v-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from '../axios/http';
  import server from '../../config/index';

  export default {
    name: 'AdminProblemSet',
    data() {
      return {
        url: server.url + '/api/problem',
        userUrl: server.url + '/api/user',
        noVerticalBorder: false,
        passProblems: [],
        tableData: [],
        columns: [
          {field: 'pid', title: '#', width: 20, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {
            field: 'pname',
            title: '题名',
            width: 300,
            titleAlign: 'left',
            columnAlign: 'left',
            isResize: true,
            formatter: function (rowData, rowIndex, pagingIndex, field) {
              return '<a style="color:#08c;text-decoration: none;"  href="#/adminproblem/' + rowData.pid + '">' + rowData.pname + '</a>'
            },
          },
          {
            field: 'passRate',
            title: '通过率', width: 50,
            titleAlign: 'left',
            columnAlign: 'left',
            isResize: true,
            formatter: function (rowData, rowIndex, pagingIndex, field) {
              return '<span>' + rowData.passRate + "%" + '</span>'
            },
          },
          {
            field: 'difficulty',
            title: '难度',
            width: 50,
            titleAlign: 'center',
            columnAlign: 'center',
            componentName: 'difficult-level-cell',
            isResize: true,
          },
          {
            field: 'custome-adv',
            title: '',
            width: 200,
            titleAlign: 'center',
            columnAlign: 'center',
            componentName: 'table-operation',
            isResize: true,
          }

        ]
      }
    },
    methods: {
      addCase(){

      },
      customCompFunc(params) {

        // console.log(params);

        if (params.type === 'delete') { // do delete operation

          this.$delete(this.tableData, params.index);

        } else if (params.type === 'edit') { // do edit operation

          // alert(`行号：${params.index} 姓名：${params.rowData['pid']}`)
          this.$router.push({name: 'AdminProblem', params: {pid: params.rowData['pid']}});

        }


      }
    },
    mounted() {
      this.passProblems = [];
      this.tableData = [];
      axios.get(this.userUrl + "/" + this.$store.state.user.uid).then(response => {
          if (response.status !== 200) {
            throw response;
          }
          else {
            this.passProblems = response.data.passProblem;
            if (this.tableData.length !== 0) {
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].isWritten = (this.passProblems.indexOf(this.tableData[i].pid) !== -1);
              }
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

      axios.get(this.url).then(response => {
          if (response.status !== 200) {
            throw response;
          }
          else {
            // console.log(response);
            let results = response.data;
            for (let i = 0; i < results.length; i++) {
              let tmp = results[i];
              if (results[i].submitCount === 0)
                tmp.passRate = 0;
              else
                tmp.passRate = results[i].passCount / results[i].submitCount;
              this.tableData.push(tmp);
            }
            if (this.passProblems.length !== 0) {
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].isWritten = (this.passProblems.indexOf(this.tableData[i].pid) !== -1);
              }
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
  //<a style="text-decoration: none;color: #409EFF;" href="#/editproblem/` + this.rowData + `">编辑</a>
  Vue.component('table-operation', {
    template: `<span>
        <a style="text-decoration: none;color: #409EFF;" href="" @click.stop.prevent="update(rowData,index)">编辑</a>
        <a style="text-decoration: none;color: #409EFF;" href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
        </span>`,
    props: {
      rowData: {
        type: Object
      },
      index: {
        type: Number
      },
    },
    methods: {
      update() {
        // 参数根据业务场景随意构造
        let params = {type: 'edit', index: this.index, rowData: this.rowData};
        this.$emit('on-custom-comp', params);
      },

      deleteRow() {
        // 参数根据业务场景随意构造
        let params = {type: 'delete', index: this.index};
        this.$emit('on-custom-comp', params);

      }
    }
  })

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
