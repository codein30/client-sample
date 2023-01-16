import React, { memo, useMemo, useState, Fragment } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import useCallback from 'saturn-app-hooks/useCallback'
import useActions from 'saturn-app-hooks/useActions'
import useConfig from 'saturn-app-hooks/useConfig'
import useActionCable from 'saturn-app-hooks/useActionCable'
import CommentSection from './CommentSection'
import VideoOverlay from './VideoOverlay'
import LivestreamPageHeader from './LivestreamPageHeader'
import Box from 'saturn-app-ui/Box'
import IconButton from 'saturn-app-ui/IconButton'
import Icon from 'saturn-app-ui/Icon'
import VideoContent from './VideoContent'
import PropTypes from 'prop-types'

const useStyles = makeStyles(styleClasses)

const STATUS = ['BLOCK_USER', 'UNBLOCK_USER', 'UNBAN_USER', 'BAN_USER']

const LivestreamPageActual = (props) => {
  const {
    renderedVideo,
    onCountingDown,
    isCounting,
    setIsBlocked,
    eventData
  } = props

  const {
    eventId,
    isBanned: _isBanned,
    userId,
    isHost,
    isStreamEnded,
    isStreamLive,
    isStreamLiveAndUnpaused,
    isStreamPaused,
    viewerCount,
    compareStreamType: streamType,
    shopUrl
  } = eventData

  const [isBanned, setIsBanned] = useState(_isBanned)
  const [showOverlayComments, setShowOverlayComments] = useState(false)
  const [receivedNewMessage, setReceivedNewMessage] = useState(false)
  const showNotification = receivedNewMessage && !showOverlayComments
  const [mouseOver, setMouseOver] = useState(false)
  const {
    receiveEventMessage,
    receiveEventAttendeeStatus,
    normalizeEventAttendee,
    resumeEventStream,
    startEventStream
  } = useActions()

  const { collaborationProvider, commentOverlay } = useConfig()

  const isShowingComments = collaborationProvider === 'agora' || streamType !== 'jitsi'
  const isAgoraStream = collaborationProvider === 'agora' && streamType === 'jitsi'

  const classes = useStyles({ isShowingComments, commentOverlay, mouseOver, collaborationProvider, streamType })

  const [numViewers, setNumViewers] = useState(viewerCount)
  const [eventStreamingState, setEventStreamingState] = useState({
    showLiveStream: isStreamLive && isStreamLiveAndUnpaused,
    isStreamEnded,
    isStreamLive,
    isStreamLiveAndUnpaused,
    isStreamPaused
  })

  const openCommentsOverlay = useCallback(() => {
    setShowOverlayComments(true)
    setReceivedNewMessage(false)
  }, [setShowOverlayComments, setReceivedNewMessage])

  const closeCommentsOverlay = useCallback(() => {
    setShowOverlayComments(false)
    setReceivedNewMessage(false)
  }, [setShowOverlayComments, setReceivedNewMessage])

  const toggleVisibleChat = useCallback(() => {
    showOverlayComments ? closeCommentsOverlay() : openCommentsOverlay()
  }, [closeCommentsOverlay, openCommentsOverlay, showOverlayComments])

  // TODO: Check streamming to the right event not all of them
  const channelParams = { channel: 'Api::V1::RoomChannel', event_id: parseInt(eventId) }
  const channelHandlers = {
    received (data) {
      // console.log('##websocket', data)
      // console.log('##websocket', eventRoomMemberId)

      if (data.type === 'POST_TO_CHAT') {
        setReceivedNewMessage(true)
        receiveEventMessage({ ...data.message, eventId: parseInt(eventId) })
      }
      if (STATUS.includes(data.type)) {
        const eventAttendee = normalizeEventAttendee(data.event_room_member)
        // TODO: Move/Solidy these with STATUS in the query
        // console.log('##websocket', data.event_room_member.data.attributes.user_id)
        if (parseInt(userId) === eventAttendee.userId) {
          if (data.type.includes('BLOCK')) setIsBlocked(eventAttendee.isBlocked)
          if (data.type.includes('BAN')) setIsBanned(eventAttendee.isBanned)
        }
        receiveEventAttendeeStatus({ eventId: parseInt(eventId), type: data.type, eventAttendee })
      }
      if (data.type === 'ATTENDEE_COUNT') {
        const count = parseInt(data.count)
        setNumViewers((count <= 0) ? 0 : count)
      }
      // Stream status::
      if (data.type === 'START') {
        console.log('ITS LIVE')
        setEventStreamingState((prev) => ({
          ...prev,
          isStreamEnded: false,
          isStreamLive: true,
          showLiveStream: true,
          isStreamLiveAndUnpaused: true,
          isStreamPaused: false
          // isStreamAvailable: true,
        }))
      }
      if (data.type === 'PAUSE') {
        console.log('PAUSE')
        setEventStreamingState((prev) => ({
          ...prev,
          isStreamEnded: false,
          isStreamLive: true,
          isStreamLiveAndUnpaused: false,
          isStreamPaused: true
          // isStreamAvailable: false,
        }))
      }
      if (data.type === 'RESUME') {
        setEventStreamingState((prev) => ({
          ...prev,
          isStreamEnded: false,
          isStreamLive: true,
          isStreamLiveAndUnpaused: true,
          isStreamPaused: false,
          isStreamAvailable: true
        }))
      }
      if (data.type === 'END') {
        console.log('END')
        setEventStreamingState((prev) => ({
          ...prev,
          isStreamEnded: true,
          isStreamLive: false,
          isStreamLiveAndUnpaused: false,
          isStreamPaused: false
          // isStreamAvailable: false,
        }))
      }
    }
  }

  useActionCable(channelParams, channelHandlers)

  const onStartEventStream = useCallback(async () => {
    await startEventStream({ id: eventId })
    setEventStreamingState(prev => ({
      ...prev,
      showLiveStream: true
    }))
  }, [setEventStreamingState, startEventStream, eventId])

  const onResumeEventStream = useCallback(async () => {
    await resumeEventStream({ id: eventId })
    setEventStreamingState(prev => ({
      ...prev,
      isStreamEnded: false,
      showLiveStream: true,
      isStreamLive: true,
      isStreamLiveAndUnpaused: true,
      isStreamPaused: false,
      isStreamAvailable: true
    }))
  }, [eventId, resumeEventStream, setEventStreamingState])

  const showLiveStream = useMemo(() => {
    if (isHost) return eventStreamingState.showLiveStream
    return eventStreamingState.isStreamLive && !eventStreamingState.isStreamPaused
  }, [eventStreamingState.isStreamLive, eventStreamingState.isStreamPaused, isHost, eventStreamingState.showLiveStream])
  const renderedVideoOverlay = useMemo(() => (
    <VideoOverlay
      isHost={isHost}
      isStreamEnded={eventStreamingState.isStreamEnded}
      isStreamLive={eventStreamingState.isStreamLive}
      isStreamPaused={eventStreamingState.isStreamPaused}
      onCountingDown={onCountingDown}
      onStartEventStream={onStartEventStream}
      onResumeEventStream={onResumeEventStream}
    />
  ), [isHost, eventStreamingState.isStreamEnded, eventStreamingState.isStreamLive, eventStreamingState.isStreamPaused, onStartEventStream, onResumeEventStream, onCountingDown])

  const renderedPageHeader = useMemo(() => (
    <LivestreamPageHeader
      numViewers={numViewers}
      eventData={eventData}
      isPaused={eventStreamingState.isStreamPaused}
      onResumeEventStream={onResumeEventStream}
      setEventStreamingState={setEventStreamingState}
      toggleVisibleChat={toggleVisibleChat}
      showNotification={showNotification}
    />
  ), [numViewers, eventData, eventStreamingState.isStreamPaused, showNotification, onResumeEventStream, toggleVisibleChat, setEventStreamingState])

  const renderedCommentSection = useMemo(() => (
    <CommentSection
      isOverlay
      isBanned={isBanned}
      streamType={streamType}
      eventId={eventId}
      close={closeCommentsOverlay}
      showOverlayComments={showOverlayComments}
    />
  ), [isBanned, eventId, streamType, closeCommentsOverlay, showOverlayComments])

  const renderVideoContent = useMemo(() => {
    if (isShowingComments) {
      if (commentOverlay) {
        return (
          <VideoContent streamType={streamType} openCommentsOverlay={openCommentsOverlay} setMouseOver={setMouseOver}>
            {renderedVideo({ toggleChat: toggleVisibleChat, shopUrl })}
            {renderedCommentSection}
            {!showOverlayComments && collaborationProvider !== 'agora' && (
              <Box className={classes.showCommentsButton}>
                <IconButton className={classes.iconButton} onClick={openCommentsOverlay}>
                  <Icon className={classes.icon} fontSize="medium">
                    chatbubble
                    {showNotification && <Box className={classes.newMessageDot} />}
                  </Icon>
                </IconButton>
              </Box>
            )}
          </VideoContent>
        )
      }
      return <Fragment>
        {renderedVideo}
        {renderedCommentSection}
      </Fragment>
    }
    return renderedVideo
  }, [isShowingComments, commentOverlay, renderedVideo, renderedCommentSection, showOverlayComments, openCommentsOverlay, showNotification, classes, collaborationProvider, shopUrl, streamType])

  const renderContent = useMemo(() => {
    return (!isCounting && isHost && showLiveStream) || (!isHost && showLiveStream)
  }, [isCounting, isHost, showLiveStream])
  return (
    <Box className={classes.container}>
      {!isAgoraStream && renderedPageHeader}
      {renderContent && renderVideoContent}
      {!showLiveStream && renderedVideoOverlay}
      {/* {isShowingComments && renderedCommentSection} */}
    </Box>
  )
}

LivestreamPageActual.propTypes = {
  renderedVideo: PropTypes.any,
  setIsBlocked: PropTypes.func.isRequired,
  eventData: PropTypes.shape({
    eventId: PropTypes.any,
    shareUrl: PropTypes.string,
    compareStreamType: PropTypes.string,
    isBanned: PropTypes.bool,
    userId: PropTypes.any,
    isHost: PropTypes.bool,
    shopUrl: PropTypes.string,
    isStreamEnded: PropTypes.bool,
    isStreamLive: PropTypes.bool,
    isStreamLiveAndUnpaused: PropTypes.bool,
    isStreamPaused: PropTypes.bool
  }).isRequired
}

export default memo(LivestreamPageActual)
