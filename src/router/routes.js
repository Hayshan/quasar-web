import Layout from 'layouts'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('pages/redirect/index')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('pages/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('pages/error/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('pages/dashboard/index'),
        meta: { title: '主页', icon: 'dashboard' }
      }
    ]
  }
]

export const asyncRoutes = [
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  asyncRoutes.push({
    path: '*',
    component: () => import('pages/error/404.vue')
  })
}
