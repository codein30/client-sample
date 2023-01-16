const styles = ({ spacing, breakpoints, palette }) => {
  return {
    container: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr'
    },
    buttonRoot: {
      padding: 0,
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    buttonLabel: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing(0.5),
      padding: spacing(2, 0, 1.5),
      [breakpoints.up('sm')]: {
        padding: '12px 8px'
      }
    },
    icon: {
      color: '#fff'
    },
    line: {
      height: 2,
      width: 18,
      backgroundColor: palette.text.primary,
      [breakpoints.up('sm')]: {
        backgroundColor: '#fff'
      }
    },
    streamOptionsRoot: {
      width: '100%',
      maxWidth: '100%'
    },
    streamOptionsPaper: {
      width: '100%',
      maxWidth: '100%',
      left: 'unset !important',
      background: 'linear-gradient(135deg, #67BFDC, #3551A1 12%, #EC453D, #F2BE48)',
      color: 'white',
      [breakpoints.up('sm')]: {
        background: palette.background.default,
        color: palette.text.primary
      }
    },
    popoverContents: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: spacing(1.5, 1, 1, 1),
      gap: spacing(0.5)
    },
    streamOptions: {
      display: 'flex',
      gap: spacing(4),
      justifyContent: 'center'
    },
    streamOption: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: spacing(0.5)
    },
    streamOptionIconButton: {
      border: '1px solid white',
      padding: spacing(1),
      color: '#fff',
      [breakpoints.up('sm')]: {
        border: `1px solid ${palette.text.primary}`,
        padding: spacing(1),
        color: palette.text.primary
      }
    },
    streamOptionLabel: {
      fontSize: '10px'
    },
    closeBtnBox: {
      display: 'flex',
      justifyContent: 'center'
    },
    closeBtn: {
      color: '#fff',
      padding: 0,
      [breakpoints.up('sm')]: {
        color: palette.text.primary
      }
    }
  }
}

export default styles
