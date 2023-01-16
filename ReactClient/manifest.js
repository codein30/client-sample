import generateManifest from 'saturn-app-common/generateManifest'

import _payload from './payload'
import _adaptors from './adaptors'
import _queries from './queries'
import _routes from './routes'
import _layouts from './layouts'
import _getStoreDefinition from './getStoreDefinition'
import _actions from './actions'

const _id = 'SturrAppClient'

const gmPayload = {
  id: _id,
  payload: _payload,
  adaptors: _adaptors,
  queries: _queries,
  routes: _routes,
  layouts: _layouts,
  actions: _actions,
  getStoreDefinition: _getStoreDefinition
}

const manifest = generateManifest(gmPayload)

const {
  id,
  propTypes,
  queries,
  routes,
  layouts,
  getStoreDefinition,
  useNormalizeProps,
  usePlaygroundProps,
  useLivePlaygroundProps,
  actions
} = manifest

export {
  id,
  actions,
  propTypes,
  queries,
  routes,
  layouts,
  getStoreDefinition,
  useNormalizeProps,
  usePlaygroundProps,
  useLivePlaygroundProps,
  manifest
}

export default manifest
