import Actual from './LivestreamPageActual'
import Fallback from './LivestreamPageFallback'
import generateActualVsFallbackComponent from 'saturn-app-common/generateActualVsFallbackComponent'

export default generateActualVsFallbackComponent(Actual, Fallback)
