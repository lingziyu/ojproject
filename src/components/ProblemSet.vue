<template>
  <div class="problem-set" >
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
    name: 'ProblemSet',
    data() {
      return {
        noVerticalBorder:false,
        tableData: [
          {"isWritten": true, "index":1,"title": "两数之和", "passRate": "50", "difficultLevel": "0","url":"http://www.baidu.com"},
          {"isWritten": false,"index":2, "title": "两数相加", "passRate": "38", "difficultLevel": "1","url":"www.baidu.com"},
          {"isWritten": true, "index":3,"title": "无重复字符的最长子串", "passRate": "16", "difficultLevel": "2","url":"www.baidu.com"},
          {"isWritten": false,"index":4, "title": "删除链表的倒数第N个节点", "passRate": "13", "difficultLevel": "0","url":"www.baidu.com"},
          {"isWritten": false,"index":5, "title": "与所有单词相关联的字串", "passRate": "18", "difficultLevel": "2","url":"www.baidu.com"}
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
          {field: 'index', title: '#', width: 10, titleAlign: 'left', columnAlign: 'left', isResize: true},
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
          {field: 'passRate', title: '通过率', width: 50, titleAlign: 'left', columnAlign: 'left', isResize: true},
          {
            field: 'difficultLevel',
            title: '难度',
            width: 50,
            titleAlign: 'center',
            columnAlign: 'center',
            componentName: 'difficult-level-cell',
            isResize: true,
          }

        ]
      }
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
      rowData:{
        type:Object
      },
    },
    computed:{
      success:function () {
        return this.rowData.difficultLevel === "0";
      },
      warning:function () {
        return this.rowData.difficultLevel === "1";
      },
      danger:function () {
        return this.rowData.difficultLevel === "2";
      }
    },
  })

  // 自定义列组件
  Vue.component('isWrittenCell', {
    template: `<span>
        <i v-if="isWritten" class="el-icon-check" style="color: #67C23A"></i>
        </span>`,
    props: {
      rowData:{
        type:Object
      },
    },
    computed:{
      isWritten:function () {
        return this.rowData.isWritten;
      },

    },
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
