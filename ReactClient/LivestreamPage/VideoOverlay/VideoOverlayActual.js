import React, { Fragment, useCallback } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import StartCountdown from 'saturn-app-ui/StartCountdown'
import useMemo from 'saturn-app-hooks/useMemo'
import Typography from 'saturn-app-ui/Typography'
import Box from 'saturn-app-ui/Box'
import Button from 'saturn-app-ui/Button'

const useStyles = makeStyles(styleClasses)

const VideoOverlayActual = (props) => {
  const {
    isHost,
    isStreamEnded,
    isStreamLive,
    isStreamPaused,
    onStartEventStream,
    onResumeEventStream,
    onCountingDown
  } = props

  const classes = useStyles()

  const handleOnFinishCountDown = useCallback(() => {
    onCountingDown && onCountingDown(false)
    onStartEventStream()
  }, [onCountingDown, onStartEventStream])

  const renderedGoLiveCountdown = useMemo(() => (
    <StartCountdown
      onFinishCountdown={handleOnFinishCountDown}
      onCountingDown={onCountingDown}
      buttonLabel={'Go Live'}
      buttonClasses={{
        root: classes.button,
        label: classes.buttonLabel
      }}
    />
  ), [classes, onCountingDown, handleOnFinishCountDown])

  const renderedResumeStream = useMemo(() => (
    <Fragment>
      <Typography>Stream is paused.</Typography>
      <Button
        onClick={onResumeEventStream}
        color="primary"
        classes={{
          root: classes.button,
          label: classes.buttonLabel
        }}
      >
        Resume
      </Button>
    </Fragment>
  ), [classes, onResumeEventStream])

  const hostContent = useMemo(() => {
    switch (true) {
      case !isStreamLive: return renderedGoLiveCountdown
      case isStreamEnded: return <Typography>Your stream has ended...</Typography>
      case isStreamPaused: return renderedResumeStream
      default: return <Typography>Stream not live. You are the host</Typography>
    }
  }, [isStreamEnded, isStreamLive, isStreamPaused, renderedResumeStream, renderedGoLiveCountdown])

  const subscriberContent = useMemo(() => {
    switch (true) {
      case !isStreamLive: return (
        <Fragment>
          <Typography>Stream is about to start...</Typography>
          <Typography>Waiting for the host</Typography>
        </Fragment>
      )
      case isStreamEnded: return (
        <Fragment>
          <Typography>'The stream has ended...</Typography>
          <Typography>Thanks for attending</Typography>
        </Fragment>
      )
      case isStreamPaused: return (
        <Typography>Stream is paused...</Typography>
      )
      default: return (
        <Fragment>
          <Typography>Stream not live.</Typography>
          <Typography>You are not the host</Typography>
        </Fragment>
      )
    }
  }, [isStreamEnded, isStreamLive, isStreamPaused])

  return (
    <Box className={classes.container}>
      <Box className={classes.contents}>
        {isHost ? hostContent : subscriberContent}
      </Box>
    </Box>
  )
}

export default VideoOverlayActual
