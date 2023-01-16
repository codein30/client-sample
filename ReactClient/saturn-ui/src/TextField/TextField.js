import React from 'react'
import PropTypes from 'prop-types'
import TextFieldBase from 'saturn-app-ui/TextFieldBase'
import useField from 'saturn-app-hooks/useField'
import useFormContext from 'saturn-app-hooks/useFormContext'

const TextField = ({ onChange: localOnChange, onBlur: localOnBlur, helperText, ...props }) => {
  const [field, { touched, error }] = useField(props)
  const hasError = !!(touched && error)

  const methods = useFormContext()

  const onChange = (e) => {
    if (localOnChange) localOnChange(e, methods, field)
    else field.onChange(e)
  }

  const onBlur = (e) => {
    if (localOnBlur) localOnBlur(e, methods, field)
    else field.onBlur(e)
  }

  return (
    <TextFieldBase
      {...field}
      {...props}
      onChange={onChange}
      onBlur={onBlur}
      error={hasError}
      helperText={helperText || (hasError ? error : '')}
    />
  )
}

TextField.propTypes = {
  ...TextFieldBase.propTypes,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.any,
  name: PropTypes.string.isRequired
}

export default TextField
