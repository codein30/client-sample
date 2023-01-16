const styles = ({ spacing, breakpoints }) => {
  return {
    header: ({ headingCentered }) => ({
      display: 'grid',
      gridTemplateColumns: headingCentered ? '79px 1fr 79px' : 'auto 1fr auto',
      margin: spacing(0, 1, 1),
      [breakpoints.up('sm')]: {
        gridTemplateColumns: headingCentered ? '1fr 1fr 1fr' : 'auto 1fr auto',
        margin: spacing(0, 1, 0.5)
      }
    }),
    heading: {
      fontWeight: 'bold'
    },
    rightSide: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    filters: {
      display: 'flex',
      gap: spacing(1),
      overflow: 'auto',
      margin: spacing(0, 2, 1),
      [breakpoints.up('sm')]: {
        margin: spacing(0, 1, 1)
      }
    },
    chip: {
      borderRadius: 50,
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none'
      }
    },
    chipLabel: {
      fontSize: '0.8rem'
    }
  }
}

export default styles
