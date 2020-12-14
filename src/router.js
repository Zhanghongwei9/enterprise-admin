import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	base: process.env.BASE_URL,
	mode: 'history',
	routes: [
		{
			path: '/login',
			name: '/login',
			component: () => import('./views/user/login')
		},
		{
			path: '/',
			component: () => import('./views/main'),
			children: [
				{
					path: '/base-info',
					name: '/base-info',
					component: () => import('./views/base/base-info')
				},
				// 栏目管理
				{
					path: '/column-list',
					name: '/column-list',
					component: () => import('./views/column/column-list')
				},
				{
					path: '/edit-column',
					name: '/edit-column',
					component: () => import('./views/column/edit-column')
				},
				// 产品管理
				{
					path: '/products-list',
					name: '/products-list',
					component: () => import('./views/products/products-list')
				},
				{
					path: '/add-product',
					name: '/add-product',
					component: () => import('./views/products/add-product')
				},
				// 文章管理
				{
					path: '/article-list',
					name: '/article-list',
					component: () => import('./views/article/article-list')
				},
				{
					path: '/add-article',
					name: '/add-article',
					component: () => import('./views/article/add-article')
				},
				// 活动配置
				{
					path: '/activity-list',
					name: '/activity-list',
					component: () => import('./views/activity/activity-list')
				},
				{
					path: '/add-activity',
					name: '/add-activity',
					component: () => import('./views/activity/add-activity')
				}
			]
		}
	]
})
