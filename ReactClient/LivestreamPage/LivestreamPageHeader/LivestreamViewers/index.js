import Actual from './LivestreamViewersActual'
import Fallback from './LivestreamViewersFallback'
import generateActualVsFallbackComponent from 'saturn-app-common/generateActualVsFallbackComponent'

export default generateActualVsFallbackComponent(Actual, Fallback)
