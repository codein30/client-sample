import React, { useRef } from 'react'
import Box from 'saturn-app-ui/Box'
import useResizeVideo from 'saturn-app-hooks/useResizeVideo'
import makeStyles from 'saturn-app-common/makeStyles'
import PropTypes from 'prop-types'
import styles from './styles'

const useStyles = makeStyles(styles)

const VideoContent = ({ children, streamType, setMouseOver }) => {
  const containerRef = useRef()
  const videoContainerHeight = useResizeVideo(containerRef)
  const classes = useStyles()

  return <Box id="video-content-kwivrr-stream" ref={containerRef} className={classes.overlayCommentsContainer} onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)} style={{ height: streamType.toLowerCase() !== 'jitsi' && videoContainerHeight }}>
    {children}
  </Box>
}

VideoContent.propTypes = {
  setMouseOver: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default VideoContent
