<template>
  <div class="problem-set">

    <v-table
      is-horizontal-resize
      style="width:100%"
      :columns="columns"
      :table-data="tableData"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      even-bg-color="#f4f4f4"
      :show-vertical-border="noVerticalBorder"
    ></v-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from '../axios/http';
  import server from '../../config/index';

  export default {
    name: 'ProblemSet',
    data() {
      return {
        url: server.url + '/api/problem',
        userUrl: server.url + '/api/user',
        noVerticalBorder: false,
        passProblems: [],
        tableData: [
          // {"isWritten": true, "pid": "1", "pname": "两数之和", "passRate": "50", "difficulty": "0"},
          // {"isWritten": false, "pid": "2", "pname": "两数相加", "passRate": "38", "difficulty": "1"},
          // {"isWritten": true, "pid": "3", "pname": "无重复字符的最长子串", "passRate": "16", "difficulty": "2"},
          // {"isWritten": false, "pid": "4", "pname": "删除链表的倒数第N个节点", "passRate": "13", "difficulty": "0"},
          // {"isWritten": false, "pid": "5", "pname": "与所有单词相关联的字串", "passRate": "18", "difficulty": "2"}
        ],
        columns: [

          {
            field: 'isWritten',
            title: '',
            width: 10,
            titleAlign: 'center',
            columnAlign: 'center',
            componentName: 'is-written-cell',
            isResize: true
          },
          {field: 'pid', title: '#', width: 10, titleAlign: 'left', columnAlign: 'left', isResize: true},
          {
            field: 'pname',
            title: '题名',
            width: 300,
            titleAlign: 'left',
            columnAlign: 'left',
            isResize: true,
            formatter: function (rowData, rowIndex, pagingIndex, field) {
              return '<a style="color:#08c;text-decoration: none;"  href="#/problem/' + rowData.pid + '">' + rowData.pname + '</a>'
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
          }

        ]
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

      setTimeout(() => {
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
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].isWritten = (this.passProblems.indexOf(this.tableData[i].pid) !== -1);
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
      }, 100);
    }
  }


  // 自定义列组件
  Vue.component('DifficultLevelCell', {
    template: `<span>
        <el-tag v-if="success" type="success">简单</el-tag>
        <el-tag v-if="warning" type="warning">中等</el-tag>
        <el-tag v-if="danger" type="danger">困难</el-tag>
        </span>`,
    props: {
      rowData: {
        type: Object
      },
    },
    computed: {
      success: function () {
        return this.rowData.difficulty === 0;
      },
      warning: function () {
        return this.rowData.difficulty === 1;
      },
      danger: function () {
        return this.rowData.difficulty === 2;
      }
    },
  })

  // 自定义列组件
  Vue.component('isWrittenCell', {
    template: `<span>
        <i v-if="isWritten" class="el-icon-check" style="color: #67C23A"></i>
        </span>`,
    props: {
      rowData: {
        type: Object
      },
    },
    computed: {
      isWritten: function () {
        return this.rowData.isWritten;
      },

    },
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
