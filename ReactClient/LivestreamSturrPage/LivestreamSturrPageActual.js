import React, { useState, useEffect, memo } from 'react'
import LivestreamPage from '../LivestreamPage'
import useAuthable from 'saturn-app-hooks/useAuthable'
import useNavigate from 'saturn-app-hooks/useNavigate'
import useCallback from 'saturn-app-hooks/useCallback'
import useMemo from 'saturn-app-hooks/useMemo'
import useConfig from 'saturn-app-hooks/useConfig'
import StreamPublisher from 'saturn-app-ui/StreamPublisher'
import StreamSubscriber from 'saturn-app-ui/StreamSubscriber'
import useActions from 'saturn-app-hooks/useActions'
import PropTypes from 'prop-types'

const LivestreamSturrAppPageActual = (props) => {
  const {
    pageMode,
    isPublisher,
    eventData
  } = props

  const {
    eventId,
    isStreamLive,
    isStreamEnded,
    isStreamPaused,
    isStreamLiveAndUnpaused,
    isStreamAvailable,
    isBlocked: _isBlocked
  } = eventData
  const {
    provisionStream,
    deprovisionStream,
    startEventStream,
    pauseEventStream
  } = useActions()
  const config = useConfig()
  const {
    rtcConfig: _initialRtcConfig,
    rtmpConfig: _initialRtmpConfig,
    hlsConfig: _initialHlsConfig,
    streamBasebUrl
  } = config
  const [stream, setStream] = useState(false)
  const [rtcConfig, setRtcConfig] = useState(_initialRtcConfig)
  const [rtmpConfig, setRtmpConfig] = useState(_initialRtmpConfig)
  const [hlsConfig, setHlsConfig] = useState(_initialHlsConfig)
  const [streamSubUrl, setStreamSubUrl] = useState(null)
  const [streamPubUrl, setStreamPubUrl] = useState(null)
  const [streamName] = useState(`${eventId}_1`)
  const [isBlocked, setIsBlocked] = useState(_isBlocked)
  const [accessToken, setAccessToken] = useState(null)
  const [isCounting, setIsCounting] = useState(false)
  const navigate = useNavigate()
  const authable = useAuthable()

  authable.getAccessToken().then(accessToken => setAccessToken(accessToken))

  useEffect(() => {
    if (accessToken) updateStreamConfig()
  }, [accessToken])

  const handleShareOption = useCallback(subReady => {
    localStorage.setItem('readytoSub', true)
  }, [])

  const HandleRenderIframe = useCallback(flag => {
  }, [])

  const updateStreamConfig = useCallback(() => {
    const subscriptionId = 'subscriber-' + Math.floor(Math.random() * 0x10000).toString(16)
    console.log('accessToken## ', accessToken)
    const rtc = {
      ...rtcConfig,
      ...{
        connectionParams: {
          ...rtcConfig.connectionParams,
          password: `${rtcConfig.connectionParams.password}|${encodeURIComponent(accessToken)}`,
          token: accessToken
        },
        streamName: streamName,
        stream1: streamName,
        stream2: `${streamName}2`,
        subscriptionId
      }
    }
    const rtmp = {
      ...rtmpConfig,
      ...{
        streamName: streamName,
        stream1: streamName,
        stream2: `${streamName}2`,
        subscriptionId
      }
    }
    const hls = {
      ...hlsConfig,
      ...{
        streamName: streamName,
        stream1: streamName,
        stream2: `${streamName}2`,
        subscriptionId
      }
    }
    const pubUrl = `${streamBasebUrl}/api/4.0/event/live/${eventId}?action=broadcast&transcode=true`
    const subUrl = `${streamBasebUrl}/api/4.0/event/live/${streamName}?action=subscribe`

    setStreamPubUrl(pubUrl)
    setStreamSubUrl(subUrl)
    setRtcConfig(rtc)
    setRtmpConfig(rtmp)
    setHlsConfig(hls)
    setStream(true)
  }, [rtcConfig, accessToken, streamName, streamBasebUrl, setStreamPubUrl, setStreamSubUrl, setRtcConfig, setRtmpConfig, setStream, setHlsConfig, hlsConfig, rtmpConfig])

  const onSubscriberStop = () => {
    navigate('event', { eventId })
  }

  const handleCountingDown = (counting) => {
    setIsCounting(counting)
  }
  const renderedVideo = useMemo(() => {
    if (!stream) return null

    if (isPublisher) {
      return (
        <StreamPublisher
          streamName={streamName}
          setShareOption={handleShareOption}
          rtcConfig={rtcConfig}
          rtmpConfig={rtmpConfig}
          streamPubUrl={streamPubUrl}
          startEventStream={startEventStream}
          pauseEventStream={pauseEventStream}
          provisionStream={provisionStream}
          eventId={eventId}
          deprovisionStream={deprovisionStream}
          isStreamLive={isStreamLive}
          isStreamEnded={isStreamEnded}
          isStreamPaused={isStreamPaused}
          isStreamLiveAndUnpaused={isStreamLiveAndUnpaused}
          isStreamAvailable={isStreamAvailable}
          isCounting={isCounting}
        />
      )
    }
    return (
      <StreamSubscriber
        streamName={streamName}
        setRenderIframe={HandleRenderIframe}
        rtcConfig={rtcConfig}
        rtmpConfig={rtmpConfig}
        hlsConfig={hlsConfig}
        streamSubUrl={streamSubUrl}
        accessToken={accessToken}
        isStreamLive={isStreamLive}
        isStreamEnded={isStreamEnded}
        isStreamPaused={isStreamPaused}
        isStreamLiveAndUnpaused={isStreamLiveAndUnpaused}
        isStreamAvailable={isStreamAvailable}
        subscriberStop={onSubscriberStop}
        eventId={eventId}
      />
    )
  }, [stream, isPublisher, streamName, handleShareOption, rtcConfig, rtmpConfig, streamPubUrl, HandleRenderIframe, hlsConfig, streamSubUrl, accessToken, pauseEventStream, startEventStream, isCounting])

  if (isBlocked) {
    navigate('index')
    return null
  }

  if (pageMode === 'componentOnly') return renderedVideo

  return (
    <LivestreamPage
      renderedVideo={renderedVideo}
      onCountingDown={handleCountingDown}
      isCounting={isCounting}
      setIsBlocked={setIsBlocked}
      eventData={eventData}
    />
  )
}

LivestreamSturrAppPageActual.propTypes = {
  eventData: PropTypes.shape({
    eventId: PropTypes.any,
    isBlocked: PropTypes.bool
  }).isRequired,
  pageMode: PropTypes.string,
  isPublisher: PropTypes.bool.isRequired
}

export default memo(LivestreamSturrAppPageActual)
