import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Home from '@/components/Home/Home'
import Rank from '@/components/Rank/Rank'
import Search from '@/components/Search/Search'
import Detail from '@/components/Detail/Detail'
import Singe from '@/components/Singe/Singe'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path:'/index',
      component:Index,
      children:[
        {
          path: '/home',
          component: Home
        },
        { /* 字号都没有改变 */
          path:'/rank',
          component:Rank
        },
        {
          path:'/search',
          component:Search
        },
      ]
    },
    {
      path:'/detail',
      component:Detail
    },
    {
      path:'/curSinge',
      component:Singe
    },
    {
      path:'*',
      redirect:'home'//重定向
    }
  ]
})
