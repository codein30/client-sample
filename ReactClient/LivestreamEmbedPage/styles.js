const styles = ({ spacing, shape, shadows, palette, breakpoints, typography }) => {
  return {
    liveStreamContainer: ({ streamType }) => ({

    }),
    startLinkRoot: {
      padding: 0,
      height: '100%',
      width: '100%'
    },
    startLinkLabel: {
      ...typography.h5,
      textTransform: 'capitalize'
    },
    videoBox: {
      width: '100%',
      position: 'relative',
      // TODO: clean this
      // paddingBottom: '56.25%',
      height: '100%',
      // height: 0,
      backgroundColor: '#000'
    },
    videoContainer: {
      width: '100%',
      height: '100%'
      // minHeight: '70vh'
    }
  }
}

export default styles
