import { action, persist } from 'saturn-app-common/store'

const getStoreDefinition = () => persist({
  credentials: {},
  setCredentials: action((state, data) => {
    state.credentials = data
  })
}, { allow: ['credentials'] })

export default getStoreDefinition
