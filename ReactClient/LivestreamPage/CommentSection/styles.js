const styles = ({ spacing, shape, shadows, palette, breakpoints, typography, streamType }) => {
  return {
    commentSectionContainer: ({ collaborationProvider, streamType, open }) => {
      const isAgoraActive = collaborationProvider === 'agora' && streamType === 'jitsi'
      return {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: isAgoraActive ? 'calc(100% - 54px)' : '100%',
        marginBottom: isAgoraActive ? '54px' : 0,
        transition: '0.5s ease-in-out all',
        opacity: open ? 1 : 0,
        transformOrigin: '98% 4%',
        transform: `scale(${open ? 1 : 0})`,
        [breakpoints.down('sm')]: {
          height: isAgoraActive ? 'calc(100% - 54px)' : '100%',
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
          backdropFilter: 'blur(3px)',
          transformOrigin: '98% 4%'
        }
      }
    },
    blurred: ({ collaborationProvider, streamType, open }) => {
      const isAgoraActive = collaborationProvider === 'agora' && streamType === 'jitsi'
      return {
        // background: 'rgba(0, 0, 0, 0.02)',
        backdropFilter: 'blur(2px)',
        background: '-webkit-linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))',
        width: '100%',
        height: '51.2%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        transform: `scale(${open ? 1 : 0})`,
        opacity: open ? 1 : 0,
        transformOrigin: '98% -120%',
        transition: '0.5s ease-in-out all',
        [breakpoints.down('sm')]: {
          height: isAgoraActive ? 'calc(100% - 54px)' : '100%',
          background: 'rgba(0, 0, 0, 0)'
        }
      }
    },
    commentsContainer: ({ open }) => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      width: '100%',
      height: '100%',
      zIndex: 10000,
      position: 'relative',
      opacity: open ? 1 : 0,
      overflow: 'hidden',
      transform: `scale(${open ? 1 : 0})`,
      transformOrigin: '98% 4%',
      transition: '0.5s ease-in-out all',
      [breakpoints.down('sm')]: {
        height: '100%',
        transformOrigin: '100% 0%'
      }
    }),
    commentsBox: ({ commentOverlay }) => ({
      // margin: spacing(1, 6.5, 1, 1),
      width: '100%',
      height: '45%',
      [breakpoints.down('sm')]: {
        height: '100%'
      },
      // flex: 1,
      // minHeight: !commentOverlay && 250,
      [breakpoints.up('sm')]: {
        // margin: spacing(2, 5.5, 1, 0)
      }
    }),
    sendMessageBox: ({ commentOverlay }) => ({
      display: 'grid',
      gridTemplateColumns: '1fr 36px',
      gridGap: spacing(1),
      margin: spacing(0, 1, 1),
      padding: commentOverlay && '0px 12px',
      width: '100%',
      boxSizing: 'border-box',
      [breakpoints.up('sm')]: {
        margin: spacing(0, 0, 2)
      }
    }),
    sendMessageField: {
      fontSize: '0.8rem',
      fontWeight: 100,
      backgroundColor: palette.background.paper,
      borderRadius: 50,
      borderColor: 'transparent',
      '& fieldset': {
        borderColor: 'transparent'
      },
      '&.MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent'
      }
    },
    sendBtn: {
      backgroundColor: palette.primary.main,
      color: '#fff',
      padding: '6px',
      height: 36,
      width: 36,
      '&:hover': {
        backgroundColor: palette.primary.main
      },
      '&.MuiIconButton-root.Mui-disabled': {
        backgroundColor: palette.border.default,
        color: '#fff'
      }
    },
    closeButton: {
      position: 'absolute',
      top: 0,
      right: 0
    },
    icon: {
      color: 'white'
    }
  }
}

export default styles
