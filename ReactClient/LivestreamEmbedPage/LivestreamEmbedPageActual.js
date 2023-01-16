import React, { useState, memo, useCallback } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import useNavigate from 'saturn-app-hooks/useNavigate'
import useTranslation from 'saturn-app-hooks/useTranslation'
import LivestreamPage from '../LivestreamPage'
import ReactPlayer from 'saturn-app-common/react-player'
import ZoomPlayer from 'saturn-app-ui/ZoomPlayer'
import Raw from 'saturn-app-ui/Raw'
import Box from 'saturn-app-ui/Box'
import Button from 'saturn-app-ui/Button'
import UnstyledLink from 'saturn-app-ui/UnstyledLink'
import PropTypes from 'prop-types'
import LiveStreamKwivrrPageActual from '../LivestreamSturrAppPage/LivestreamSturrAppPageActual.js'
import CollaborationStream from '../CollaborationStream/CollaborationStream'

const useStyles = makeStyles(styleClasses)

const LivestreamEmbedPageActual = (props) => {
  const {
    pageMode,
    eventData
  } = props

  const {
    viewerName,
    isHost,
    compareStreamType: streamType,
    startUrl,
    title,
    streamUrl,
    isBlocked: _isBlocked,
    zoomAuthorization,
    jitsiAuthorization,
    streamEmbed,
    isKwivrrStream,
    eventId
  } = eventData

  const classes = useStyles({ streamType })
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isBlocked, setIsBlocked] = useState(_isBlocked)

  const renderedVideo = useCallback(({ toggleChat, shopUrl }) => (
    <>
      {(streamType === 'resi') && <Raw>{streamEmbed}</Raw>}
      {(streamType === 'zoom') && isHost && (
        <UnstyledLink href={startUrl}>
          <Button
            color="primary"
            classes={{
              root: classes.startLinkRoot,
              label: classes.startLinkLabel
            }}
          >
            {t('SturrAppClient.start_zoom_meeting')}
          </Button>
        </UnstyledLink>
      )}
      {(streamType === 'zoom' && !isHost) && (
        <ZoomPlayer
          signature={zoomAuthorization.zoomSignature}
          meetingNumber={zoomAuthorization.zoomMeetingNumber}
          apiKey={zoomAuthorization.zoomApiKey}
          username={zoomAuthorization.zoomUserName}
          password={zoomAuthorization.zoomPassword}
          email={zoomAuthorization.zoomEmail}
          role={zoomAuthorization.zoomRole}
          leaveUrl={zoomAuthorization.zoomLeaveUrl}
        />
      )}
      {(streamType === 'youtube' || streamType === 'vimeo') && (
        <Box className={classes.videoContainer}>
          <ReactPlayer
            playing={true}
            title={title}
            url={streamUrl}
            loop={false}
            controls={true}
            playsinline={true}
            progressInterval={1000}
            height={'100%'}
            width={'100%'}
          />
        </Box>
      )}
      {(streamType === 'jitsi') && (
        <CollaborationStream
          toggleChat={toggleChat}
          shopUrl={shopUrl}
          eventId={eventId}
          isHost={isHost}
          domain={jitsiAuthorization.domain}
          roomName={jitsiAuthorization.roomName}
          jwt={jitsiAuthorization.jwt}
          displayName={viewerName}
          onMeetingEnd={() => console.log('Meeting has ended')}
          loadingComponent={<p>loading ...</p>}
          errorComponent={<p>Oops, something went wrong</p>}
          containerStyles={{ width: '100%', height: '100%' }}
          onJitsi={client => {
            client.addEventListener('videoConferenceJoined', () => {
              const listener = ({ enabled }) => {
                client.removeEventListener('tileViewChanged', listener)

                if (!enabled) {
                  client.executeCommand('toggleTileView')
                }
              }

              client.addEventListener('tileViewChanged', listener)
              client.executeCommand('toggleTileView')
            })
          }}
          onError={e => {
            console.log('##jitsiError', e)
          }}
          configOverwrite={{
            // disable the prejoin page
            prejoinPageEnabled: false,
            // optionally we can control the mute state on join from the emebedding application
            startWithAudioMuted: true,
            startWithVideoMuted: false,
            // If true, any checks to handoff to another application will be prevented
            // and instead the app will continue to display in the current browser.
            disableDeepLinking: true
          }}
        />
      )}
    </>
  ), [classes, viewerName, streamType, streamEmbed, isHost, startUrl, t, streamUrl, zoomAuthorization, title, jitsiAuthorization])

  if (isBlocked) {
    navigate('index')
    return null
  }

  if (isKwivrrStream) return <LiveStreamKwivrrPageActual eventData={eventData} pageMode={pageMode} isPublisher={isHost} />

  if (pageMode === 'componentOnly' && streamType === 'jitsi') return <div style={{ width: '100%', height: '100vh' }}>{renderedVideo}</div>
  if (pageMode === 'componentOnly') return renderedVideo

  return (
    <Box className={classes.liveStreamContainer}>
      <LivestreamPage
        renderedVideo={renderedVideo}
        setIsBlocked={setIsBlocked}
        eventData={eventData}
      />
    </Box>
  )
}

LivestreamEmbedPageActual.propTypes = {
  pageMode: PropTypes.string,
  eventData: PropTypes.shape({
    viewerName: PropTypes.string,
    isHost: PropTypes.bool,
    streamEmbed: PropTypes.any,
    startUrl: PropTypes.string,
    title: PropTypes.string,
    streamUrl: PropTypes.string,
    compareStreamType: PropTypes.string,
    isBlocked: PropTypes.bool,
    zoomAuthorization: PropTypes.any,
    jitsiAuthorization: PropTypes.any,
    isKwivrrStream: PropTypes.bool
  }).isRequired
}

export default memo(LivestreamEmbedPageActual)
