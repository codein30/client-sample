import { useEffect, useRef } from 'react'
import useNavigate from 'saturn-app-hooks/useNavigate'
import useAuthable from 'saturn-app-hooks/useAuthable'
import listenForEvent from 'saturn-app-common/listenForEvent'
import stopListeningForEvent from 'saturn-app-common/stopListeningForEvent'
import useForceUpdate from 'saturn-app-hooks/useForceUpdate'
import isUndefined from 'saturn-app-common/isUndefined'
import _useScopedTranslation from 'saturn-app-hooks/useScopedTranslation'
import _useScopedFormErrorHandler from 'saturn-app-hooks/useScopedFormErrorHandler'

const useIsLoggedIn = () => {
  const {
    EVENT_CODE,
    isAuthenticated
  } = useAuthable()

  const forceUpdate = useForceUpdate()
  const isLoggedInRef = useRef(undefined)

  useEffect(() => {
    listenForEvent(EVENT_CODE, (payload) => {
      switch (payload.eventType) {
        case 'LOGIN':
        case 'REFRESH':
          if (!isLoggedInRef.current) {
            isLoggedInRef.current = true
            forceUpdate()
          }
          break
        case 'LOGOUT':
          if (isLoggedInRef.current) {
            isLoggedInRef.current = false
            forceUpdate()
          }
          break
      }
    })

    return () => {
      stopListeningForEvent(EVENT_CODE)
    }
  }, [])

  useEffect(() => {
    isAuthenticated()
      .then(_isAuthenticated => {
        isLoggedInRef.current = _isAuthenticated
        forceUpdate()
      })
  }, [isLoggedInRef, forceUpdate])

  return isLoggedInRef.current
}

const useRequireAuthentication = () => {
  // AS: There's a double redirect issue this hasRedirected test solves for
  const hasRedirected = useRef(false)
  const isLoggedIn = useIsLoggedIn()
  const navigate = useNavigate()

  if (isUndefined(isLoggedIn)) return undefined

  if (!isLoggedIn) {
    if (!hasRedirected.current) {
      // const errorMessage = scopedT('authenticationRequiredRedirectMessage')
      // enqueueSnackbarError(errorMessage)
      navigate('login', { returnPath: window.location })
      hasRedirected.current = true
    }
  } else {
    hasRedirected.current = false
  }
  return true
}

const useIsAdmin = () => {
  const { isAdmin } = useAuthable()

  const forceUpdate = useForceUpdate()
  const isAdminRef = useRef(undefined)

  useEffect(() => {
    isAdmin()
      .then(_isAdmin => {
        isAdminRef.current = _isAdmin
        forceUpdate()
      })
  }, [isAdminRef, forceUpdate, isAdmin])

  return isAdminRef.current
}

const useScopedFormErrorHandler = () => {
  return _useScopedFormErrorHandler('SturrAppClient.apiErrors.')
}

const useScopedTranslation = () => {
  return _useScopedTranslation('SturrAppClient.')
}

export {
  useScopedTranslation,
  useScopedFormErrorHandler,
  useIsLoggedIn,
  useIsAdmin,
  useRequireAuthentication
}
