const styles = ({ palette }) => {
  return {
    container: ({ topBarOnly }) => ({
      boxSizing: 'border-box',
      color: palette.text.primary,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }),
    body: ({ view }) => ({
      margin: '0 auto',
      width: '100%',
      maxWidth: view !== 'livestream-embed' ? 1000 : 'auto'
    }),
    link: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold',
      '&:hover': {
        cursor: 'pointer'
      }
    }
  }
}

export default styles
