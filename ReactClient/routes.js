import lazyPreload from 'saturn-app-common/lazyPreload'
import layouts from './layouts'
import findById from 'saturn-app-common/findById'

const RootLayout = findById(layouts, 'RootLayout')
const LoginLayout = findById(layouts, 'LoginLayout')

const allParams = {
  id: undefined,
  viewTab: undefined,
  eventId: undefined,
  tab: undefined,
  userId: undefined,
  returnPath: undefined,
  ticketId: undefined,
  giftToken: undefined,
  email: undefined,
  resetPasswordToken: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  pageMode: undefined,
  createType: undefined,
  confirmationToken: undefined
}

const routes = [
  {
    layout: RootLayout,
    id: 'sso',
    type: 'view',
    component: lazyPreload(() => import('./SSORedirect')),
    prepare: (sentIn) => {
      const { hashParams } = sentIn
      return {
        accessToken: hashParams.accessToken,
        refreshToken: hashParams.refreshToken,
        returnPath: hashParams.returnPath
      }
    },
    navigateHelper: ({ accessToken, refreshToken, returnPath }) => ({
      ...allParams,
      accessToken,
      refreshToken,
      returnPath,
      modal: undefined
    })
  },
  {
    layout: RootLayout,
    id: 'index',
    type: 'view',
    component: lazyPreload(() => import('./HomePage')),
    navigateHelper: () => ({
      ...allParams,
      view: undefined
    })
  },
  {
    layout: AuthenticationLayout,
    id: 'create-livestream',
    type: 'view',
    component: lazyPreload(() => import('./CreateLivestreamPage')),
    prepare: (sentIn) => {
      const { hashParams } = sentIn
      return {
        eventId: hashParams.eventId,
        createType: hashParams.createType || 'digital'
      }
    },
    navigateHelper: ({ eventId, createType }) => ({
      ...allParams,
      eventId,
      createType
    })
  },
  {
    layout: RootLayout,
    id: 'about',
    type: 'view',
    component: lazyPreload(() => import('./AboutPage')),
    navigateHelper: () => ({
      ...allParams
    })
  },
  {
    layout: LoginLayout,
    id: 'login',
    type: 'view',
    component: lazyPreload(() => import('./LoginPage')),
    prepare: (sentIn) => {
      const { hashParams } = sentIn
      return {
        returnPath: hashParams.returnPath
      }
    },
    navigateHelper: ({ returnPath }) => ({
      ...allParams,
      returnPath,
      modal: undefined
    })
  },
  {
    layout: TopBarOnlyAuthenticationLayout,
    id: 'livestream-embed',
    type: 'view',
    component: lazyPreload(() => import('./LivestreamEmbedPage')),
    prepare: (sentIn) => {
      const { hashParams } = sentIn
      return {
        eventId: hashParams.eventId,
        pageMode: hashParams.pageMode
      }
    },
    navigateHelper: ({ eventId, pageMode }) => ({
      ...allParams,
      eventId,
      pageMode
    })
  },
  {
    layout: TopBarOnlyAuthenticationLayout,
    id: 'livestream-pub',
    type: 'view',
    component: lazyPreload(() => import('./LivestreamSturrAppPage')),
    prepare: (sentIn) => {
      const { hashParams } = sentIn
      return {
        isPublisher: true,
        eventId: hashParams.eventId,
        pageMode: hashParams.pageMode
      }
    },
    navigateHelper: ({ eventId, pageMode }) => ({
      ...allParams,
      eventId,
      pageMode
    })
  },
  {
    layout: TopBarOnlyAuthenticationLayout,
    id: 'livestream-sub',
    type: 'view',
    component: lazyPreload(() => import('./LivestreamSturrAppPage')),
    prepare: (sentIn) => {
      const { hashParams } = sentIn
      return {
        isPublisher: false,
        eventId: hashParams.eventId,
        pageMode: hashParams.pageMode
      }
    },
    navigateHelper: ({ eventId, pageMode }) => ({
      ...allParams,
      eventId,
      pageMode
    })
  },
]

export {
  routes,
  allParams
}

export default routes
