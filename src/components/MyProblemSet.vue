<template>
  <div class="my-problem-set">
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
  import axios from '../axios/http';
  import server from '../../config/index';

  export default {
    name: 'MyProblemSet',
    data() {
      return {
        url: server.url + '/api/result',
        noVerticalBorder: false,
        tableData: [
          {
            "submitTime": "2 小时，55 分钟",
            "pname": "两数之和",
            "status": 4,
            "time": 165,
            "language": "cpp",
            "pid": "1"
          },
          {
            "submitTime": "1 小时，55 分钟",
            "pname": "两数相加",
            "status": 3,
            "time": 33,
            "language": "cpp",
            "pid": "1"
          },
          {
            "submitTime": "3 小时，55 分钟",
            "pname": "无重复字符的最长子串",
            "status": 3,
            "time": 23,
            "language": "cpp",
            "pid": "1"
          },
          {
            "submitTime": "2 小时，55 分钟",
            "pname": "删除链表的倒数第N个节点",
            "status": 3,
            "time": 323,
            "language": "cpp",
            "pid": "1"
          },
          {
            "submitTime": "2 小时，55 分钟",
            "pname": "与所有单词相关联的字串",
            "status": 4,
            "time": 233,
            "language": "cpp",
            "pid": "1"
          }
        ],
        columns: [


          {field: 'submitTime', title: '提交时间', width: 200, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {
            field: 'pname',
            title: '题名',
            width: 300,
            titleAlign: 'left',
            columnAlign: 'left',
            isResize: true,
            formatter: function (rowData, rowIndex, pagingIndex, field) {
              return '<a style="color:#08c;text-decoration: none;"  href="' + '#/problem/' + rowData.pid + '">' + rowData.pname + '</a>'
            },
          },
          {
            field: 'status',
            title: '状态',
            width: 50,
            titleAlign: 'left',
            columnAlign: 'left',
            formatter: function (rowData, rowIndex, pagingIndex, field) {
              let color = "#67C23A";
              if (rowData.status === 4) {
                color = "#F56C6C";
              }
              let status = "";
              switch(rowData.status){
                case 0:
                  status = "编译中";break;
                case 1:
                  status = "运行中";break;
                case 2:
                  status = "等待中";break;
                case 3:
                  status = "通过";break;
                case 4:
                  status = "不通过";break;
              }
              return '<span style="color:' + color + '">' + status + '</span>'
            },
            isResize: true
          },
          {
            field: 'time', title: '执行用时', width: 50, titleAlign: 'left', columnAlign: 'left', isResize: true,
            formatter: function (rowData, rowIndex, pagingIndex, field) {
              return '<span>' + rowData.time + " ms" + '</span>'
            }
          },
          {
            field: 'time', title: '使用空间', width: 50, titleAlign: 'left', columnAlign: 'left', isResize: true,
            formatter: function (rowData, rowIndex, pagingIndex, field) {
              return '<span>' + rowData.memory + " B" + '</span>'
            }
          },
          {
            field: 'language', title: '语言', width: 50, titleAlign: 'left', columnAlign: 'left', isResize: true,
            formatter: function (rowData, rowIndex, pagingIndex, field) {
              let Language = "";
              switch(rowData.language){
                case 0:
                  Language = "C";break;
                case 1:
                  Language = "C++";break;
                case 2:
                  Language = "JAVA";break;
              }
              return '<span>' + Language + '</span>'
            }
          },
        ]
      }
    },
    mounted() {
      axios.get(this.url + '/' + this.$store.state.user.uid).then(response => {
          if (response.status !== 200) {
            throw response;
          }
          else {
            console.log(response);
            let results = response.data;
            this.tableData = [];
            for(let i = 0; i < results.length;i++){
              this.tableData.push(results[i]);
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

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
