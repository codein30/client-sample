import lazyPreload from 'saturn-app-common/lazyPreload'

const layouts = [
  {
    id: 'RootLayout',
    component: lazyPreload(() => import('./layouts/RootLayout'))
  },
  {
    id: 'LoginLayout',
    component: lazyPreload(() => import('./layouts/LoginLayout'))
  },
]

export default layouts
