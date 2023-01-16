# saturn-app-ui

Wrapper package around [@material-ui/core](https://material-ui.com/components/).

Also where new shared UI components should reside.

## Why wrap

Material UI provides a good set of themeable UI components, but we also want to override and enhance as needed.

Anytime a request is made to import from `saturn-app-ui/$package` we first check if there is a local package in `/src`.

If not, then we load the existing component from `@material-ui/core`

This allows us to load every UI from a single package `saturn-app-ui` but also not re-invent the wheel for components we can use in their default state from material-ui (think `Box`, `Grid`, `Icon`, etc.)

## Extension example

Here's a look at how we extend the `Button` component from MUI to meet our needs for a `SubmitButton`:

`/src/SubmitButton/SubmitButton.js`

```JSX
import React from 'react'
import BaseButton from 'saturn-app-ui/Button'
import PropTypes from 'prop-types'

const SubmitButton = ({ children, ...rest }) => {
  const opts = {
    type: 'submit',
    fullWidth: true,
    variant: 'contained',
    color: 'primary'
  }
  return (
    <BaseButton {...opts} {...rest}>
      {children}
    </BaseButton>
  )
}

SubmitButton.propTypes = {
  ...BaseButton.propTypes,
  children: PropTypes.any.isRequired
}

SubmitButton.defaultProps = {
  children: 'Submit'
}

export default SubmitButton
```

### Composing complex components

Complex Components can use multiple lower-level UI elements to create more complex ones.  Complex Components can also interact with effects and hooks as needed.

`PasswordField` is a good example, it combines extends `saturn-app-ui/TextField` component and relies on the `useTranslation` hook to provide the default field title and error messages.

`/src/PasswordField/PasswordField.js`

```JSX
import React, { useState } from 'react'
import InputAdornment from 'saturn-app-common/InputAdornment'
import Visibility from 'saturn-app-icons/Visibility'
import VisibilityOff from 'saturn-app-icons/VisibilityOff'
import IconButton from 'saturn-app-common/core/IconButton'
import TextField from 'saturn-app-common/TextField'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const PasswordField = ({ label, setPassword, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  // props passed will override
  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      label={label || t('passwordField.label')}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              aria-label={t('passwordField.toggle_visibility')}
              onClick={handleClickShowPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props}
    />
  )
}

// label is optional on password
PasswordField.propTypes = {
  ...TextField.propTypes,
  label: PropTypes.string
}

export default PasswordField
```
