const styles = ({ breakpoints }) => {
  return {
    overlayCommentsContainer: {
      position: 'relative',
      width: '100%',
      boxSizing: 'border-box',
      [breakpoints.down('sm')]: {
        height: 'auto !important'
      }
    },
    overlayCommentsContainerFallback: {
      position: 'relative',
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: 'black',
      [breakpoints.down('sm')]: {
        height: 'auto !important'
      }
    }
  }
}

export default styles
