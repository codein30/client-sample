import React, { memo } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import Icon from 'saturn-app-ui/Icon'
import Box from 'saturn-app-ui/Box'
import Typography from 'saturn-app-ui/Typography'
import UnstyledButton from 'saturn-app-ui/UnstyledButton'

const useStyles = makeStyles(styleClasses)

const LivestreamViewersFallback = (props) => {
  const classes = useStyles()

  return (
    <Box>
      <UnstyledButton
        disabled
        className={classes.numViewersBox}
      >
        <Icon>visibility</Icon>
        <Typography>{0}</Typography>
      </UnstyledButton>
    </Box>
  )
}

export default memo(LivestreamViewersFallback)
