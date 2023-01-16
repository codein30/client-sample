const styles = ({ spacing, shape, shadows, palette, breakpoints }) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: spacing(2),
      backgroundColor: palette.background.default,
      borderRadius: '10px',
      padding: spacing(2, 3, 3),
      color: palette.text.primary
    },
    welcome: {
      fontWeight: 'bold'
    },
    lightText: {
      fontWeight: 100,
      fontSize: '0.7rem'
    },
    textField: {
      backgroundColor: 'rgba(0, 0, 0, 0.07)',
      borderRadius: 6,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent'
      }
    },
    centeredBtnBox: {
      display: 'flex',
      gap: spacing(0.5),
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center'
    },
    forgotPasswordBtn: {
      textTransform: 'none'
    },
    submitButton: {
      margin: spacing(1, 0),
      borderRadius: 50,
      minWidth: 200,
      background: 'linear-gradient(135deg, #67BFDC, #3551A1 12%, #EC453D, #F2BE48)'
    },
    submitButtonLabel: {
      fontWeight: 600,
      textTransform: 'capitalize',
      fontSize: '1.4rem'
    },
    createAcctBtn: {
      textTransform: 'none',
      fontWeight: 'bold',
      padding: 0,
      '&:hover': {
        backgroundColor: palette.background.default
      }
    }
  }
}

export default styles
