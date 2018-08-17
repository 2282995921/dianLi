import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import index from '@/components/index'
import news from '@/components/news'
import contact from '@/components/contact'
import contact_artificial from '@/components/contact_artificial'
import search from '@/components/search'
import register from '@/components/register'
import search_list from '@/components/search_list'
import dianList from '@/components/dianList'
import details_news from '@/components/details'
import address_manage from '@/components/address_manage'
import address_search from '@/components/address_search'
import knowledgeDetail from '@/components/knowledgeDetail.vue'
import Vuex from 'vuex'
import store from '../store/store.js'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title: '系统消息'
      }
    },
    {
      path: '/news',
      name: 'news',
      component: news,
      meta: {
        title: '用电知识'
      },
      // children: [{
      //   path: 'search',
      //   component: search
      // }]
    },
    {
      path: '/details',
      name: 'details',
      component: details_news,
      meta: {
        title: '新闻公告'
      }
    },
    {
      path: '/dianList',
      name: 'dianList',
      component: dianList,
      meta: {
        title: '用电知识'
      }
    },
    {
      path: '/search_list',
      name: 'search_list',
      component: search_list,
      meta: {
        title: '用电知识'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta: {
        title: '用电知识'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact,
      meta: {
        title: '我的客服'
      },
    },
    {
      path: '/contact_artificial',
      name: 'contact_artificial',
      component: contact_artificial,
      meta: {
        title: '我的客服'
      }
    },
    {
      path: '/address_manage',
      name: 'address_manage',
      component: address_manage,
      meta: {
        title: '地址管理'
      },
    },
    {
      path: '/address_search',
      name: 'address_search',
      component: address_search,
      meta: {
        title: '地址管理'
      }
    },
    {
      path: '/knowledgeDetail',
      name: 'knowledgeDetail',
      component: knowledgeDetail,
      meta: {
        title: '用电知识'
      }
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})
