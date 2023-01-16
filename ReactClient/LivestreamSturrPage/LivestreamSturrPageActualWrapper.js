import React, { useEffect, useState, memo } from 'react'
import useAuthable from 'saturn-app-hooks/useAuthable'
import format from 'saturn-app-common/format'
import useConfig from 'saturn-app-hooks/useConfig'
import { ActionCableProvider } from 'saturn-app-hooks/useActionCable'
import Box from 'saturn-app-ui/Box'
import LivestreamSturrAppPageActual from './LivestreamSturrAppPageActual'

const LivestreamSturrAppPageActualWrapper = (props) => {
  const [url, setUrl] = useState(null)
  const authable = useAuthable()
  const config = useConfig()
  const { kwivrrActionCableUrl } = config

  useEffect(() => {
    authable.getAccessToken()
      .then(accessToken => {
        const wsApiWithToken = format(kwivrrActionCableUrl, { accessToken: accessToken })
        setUrl(wsApiWithToken)
      })
  }, [authable, setUrl])

  if (!url) return <Box></Box>

  return (
    <ActionCableProvider url={url}>
      <LivestreamSturrAppPageActual {...props}/>
    </ActionCableProvider>
  )
}

export default memo(LivestreamSturrAppPageActualWrapper)
