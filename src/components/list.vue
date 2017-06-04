<style scoped>
</style>
<template>
<div id="listBody">
  <ul class="listnav">
    <li v-for="nav in selects" :key="nav.value" @click="onTabSelect(nav.value)">{{ nav.text }}</li>
  </ul>
  <ul class="list">
    <li v-for="(item,index) in getData" :key="item.id" @click="goToCont(item.id)" >
      <span :class="{type: item.tab, good: item.good}" v-if="item.tab">{{item.tab | tab}}</span>
      <span class="index" :title="index + 1">{{(index + 1) > 9999 ? "..." : (index + 1)}}</span>
      <span class="face">
        <img :src="item.author.avatar_url" alt="" :title="item.author.loginname"/>
      </span>
      <span class="title" :title="item.titlle">{{item.title}}</span>
    </li>
  </ul>
  <div class="list_page"><span v-show="page != 1" @click="prev">上一页</span><span @click="next">下一页</span></div>
</div>
</template>
<script src='../lib/PrefixFree.js'></script>
<script>
// import Vue from 'vue'
// import VueResource from 'vue-resource'
import common from '../lib/common'
import {
        Indicator
    } from 'mint-ui';

// Vue.use(VueResource)
export default {
  name: 'list',
  data () {
    return {
      selects: [],
      apiURL: 'https://cnodejs.org/api/v1',
      page: 1,
      tab: '',
      getData: []
    }
  },
  methods: {
    // get数据
    getDataEvent: function () {
      let url = this.apiURL + '/topics'
      //vue-resourceHTTP请求/响应
      // // 打开loading
      // Indicator.open();
      // this.$http.get(
      //   url,
      //   {params:{
      //     page: this.page,// 页数
      //     tab: this.tab// 分类
      //   }}
      // ).then(function (response) {
      //   if (response.data.success) {
      //     this.getData = response.data.data
      //     //console.log(this.getData)
      //     document.body.scrollTop = 0
      //   }
      // // 关闭loading
      // Indicator.close();
      // }, function (response) {
      //   console.log(response)
      // })


      //vue-resource创建资源 
      // 打开loading
      // Indicator.open();
      // var resource = this.$resource(url + '{/id}');
      // resource.get({
      //   page: this.page,// 页数
      //   tab: this.tab// 分类
      // })
      // .then(function (response) {
      //   if (response.data.success) {
      //     this.getData = response.data.data
      //     console.log(this.getData)
      //     document.body.scrollTop = 0
      //   }
      // // 关闭loading
      // Indicator.close();
      // }, function (response) {
      //   console.log(response)
      // })



      //(Promise)加载common的方法
      // //打开loading
      // Indicator.open();
      // common.ajaxGet(url,
      //   {
      //     page: this.page,// 页数
      //     tab: this.tab// 分类
      // }).then(data => {
      //       console.log(data)
      //       if (data.success) {
      //           // 填充数据
      //           this.getData = data.data;
      //           console.log(this.getData)
      //           // 移动到顶层
      //           document.body.scrollTop = 0
      //       }
      //       // 关闭loading
      //       Indicator.close();
      // })


      //jq
      //打开loading
      Indicator.open();
      $.ajax({
        url: url,
        data: {
          page: this.page,
          tab: this.tab
        },
        type: 'get',
        success: (data,status) => {
          if (data.success) {
            // 填充数据
            this.getData = data.data;
            console.log(this.getData)
            // 移动到顶层
            document.body.scrollTop = 0
          }
          // 关闭loading
          Indicator.close();
        }
      })
    },
    prev: function () {
      this.page--
      let query = {
        page: this.page
      }
      if (this.tab) {
        query.tab = this.tab
      }
      this.$router.push({
        path: 'list',
        query: query
      })
    },
    next: function () {
      this.page++
      let query = {
        page: this.page
      }
      if (this.tab) {
        query.tab = this.tab
      }
      this.$router.push({
        path: 'list',
        query: query
      })
    },
    onTabSelect (value) {
        // 改变当前分类
        this.tab = value;
        this.page = 1;

        // 改变路由
        let query = {
            page: this.page
        }
        if (this.tab) {
            query.tab = this.tab;
        }
        this.$router.push({
            path: 'list',
            query: query
        })
    },
    goToCont (key) {
      this.$router.push({
        name: 'content',
        params: {id: key}
      })
    },
    navStyle () {
      var name = this.$router.currentRoute.name
      $('.nav li').each(function () {
        if ($(this).html() === name) {
          $(this).addClass('active')
          return false
        }
      })
    }
  },
  mounted () {
    // 初始化页数
    this.page = this.$route.query.page || 1
    // 初始化分类
    this.tab = this.$route.query.tab
    // 初始化分类
    this.selects = [
      {text: '全部', value: ''},
      {text: '精华', value: 'good'},
      {text: '分享', value: 'share'},
      {text: '招聘', value: 'job'},
      {text: '回答', value: 'ask'}
    ]
    // 请求数据
    this.getDataEvent()
    this.navStyle()
  },
  watch: {
    $route: function () {
      // 检测路由变化
      this.page = this.$route.query.page || 1
      this.tab = this.$route.query.tab
      // 更新数据
      this.getDataEvent()
    }
  },
  filters: {
    tab (value) {
      return common.getType(value)
    }
  }
}
</script>
