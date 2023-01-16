import React, { memo } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import LivestreamViewers from './LivestreamViewers'
import LifecycleButtons from './LifecycleButtons'
import useModal from 'saturn-app-hooks/useModal'
import useConfig from 'saturn-app-hooks/useConfig'
import ShareModal from 'saturn-app-scenes-pe/components/SturrAppClient/modals/ShareModal'
import ShareIconButton from 'saturn-app-scenes-pe/components/SturrAppClient/icons/ShareIconButton'
import BackIconButton from 'saturn-app-scenes-pe/components/SturrAppClient/icons/BackIconButton'
import ShopIconButton from 'saturn-app-scenes-pe/components/SturrAppClient/icons/ShopIconButton'
import LiveIndicatorPill from 'saturn-app-scenes-pe/components/SturrAppClient/ui/LiveIndicatorPill'
import Box from 'saturn-app-ui/Box'
import PropTypes from 'prop-types'

const useStyles = makeStyles(styleClasses)

const LivestreamPageHeaderActual = (props) => {
  const {
    numViewers,
    isPaused,
    eventData,
    onResumeEventStream,
    setEventStreamingState,
    toggleVisibleChat,
    showNotification
  } = props

  const {
    eventId,
    shareUrl,
    shopUrl,
    isHost,
    streamType
  } = eventData

  const { collaborationProvider } = useConfig()

  const isAgora = streamType.toLowerCase() === 'jitsi' && collaborationProvider === 'agora'

  const classes = useStyles()

  const [showShareModal, hideShareModal] = useModal(
    ({ in: open, onExited }) => (
      <ShareModal
        open={open}
        onExited={onExited}
        onClose={hideShareModal}
        eventId={eventId}
        shareUrl={shareUrl}
      />
    ), [eventId, shareUrl]
  )

  return (
    <Box className={classes.header}>
      <Box className={classes.headerLeft}>
        <Box>
          <BackIconButton />
          {!!shopUrl && <ShopIconButton shopUrl={shopUrl} />}
          {!isAgora && <ShareIconButton size="small" onClick={showShareModal} />}
        </Box>
        <LiveIndicatorPill />
      </Box>
      <Box className={classes.headerRight}>
        <LivestreamViewers
          eventId={eventId}
          numViewers={numViewers}
          disabled={!isHost}
        />
        {!isAgora && <LifecycleButtons
          isHost={isHost}
          eventId={eventId}
          streamType={streamType}
          isPaused={isPaused}
          setEventStreamingState={setEventStreamingState}
          onResumeEventStream={onResumeEventStream}
          toggleVisibleChat={toggleVisibleChat}
          showNotification={showNotification}
        />}
      </Box>
    </Box>
  )
}

LivestreamPageHeaderActual.propTypes = {
  numViewers: PropTypes.number.isRequired,
  isPaused: PropTypes.bool.isRequired,
  eventData: PropTypes.shape({
    eventId: PropTypes.any.isRequired,
    shareUrl: PropTypes.string.isRequired,
    shopUrl: PropTypes.string.isRequired,
    isHost: PropTypes.bool.isRequired,
    streamType: PropTypes.string.isRequired
  }).isRequired,
  onResumeEventStream: PropTypes.func.isRequired,
  setEventStreamingState: PropTypes.func.isRequired,
  toggleVisibleChat: PropTypes.func.isRequired,
  showNotification: PropTypes.bool.isRequired
}

export default memo(LivestreamPageHeaderActual)
