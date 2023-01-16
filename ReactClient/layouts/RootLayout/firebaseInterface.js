import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import useConfig from 'saturn-app-hooks/useConfig'

const FirebaseInterface = () => {
  const config = useConfig()
  const {
    firebase
  } = config

  const {
    firebaseConfig,
    vapidKey
  } = firebase

  const app = initializeApp(firebaseConfig)
  console.log('firebase initialized')
  const messaging = getMessaging(app)
  // TODO: Test analytics from CreateAccountPage and LoginPage if they use different layout
  // eslint-disable-next-line no-unused-vars
  const analytics = getAnalytics(app)

  const getFirebaseToken = () => getToken(messaging, { vapidKey })
  const onNotificationListener = (cb) => onMessage(messaging, (payload) => cb(payload))

  return {
    getFirebaseToken,
    onNotificationListener
  }
}

export default FirebaseInterface
