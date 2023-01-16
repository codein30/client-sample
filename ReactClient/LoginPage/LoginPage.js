import React from 'react'
import useMemo from 'saturn-app-hooks/useMemo'
import useCallback from 'saturn-app-hooks/useCallback'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import SturrAppLogo from '../assets/logos/vertical/PNG/Kwivrr_Logo_4C_Vert.png'

import Yup from 'saturn-app-common/yup'

import useTranslation from 'saturn-app-hooks/useTranslation'
import useNavigate from 'saturn-app-hooks/useNavigate'
import useActions from 'saturn-app-hooks/useActions'
import {
  useScopedFormErrorHandler,
  useScopedTranslation
} from 'saturn-app-scenes-pe/components/SturrAppClient/hooks'
import LoginButtons from 'saturn-app-scenes-pe/components/SturrAppClient/ui/LoginButtons'

import Box from 'saturn-app-ui/Box'
import Typography from 'saturn-app-ui/Typography'
import TextField from 'saturn-app-ui/TextField'
import Form from 'saturn-app-ui/Form'
import Grid from 'saturn-app-ui/Grid'
import SubmitButton from 'saturn-app-ui/SubmitButton'
import Button from 'saturn-app-ui/Button'
import CircularProgress from 'saturn-app-ui/CircularProgress'

const useStyles = makeStyles(styleClasses)

const initialValues = {
  email: '',
  password: ''
}

const LoginPage = (props) => {
  const { returnPath } = props

  const classes = useStyles()
  const { t } = useTranslation()
  const scopedT = useScopedTranslation()
  const navigate = useNavigate()

  const { login } = useActions()

  const errorHandler = useScopedFormErrorHandler()

  const validationSchema = useMemo(() => Yup.object().shape({
    email: Yup.string().email(t('Form.must_be_valid_email')).required(t('Form.required')),
    password: Yup.string()
      .test('passwordLength', t('Form.at_least_6'), val => {
        if (!val) return true
        return val.length >= 6
      })
      .required(t('Form.required'))
  }), [t])

  const navigateToCreateAccount = useCallback(() => {
    navigate('create-account', { returnPath })
  }, [returnPath, navigate])

  const navigateToForgotPassword = useCallback(email => () => {
    navigate('forgot-password', { email })
  }, [navigate])

  const defaultNavigate = useCallback(() => {
    navigate(returnPath)
  }, [navigate, returnPath])

  const navigateAfterLogin = useCallback(() => {
    if (returnPath) return defaultNavigate()
    navigate('index')
  }, [returnPath, defaultNavigate, navigate])

  const handleSubmit = useCallback((input, { setSubmitting }) => {
    setSubmitting(true)
    login(input)
      .then(res => {
        navigateAfterLogin()
      })
      .catch(error => {
        setSubmitting(false)
        errorHandler(error)
      })
  }, [login, navigateAfterLogin, errorHandler])

  const formPayload = useMemo(() => ({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  }), [validationSchema, handleSubmit])

  return (
    <Box className={classes.container}>
      <img
        height={90}
        src={SturrAppLogo}
        alt=""
      />
      <Typography className={classes.welcome}>
        {scopedT('login_to_kwivrr')}
      </Typography>
      <LoginButtons navigateAfterLogin={navigateAfterLogin} />
      <Typography
        className={classes.lightText}
        variant="body2"
        align="center"
      >
        {`- ${scopedT('or')} -`}
      </Typography>
      <Form
        {...formPayload}
        validateOnBlur={true}
        validateOnChange={true}
        validateOnMount={true}
      >
        {({ values, isValid, isSubmitting }) => {
          return (
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography
                  className={classes.lightText}
                  variant="body2"
                  gutterBottom
                >
                  {scopedT('email_address')}
                </Typography>
                <TextField
                  size="small"
                  name="email"
                  type="email"
                  InputProps={{ className: classes.textField }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  className={classes.lightText}
                  variant="body2"
                  gutterBottom
                >
                  {scopedT('password')}
                </Typography>
                <TextField
                  size="small"
                  name="password"
                  type="password"
                  InputProps={{ className: classes.textField }}
                />
              </Grid>
              <Box className={classes.centeredBtnBox}>
                <Button
                  disableRipple
                  onClick={navigateToForgotPassword(values.email)}
                  classes={{
                    root: classes.forgotPasswordBtn,
                    label: classes.lightText
                  }}
                >
                  {scopedT('forgot_password')}
                </Button>
              </Box>
              <Grid item xs={12}>
                <SubmitButton
                  disabled={!isValid || isSubmitting}
                  fullWidth
                  classes={{
                    root: classes.submitButton,
                    label: classes.submitButtonLabel
                  }}
                >
                  {!isSubmitting ? scopedT('login') : <CircularProgress color="inherit" size={39.2} />}
                </SubmitButton>
              </Grid>
            </Grid>
          )
        }}
      </Form>
      <Grid item xs={12}>
        <Box className={classes.centeredBtnBox}>
          <Typography variant="body2">
            {scopedT('new_here')}
          </Typography>
          <Button
            onClick={navigateToCreateAccount}
            className={classes.createAcctBtn}
            disableRipple
          >
            {scopedT('create_an_account')}
          </Button>
        </Box>
      </Grid>
    </Box>
  )
}

export default LoginPage
