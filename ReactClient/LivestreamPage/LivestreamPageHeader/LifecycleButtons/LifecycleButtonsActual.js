import React, { memo, Fragment } from 'react'
import emitQueryDataUpdate from 'saturn-app-common/emitQueryDataUpdate'
import makeStyles from 'saturn-app-common/makeStyles'
import useCallback from 'saturn-app-hooks/useCallback'
import useActions from 'saturn-app-hooks/useActions'
import useNavigate from 'saturn-app-hooks/useNavigate'
import useConfig from 'saturn-app-hooks/useConfig'
import PlayIconButton from 'saturn-app-scenes-pe/components/SturrAppClient/icons/PlayIconButton'
import StopIconButton from 'saturn-app-scenes-pe/components/SturrAppClient/icons/StopIconButton'
import PauseIconButton from 'saturn-app-scenes-pe/components/SturrAppClient/icons/PauseIconButton'
import ChatIconButton from 'saturn-app-scenes-pe/components/SturrAppClient/icons/ChatIconButton'
import Box from 'saturn-app-ui/Box'
import styleClasses from './styles'

import PropTypes from 'prop-types'

const useStyles = makeStyles(styleClasses)

const LifecycleButtonsActual = (props) => {
  const {
    eventId,
    streamType,
    isPaused,
    setEventStreamingState,
    onResumeEventStream,
    isHost,
    toggleVisibleChat,
    showNotification
  } = props

  const { commentOverlay } = useConfig()
  console.log('##', props)

  const navigate = useNavigate()
  const classes = useStyles()
  const isJitsi = streamType === 'jitsi'
  const {
    endEventStream,
    pauseEventStream
  } = useActions()

  const onEndEventStream = useCallback(async () => {
    emitQueryDataUpdate('EVENT_STREAM_ENDED', { id: eventId })
    setEventStreamingState(prev => ({
      ...prev,
      showLiveStream: false,
      isStreamLive: false,
      isStreamEnded: true
    }))
    endEventStream({ id: eventId })
    navigate('event', { eventId })
    return null
  }, [endEventStream, eventId, navigate, setEventStreamingState])

  const onPauseEventStream = useCallback(async () => {
    console.log('##', 'pausing')
    await pauseEventStream({ id: eventId })
    setEventStreamingState(prev => ({
      ...prev,
      showLiveStream: false,
      isStreamEnded: false,
      isStreamLive: true,
      isStreamLiveAndUnpaused: false,
      isStreamPaused: true
    }))
  }, [eventId, pauseEventStream, setEventStreamingState])

  return (
    <Box className={classes.container}>
      {commentOverlay && (
        <Box className={classes.chatButtonContainer}>
          <ChatIconButton onClick={toggleVisibleChat} />
          {showNotification && <Box className={classes.newMessageDot} />}
        </Box>
      )}
      {isHost && (
        <Fragment>
          {isPaused && <PlayIconButton onClick={onResumeEventStream} />}
          {!isPaused && !isJitsi && <PauseIconButton onClick={onPauseEventStream} />}
          <StopIconButton onClick={onEndEventStream} />
        </Fragment>
      )}
    </Box>
  )
}

LifecycleButtonsActual.propTypes = {
  eventId: PropTypes.any.isRequired,
  streamType: PropTypes.string.isRequired,
  isPaused: PropTypes.bool.isRequired,
  setEventStreamingState: PropTypes.func.isRequired,
  onResumeEventStream: PropTypes.func.isRequired,
  isHost: PropTypes.bool.isRequired,
  toggleVisibleChat: PropTypes.func.isRequired,
  showNotification: PropTypes.bool.isRequired
}

export default memo(LifecycleButtonsActual)
