const styles = ({ spacing, shape, shadows, palette, breakpoints, typography }) => {
  return {
    container: ({ isShowingComments, commentOverlay, streamType }) => {
      let gridTemplateRows
      let gridTemplateRowsMobile
      if (isShowingComments && !commentOverlay) {
        gridTemplateRowsMobile = 'auto auto 1fr'
        gridTemplateRows = 'auto auto 1fr'
      } else {
        if (streamType === 'jitsi') {
          gridTemplateRowsMobile = '1fr'
          gridTemplateRows = '1fr'
        } else {
          gridTemplateRowsMobile = 'auto 1fr'
          gridTemplateRows = 'auto 1fr'
        }
      }
      return ({
        display: 'grid',
        gridTemplateRows,
        // gridTemplateRows: isShowingComments && !commentOverlay ? 'auto auto 1fr' : 'auto 1fr',
        width: '100%',
        height: '100%',
        maxWidth: streamType !== 'jitsi' && 1000,
        marginLeft: streamType !== 'jitsi' && '25%',
        marginBottom: streamType !== 'jitsi' && '5%',
        [breakpoints.down('sm')]: {
          // gridTemplateRows: isShowingComments && !commentOverlay ? 'auto auto 1fr' : 'auto 1fr',
          gridTemplateRows: gridTemplateRowsMobile,
          paddingBottom: '0 !important',
          marginBottom: '0 !important',
          height: 'calc(100vh - 58px)',
          marginLeft: 0
        },
        [breakpoints.up('sm')]: {
          height: 'calc(100vh - 68px) !important'
        }
      })
    },
    showCommentsButton: ({ commentOverlay }) => ({
      position: 'absolute',
      top: 6,
      right: 6
    }),
    iconButton: ({ mouseOver }) => ({
      backgroundColor: palette.background.paper,
      opacity: mouseOver ? 1 : 0,
      transition: '0.3s linear all',
      '&:hover': {
        opacity: '1 !important',
        backgroundColor: palette.background.paper
      }
    }),
    newMessageDot: {
      position: 'absolute',
      top: '25%',
      right: '21%',
      width: 8,
      height: 8,
      borderRadius: 8,
      backgroundColor: 'tomato'
    }

  }
}

export default styles
