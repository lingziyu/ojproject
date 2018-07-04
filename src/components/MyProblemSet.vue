<template>
  <div class="my-problem-set" >
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
  export default {
    name: 'MyProblemSet',
    data() {
      return {
        noVerticalBorder:false,
        tableData: [
          {"time": "2 小时，55 分钟","title": "两数之和", "state": "通过", "runTime": 165,"language":"cpp","url":"http://www.baidu.com"},
          {"time": "1 小时，55 分钟", "title": "两数相加", "state": "通过", "runTime": 33,"language":"cpp","url":"www.baidu.com"},
          {"time": "3 小时，55 分钟","title": "无重复字符的最长子串", "state": "不通过", "runTime": 23,"language":"cpp","url":"www.baidu.com"},
          {"time": "2 小时，55 分钟","title": "删除链表的倒数第N个节点", "state": "没通过", "runTime": 323,"language":"cpp","url":"www.baidu.com"},
          {"time": "2 小时，55 分钟","title": "与所有单词相关联的字串", "state": "通过", "runTime": 233,"language":"cpp","url":"www.baidu.com"}
        ],
        columns: [


          {field: 'time', title: '提交时间', width: 200, titleAlign: 'center', columnAlign: 'center', isResize: true},
          {
            field: 'title',
            title: '题名',
            width: 300,
            titleAlign: 'left',
            columnAlign: 'left',
            isResize: true,
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return '<a style="color:#08c;text-decoration: none;"  href="'+rowData.url+'">' + rowData.title + '</a>'
            },
          },
          {field: 'state',
            title: '状态',
            width: 50,
            titleAlign: 'left',
            columnAlign: 'left',
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              let color = "#F56C6C";
              if(rowData.state === "通过"){
                color = "#67C23A";
              }
              return '<span style="color:'+color+'">' + rowData.state + '</span>'
            },
            isResize: true},
          {field: 'runTime', title: '执行用时', width: 50, titleAlign: 'left', columnAlign: 'left', isResize: true,
            formatter: function (rowData,rowIndex,pagingIndex,field) {
              return '<span>' + rowData.runTime +" ms" + '</span>'
            }
          },
          {field: 'language', title: '语言', width: 50, titleAlign: 'left', columnAlign: 'left', isResize: true},


        ]
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
