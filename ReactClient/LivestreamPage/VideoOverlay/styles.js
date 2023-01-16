const styles = ({ breakpoints }) => {
  return {
    container: {
      width: '100%',
      backgroundColor: '#000',
      position: 'relative',
      paddingBottom: '56.25%',
      height: 0,
      [breakpoints.down('sm')]: {
        height: '100%',
        paddingBottom: '0%'
      }
    },
    contents: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff'
    },
    button: {
      borderRadius: 50,
      minWidth: 150,
      background: 'linear-gradient(135deg, #67BFDC, #3551A1 12%, #EC453D, #F2BE48)',
      margin: '32px auto',
      color: 'white'
    },
    buttonLabel: {
      fontWeight: 500,
      textTransform: 'capitalize',
      fontSize: '1.1rem'
    }
  }
}

export default styles
