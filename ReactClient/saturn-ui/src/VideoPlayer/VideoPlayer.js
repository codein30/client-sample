import React, { useState, useRef, useEffect } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import Card from 'saturn-app-ui/Card'
import Box from 'saturn-app-ui/Box'
import Grid from 'saturn-app-ui/Grid'
// import Marker from './Marker'
import IconButton from 'saturn-app-ui/IconButton'
import Typography from 'saturn-app-ui/Typography'
import clsx from 'saturn-app-common/clsx'
// TODO: Move to saturn-app-UI
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import CardActions from '@material-ui/core/CardActions'
import LoopIcon from '@material-ui/icons/Loop'
import SettingsIcon from '@material-ui/icons/Settings'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
// import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
const useStyles = makeStyles(styleClasses)

const VideoPlayer = (props) => {
  const {
    reactProps,
    chat
  } = props
  const [playing, setPlaying] = useState(true)
  const [currentTime] = useState(0)
  const [duration] = useState(0)
  const [muted, setMuted] = useState(true)
  const vidRef = useRef(null)

  useEffect(() => {
    console.log('vidRef ', vidRef)
  }, [])

  const classes = useStyles()
  const handlePlayPause = () => {
    setPlaying(!playing)
  }
  const handleSettings = () => {

  }
  const handleFullScreen = () => {

  }
  const handleVolume = () => {
    setMuted(!muted)
  }

  return (
    <Card className={clsx(classes.card)}>
      <video
        className={classes.videoPlayer}
        autoPlay
        muted
        width="100%"
        height="100%"
        {...reactProps}
      >
      </video>
      {chat}
      <Box>
        {/* <Marker markers={productMarkers} progress={progress} played={played}/> */}
        <CardActions className={clsx(classes.footerControllersWrapper)}>
          <Grid container className={clsx(classes.footerControllers)}>
            <Grid item>
              <IconButton aria-label="Play/Pause" onClick={handlePlayPause}>
                {playing ? (<PauseIcon />) : (<PlayArrowIcon />)}
              </IconButton>
              <IconButton><LoopIcon /></IconButton>
              <Typography variant="span">{Math.floor(currentTime)}/{Math.floor(duration)}</Typography>
            </Grid>
            <Grid item>
              <IconButton aria-label="settings" onClick={handleSettings}>
                <SettingsIcon />
              </IconButton>
              <IconButton aria-label="fullscreen" onClick={handleFullScreen}>
                <FullscreenIcon />
              </IconButton>
              <IconButton aria-label="volume" onClick={handleVolume}>
                {muted ? (<VolumeOffIcon />) : (<VolumeUpIcon />)}
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Box>
    </Card>
  )
}

export default VideoPlayer
