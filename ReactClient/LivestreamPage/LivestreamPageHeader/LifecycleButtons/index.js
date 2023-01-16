import Actual from './LifecycleButtonsActual'
import Fallback from './LifecycleButtonsFallback'
import generateActualVsFallbackComponent from 'saturn-app-common/generateActualVsFallbackComponent'

export default generateActualVsFallbackComponent(Actual, Fallback)
