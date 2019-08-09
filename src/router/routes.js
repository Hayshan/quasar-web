
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: readModuleInfo()
  }
]

function readModuleInfo () {
  let files = require.context('pages', true, /\/app\.json$/)
  return createRoutes(files)
}

function createRoutes (files) {
  let configRoutes = []

  files.keys().forEach(file => {
    let keys = file
      .replace(/\/modules/g, '')
      .replace(/\/app\.json$/, '')
      .replace(/\/{2,}/g, '/')
      .split('/')
      .slice(1)

    let info = files(file)

    let route = {
      name: info.route.name || info.route.path,
      path: info.route.path,
      meta: Object.assign({ module: info.name }, info.route.meta),
      component: () => import(`@/pages/${file.replace(/^\.\//, '').replace(/\/app\.json$/, '')}/webapp/${info.route.component || 'Index'}.vue`)
    }

    let routes = configRoutes
    keys.forEach((key, i) => {
      let child = routes.find(parentRoute => parentRoute.meta && parentRoute.meta.module === key)
      if (child) {
        child.children = child.children || []
        routes = child.children
      }
    })
    routes.push(route)
  })
  return configRoutes
}

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/error/Error404.vue')
  })
}

export default routes
