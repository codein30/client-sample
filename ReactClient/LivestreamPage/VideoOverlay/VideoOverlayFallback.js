import React from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import Box from 'saturn-app-ui/Box'

const useStyles = makeStyles(styleClasses)

const VideoOverlayFallback = (props) => {
  const classes = useStyles()

  return (
    <Box className={classes.container}></Box>
  )
}

export default VideoOverlayFallback
