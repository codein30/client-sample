import React, { useEffect, useState, memo } from 'react'
import format from 'saturn-app-common/format'
import useConfig from 'saturn-app-hooks/useConfig'
import useAuthable from 'saturn-app-hooks/useAuthable'
import { ActionCableProvider } from 'saturn-app-hooks/useActionCable'
import LivestreamEmbedPageActual from './LivestreamEmbedPageActual'

const LivestreamEmbedPageActualWrapper = (props) => {
  const [url, setUrl] = useState(null)
  const authable = useAuthable()
  const config = useConfig()
  const { kwivrrActionCableUrl } = config

  useEffect(() => {
    authable.getAccessToken()
      .then(accessToken => {
        const wsApiWithToken = format(kwivrrActionCableUrl, { accessToken })
        setUrl(wsApiWithToken)
      })
  }, [authable, setUrl, kwivrrActionCableUrl])

  if (!url) return null

  return (
    <ActionCableProvider url={url}>
      <LivestreamEmbedPageActual {...props}/>
    </ActionCableProvider>
  )
}

export default memo(LivestreamEmbedPageActualWrapper)
