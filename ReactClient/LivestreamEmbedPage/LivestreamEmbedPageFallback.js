import React, { memo } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import LivestreamPage from '../LivestreamPage'
import useMemo from 'saturn-app-hooks/useMemo'
import Skeleton from 'saturn-app-ui/Skeleton'
import PropTypes from 'prop-types'
const useStyles = makeStyles(styleClasses)

const LivestreamEmbedPageFallback = (props) => {
  const {
    pageMode
  } = props

  const classes = useStyles()

  const renderedVideo = useMemo(() => (
    <Skeleton variant="rect" className={classes.videoBox} />
  ), [classes])

  if (pageMode === 'componentOnly') return renderedVideo

  return (
    <LivestreamPage renderedVideo={renderedVideo} isLoading />
  )
}

LivestreamEmbedPageFallback.propTypes = {
  pageMode: PropTypes.string
}

export default memo(LivestreamEmbedPageFallback)
