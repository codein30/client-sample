import Actual from './CommentSectionActual'
import Fallback from './CommentSectionFallback'
import generateActualVsFallbackComponent from 'saturn-app-common/generateActualVsFallbackComponent'

export default generateActualVsFallbackComponent(Actual, Fallback)
