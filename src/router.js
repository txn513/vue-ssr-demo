import Vue from 'vue'
import Router from 'vue-router'
import Bar from './components/Bar.vue';
import Foo from './components/Bar.vue';

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Bar },
        { path: '/foo', component: () => import('./components/Foo.vue') }
      ]
  })
}