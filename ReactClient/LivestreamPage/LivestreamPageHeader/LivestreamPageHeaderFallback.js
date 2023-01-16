import React, { memo } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import LivestreamViewers from './LivestreamViewers'
import ShareIconButton from 'saturn-app-scenes-pe/components/SturrAppClient/icons/ShareIconButton'
import BackIconButton from 'saturn-app-scenes-pe/components/SturrAppClient/icons/BackIconButton'
import LiveIndicatorPill from 'saturn-app-scenes-pe/components/SturrAppClient/ui/LiveIndicatorPill'
import Box from 'saturn-app-ui/Box'

const useStyles = makeStyles(styleClasses)

const LivestreamPageHeaderFallback = (props) => {
  const classes = useStyles()

  return (
    <Box className={classes.header}>
      <Box className={classes.headerLeft}>
        <Box>
          <BackIconButton />
          <ShareIconButton size="small" disabled />
        </Box>
        <LiveIndicatorPill />
      </Box>
      <Box className={classes.headerRight}>
        <LivestreamViewers isLoading />
      </Box>
    </Box>
  )
}

export default memo(LivestreamPageHeaderFallback)
