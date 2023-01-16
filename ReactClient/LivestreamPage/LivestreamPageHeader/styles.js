const styles = ({ spacing, shape, shadows, palette, breakpoints, typography }) => {
  return {
    header: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: spacing(2.5),
      alignItems: 'center',
      padding: spacing(1)
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing(1)
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing(1)
    }
  }
}

export default styles
