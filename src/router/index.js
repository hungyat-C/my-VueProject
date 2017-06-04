import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// import Home from '../components/Hello'
// import List from '../components/List'
const Home = resolve => {
    require.ensure(['../components/Hello.vue'], () => {
        resolve(require('../components/Hello.vue'));
    });
};
const List = resolve => {
    require.ensure(['../components/List.vue'], () => {
        resolve(require('../components/List.vue'));
    });
};
const content = resolve => {
    require.ensure(['../components/content.vue'], () => {
        resolve(require('../components/content.vue'));
    });
};

const scrollBehavior = (to, from, savedPosition) => {
  if(savedPosition) {
  	console.log(savedPosition);
        setTimeout(() => {
            window.scrollTo(savedPosition.x, savedPosition.y)
        }, 350)
    } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

export default new Router({
  mode: 'history',
  //mode: 'hash',
  routes: [
    {
      path: '/dist',
      name: 'Home',
      component: Home
    },
    {
      path: '/dist/list',
      name: 'list',
      component: List
    },
    {
      path: '/dist/list/content/:id',
      name: 'content',
      component: content
    }
  ],
  scrollBehavior,
})
