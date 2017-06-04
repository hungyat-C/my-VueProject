<style>

</style>
<template>
  <div id="app">
    <Navs></Navs>
    <transition name="component-fade">
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Navs from './components/Nav'
export default {
  name: 'app',
  components: { Navs }
}
</script>


