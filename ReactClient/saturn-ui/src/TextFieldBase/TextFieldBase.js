import React from 'react'
import MuiTextField from '@material-ui/core/TextField'
import LoadingLabel from 'saturn-app-ui/LoadingLabel'
import styles from './styles'
import makeStyles from 'saturn-app-common/makeStyles'
import clsx from 'saturn-app-common/clsx'
import PropTypes from 'prop-types'

const useStyles = makeStyles(styles)

const TextFieldBase = (props) => {
  let {
    variant = 'outlined',
    fullWidth = true,
    isPending = false,
    isLoading = false,
    loadingMessage = '',
    ...rest
  } = props

  let opts = {
    variant,
    fullWidth,
    ...rest
  }

  const classes = useStyles()

  if (!loadingMessage) loadingMessage = opts.label

  switch (true) {
    case isLoading:
      opts = {
        ...opts,
        label: <LoadingLabel message={loadingMessage} />,
        value: '',
        disabled: true,
        InputLabelProps: {
          classes: {
            root: classes.inputLabelRoot
          }
        },
        className: clsx(opts.className, classes.pending),
        select: false
      }
      break

    case isPending:
      opts = {
        ...opts,
        disabled: true,
        className: clsx(opts.className, classes.pending)
      }
      break
  }

  return (
    <MuiTextField {...opts} />
  )
}

TextFieldBase.propTypes = {
  ...MuiTextField.propTypes,
  label: PropTypes.string,
  isPending: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string
}

export default TextFieldBase
