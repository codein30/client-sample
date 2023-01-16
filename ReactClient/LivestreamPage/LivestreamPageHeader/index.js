import Actual from './LivestreamPageHeaderActual'
import Fallback from './LivestreamPageHeaderFallback'
import generateActualVsFallbackComponent from 'saturn-app-common/generateActualVsFallbackComponent'

export default generateActualVsFallbackComponent(Actual, Fallback)
