import React, { memo } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import useModal from 'saturn-app-hooks/useModal'
import LivestreamViewersModal from 'saturn-app-scenes-pe/components/SturrAppClient/modals/LivestreamViewersModal'
import Icon from 'saturn-app-ui/Icon'
import Box from 'saturn-app-ui/Box'
import Typography from 'saturn-app-ui/Typography'
import UnstyledButton from 'saturn-app-ui/UnstyledButton'
import PropTypes from 'prop-types'

const useStyles = makeStyles(styleClasses)

const LivestreamViewersActual = (props) => {
  const {
    eventId,
    disabled,
    numViewers
  } = props

  const classes = useStyles()

  const [showLivestreamViewersModal, hideLivestreamViewersModal] = useModal(
    ({ in: open, onExited }) => (
      <LivestreamViewersModal
        open={open}
        onExited={onExited}
        onClose={hideLivestreamViewersModal}
        eventId={eventId}
      />
    ), [eventId]
  )

  return (
    <Box>
      <UnstyledButton
        disabled={disabled}
        onClick={showLivestreamViewersModal}
        className={classes.numViewersBox}
      >
        <Icon>visibility</Icon>
        <Typography>{numViewers}</Typography>
      </UnstyledButton>
    </Box>
  )
}

LivestreamViewersActual.propTypes = {
  eventId: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  numViewers: PropTypes.number.isRequired
}

export default memo(LivestreamViewersActual)
