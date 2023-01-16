import Actual from './VideoContentActual'
import Fallback from './VideoContentFallback'
import generateActualVsFallbackComponent from 'saturn-app-common/generateActualVsFallbackComponent'

export default generateActualVsFallbackComponent(Actual, Fallback)
