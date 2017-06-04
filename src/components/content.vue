<style>
</style>
<template>
	<div class="contentBody">
		<h2 @click="goback()">返回</h2>
		<div v-html="getContent"></div>
	</div>
</template>
<script>
import {
        Indicator
    } from 'mint-ui';
export default {
	data () {
		return {
			id:'',
			getData:[],
			getContent:'',
			apiURL: 'https://cnodejs.org/api/v1'
		}
	},
	created () {
		this.printD()
		this.getDataById()
	},
	methods: {
		printD () {
		  this.id = this.$route.params.id
		},
		getDataById () {
			// 打开loading
	      Indicator.open();
	      let url = this.apiURL + '/topics'
	      this.$http.get(url)
	      .then(function (response) {
	        //if (response.data.success) {
	          this.getData = response.data.data
	          for(var i = 0;i < this.getData.length;i++){
	          	if(this.getData[i].id === this.id){
	          		this.getContent = this.getData[i].content
	          	}
	          }
	        //}
	        // 关闭loading
	        Indicator.close();
	      }, function (response) {
	        console.log('请求数据失败!')
	      })
		},
		goback () {
			this.$router.back()
		}
	},
	mounted () {
		
	}
}
</script>