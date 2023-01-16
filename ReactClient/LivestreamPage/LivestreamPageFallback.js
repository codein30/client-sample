import React, { memo } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import CommentSection from './CommentSection'
import VideoOverlay from './VideoOverlay'
import LivestreamPageHeader from './LivestreamPageHeader'
import Box from 'saturn-app-ui/Box'
import useConfig from 'saturn-app-hooks/useConfig'

const useStyles = makeStyles(styleClasses)

const LivestreamPageFallback = (props) => {
  const classes = useStyles({ isShowingComments: true })
  const { commentOverlay } = useConfig()

  return (
    <Box className={classes.container}>
      <LivestreamPageHeader isLoading />
      <VideoOverlay isLoading />
      {!commentOverlay && <CommentSection isLoading />}
    </Box>
  )
}

export default memo(LivestreamPageFallback)
