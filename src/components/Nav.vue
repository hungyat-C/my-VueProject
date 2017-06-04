<template>
  <nav>
    <ul class="nav">
      <li v-for="nav in navs" @click="navClick(nav.val,$event)">{{ nav.text }}</li>
    </ul>
  </nav>
</template>

<script>

export default {
  name: 'nav',
  data () {
    return {
      navs: [
        {text: 'Home', val: 'Home'},
        {text: 'list', val: 'list'}
      ]
    }
  },
  methods: {
    navClick (val, event) {
      var el = event.target
      $('.nav li').removeClass('active')
      el.className = 'active'
      this.$router.push({
        name: val
      })
    },
    navStyle () {
      var name = this.$router.currentRoute.name
      console.log(name)
      $('.nav li').each(function () {
        console.log($(this).html())
        if ($(this).html() === name) {
          $(this).addClass('active')
        }
      })
    }
  },
  mounted () {
    this.navStyle()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/index.css";
</style>
