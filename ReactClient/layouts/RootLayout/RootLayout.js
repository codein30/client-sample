import React, { Suspense, useState, memo, useEffect } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import useHashParams from 'saturn-app-hooks/useHashParams'
import useCallback from 'saturn-app-hooks/useCallback'
import styleClasses from './styles'
import TopBar from './TopBar'
import BottomBar from './BottomBar'
import Box from 'saturn-app-ui/Box'
import RelativeBox from 'saturn-app-ui/RelativeBox'
import MobileOnly from 'saturn-app-ui/MobileOnly'
import CookieConsentBanner from 'saturn-app-scenes-pe/components/SturrAppClient/ui/CookieConsentBanner'
import childrenPropType from 'saturn-app-common/childrenPropType'
import FirebaseInterface from './firebaseInterface'
import Link from 'saturn-app-ui/Link'

import useSnackbar from 'saturn-app-hooks/useSnackbar'
import useActions from 'saturn-app-hooks/useActions'

import PropTypes from 'prop-types'

const useStyles = makeStyles(styleClasses)

const RootLayout = (props) => {
  const { children, topBarOnly } = props
  const [searchBarIsShowing, setSearchBarIsShowing] = useState(false)
  const { pageMode, view } = useHashParams()
  const classes = useStyles({ topBarOnly, view })
  const layoutHidden = pageMode === 'componentOnly' || pageMode === 'noLayout'
  const [, setIsCookieBannerDismissed] = useState(false)
  const { enqueueSnackbarInfo } = useSnackbar()
  const { registerForPushNotifications } = useActions()
  const firebase = FirebaseInterface()
  const {
    getFirebaseToken,
    onNotificationListener
  } = firebase

  useEffect(() => {
    getFirebaseToken()
      .then(token => {
        if (token) {
          console.log('sending token::!!', token)
          registerForPushNotifications({
            token: token,
            platform: 'web', // this probably should be 'web'
            deviceDetails: { foo: 'bar' }
          })
        } else {
          console.log('No registration token available. Request permission to generate one.')
        }
      }).catch(err => {
        console.log('An error occurred while retrieving token. ', err)
      })
    onNotificationListener((payload) => {
      console.log('foreground message ', payload)
      enqueueSnackbarInfo(<NotificationLink href={payload.data.url} label={payload.notification.body}/>, { persist: true })
    })
  }, [getFirebaseToken, onNotificationListener, enqueueSnackbarInfo, registerForPushNotifications])

  const NotificationLink = useCallback(({ href, label }) => (
    <Link href={href} className={classes.link}>
      {label}
    </Link>
  ), [classes.link])

  const dismissCookieBanner = useCallback(() => {
    setIsCookieBannerDismissed(true)
    localStorage.setItem('isCookieBannerDismissed', true)
  }, [setIsCookieBannerDismissed])

  const isCookieBannerDismissed = localStorage.getItem('isCookieBannerDismissed')

  if (layoutHidden) return children
  return (
    <Suspense fallback={null}>
      <RelativeBox className={classes.container}>
        <TopBar
          searchBarIsShowing={searchBarIsShowing}
          setSearchBarIsShowing={setSearchBarIsShowing}
        />
        <Box className={classes.body}>
          {children}
        </Box>
        {!topBarOnly && (
          <MobileOnly>
            <BottomBar setSearchBarIsShowing={setSearchBarIsShowing} />
          </MobileOnly>
        )}
        {!isCookieBannerDismissed && (
          <CookieConsentBanner dismissCookieBanner={dismissCookieBanner} />
        )}
      </RelativeBox>
    </Suspense>
  )
}

RootLayout.propTypes = {
  children: childrenPropType.isRequired,
  topBarOnly: PropTypes.bool
}

export default memo(RootLayout)
