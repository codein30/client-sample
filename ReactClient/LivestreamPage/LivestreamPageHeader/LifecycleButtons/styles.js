const styles = ({ spacing }) => {
  return {
    container: {
      display: 'flex'
    },
    chatButtonContainer: {
      position: 'relative'
    },
    newMessageDot: {
      position: 'absolute',
      top: '8%',
      right: '4%',
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: 'tomato'
    }
  }
}

export default styles
