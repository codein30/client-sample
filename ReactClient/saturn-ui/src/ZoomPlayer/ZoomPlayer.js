import React, { useLayoutEffect } from 'react'
import ZoomMtgEmbedded from 'saturn-app-common/zoomusWebsdk'
import PropTypes from 'prop-types'

const ZoomPlayer = (props) => {
  const {
    signature,
    meetingNumber,
    apiKey,
    username,
    password
  } = props

  // const meetingSDKElement = useRef(null)

  const getMeetingSDKElement = () => document.getElementById('meetingSDKElement')
  const client = ZoomMtgEmbedded.createClient()

  useLayoutEffect(() => {
    start()
  }, [])

  const start = async () => {
    console.log('##')
    client.init({
      debug: true,
      zoomAppRoot: getMeetingSDKElement(),
      language: 'en-US',
      customize: {
        meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        toolbar: {
          buttons: [
            {
              text: 'Custom Button',
              className: 'CustomButton',
              onClick: () => {
                console.log('custom button')
              }
            }
          ]
        }
      }
    }).then(() => {
      console.log('Joining meeting!')
      client.join({
        apiKey: apiKey,
        signature: signature,
        meetingNumber: meetingNumber,
        password: password,
        userName: username
      }).catch(e => {
        console.log('##getstartedbro')
      })
    })
  }

  return (
    <div id="meetingSDKElement">
    </div>
  )
}

ZoomPlayer.ProType = {
  event: PropTypes.shape({
    meetingNumber: PropTypes.number,
    role: PropTypes.number,
    apiKey: PropTypes.string,
    signature: PropTypes.string,
    apiSecret: PropTypes.string,
    userName: PropTypes.string,
    password: PropTypes.string,
    email: PropTypes.string,
    leaveUrl: PropTypes.string
  })
}
export default ZoomPlayer
