import React from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import BaseDialog from '@material-ui/core/Dialog'
import BaseDialogContent from '@material-ui/core/DialogContent'
import PropTypes from 'prop-types'

const useStyles = makeStyles(({ palette, breakpoints, spacing }) => {
  return {
    scrollPaper: ({ position }) => ({
      alignItems: position === 'top' ? 'baseline' : ''
    }),
    content: {
      padding: 0,
      paddingTop: '0px !important'
    },
    '@global': {
      html: {
        overflow: 'hidden'
      }
    }
  }
})

const TakeoverDialogue = (props) => {
  const {
    isFullScreen,
    isFullWidth,
    children,
    position,
    ...rest
  } = props

  const classes = useStyles({ position })

  return (
    <BaseDialog
      classes={{ scrollPaper: classes.scrollPaper }}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      disableScrollLock={false}
      fullScreen={true}
      fullWidth={true}
      {...rest}
    >
      <BaseDialogContent className={classes.content} >
        {children}
      </BaseDialogContent>
    </BaseDialog>
  )
}

TakeoverDialogue.defaultProps = {
  scroll: 'paper'
}

TakeoverDialogue.propTypes = {
  children: PropTypes.node,
  isFullScreen: PropTypes.func,
  isFullWidth: PropTypes.func,
  ...BaseDialog.propTypes
}

export default TakeoverDialogue
