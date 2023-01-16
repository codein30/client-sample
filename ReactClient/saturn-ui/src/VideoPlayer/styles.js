const styles = ({ palette }) => {
  return {
    card: {
      position: 'relative',
      maxWidth: 650,
      margin: '100px auto 0',
      transition: '0.3s',
      boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
      '&:hover': {
        boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
      }
    },
    videoPlayer: {
      background: 'rgba(0, 0, 0, .1)'
    },
    footerControllersWrapper: {
      backgroundColor: '#EEF4F3'
    },
    footerControllers: {
      spacing: '24',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    titleBox: {
      backgroundColor: palette.primary.main
    },
    icon: {
      color: 'white'
    },
    title: {
      textTransform: 'uppercase',
      color: 'white'
    },
    editBtn: {
      color: 'white'
    }
  }
}

export default styles
