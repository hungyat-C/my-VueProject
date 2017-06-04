<style scoped>
</style>
<template>
	<!-- slidePic -->
    <div id="wrapper">
        <div class="swipe">
            <ul id="slider">
                <li v-for="pic in pics"><img :src="pic.srcUrl" alt="pic.alts"></li>
            </ul>
            <div id="pagenavi" class="pagenavi">
				<a v-for="(pic,index) in pics" href="javascript:void(0);" :class="{active:index === 0}">{{index}}</a>
            </div>
        </div>
    </div>
    <!-- slidePic -->
</template>

<script>
import banner from '../lib/banner'
	export default {
		name: 'sliderPic',
		data () {
			return {
				pics: [
					{srcUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496431462266&di=ef9d70153c45e1dd519635fa9fb2e789&imgtype=0&src=http%3A%2F%2Fpic.w2bc.com%2Fupload%2F201610%2F31%2F201610310930370380.png'},
					{srcUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496431462266&di=aa9ea800dac4e0e08d334d1a2e40d7ea&imgtype=0&src=http%3A%2F%2Fimages2015.cnblogs.com%2Fblog%2F84778%2F201604%2F84778-20160404173449406-678802395.png'}
				]
			}
		},
		methods: {
			startSlider () {
				banner()
			}
		},
		mounted () {
			this.startSlider()
		}
	}
</script>