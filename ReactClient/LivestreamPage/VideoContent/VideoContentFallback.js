import React from 'react'
import Box from 'saturn-app-ui/Box'
import makeStyles from 'saturn-app-common/makeStyles'
import styles from './styles'

const useStyles = makeStyles(styles)

const VideoContentFallback = () => {
  const classes = useStyles()
  return <Box className={classes.overlayCommentsContainerFallback} />
}

export default VideoContentFallback
