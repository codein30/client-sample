import Actual from './VideoOverlayActual'
import Fallback from './VideoOverlayFallback'
import generateActualVsFallbackComponent from 'saturn-app-common/generateActualVsFallbackComponent'

export default generateActualVsFallbackComponent(Actual, Fallback)
