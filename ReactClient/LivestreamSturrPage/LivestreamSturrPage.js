import React, { useState, useEffect, memo } from 'react'
import LivestreamSturrAppPageFallback from './LivestreamSturrAppPageFallback'
import LivestreamSturrAppPageActualWrapper from './LivestreamSturrAppPageActualWrapper'
import useActions from 'saturn-app-hooks/useActions'
import useNavigate from 'saturn-app-hooks/useNavigate'

const LivestreamSturrAppPage = (props) => {
  const { eventId, isPublisher, pageMode } = props
  const [isLoaded, setIsLoaded] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const [eventData, setEventData] = useState()
  const { postEventAttendee } = useActions()
  const navigate = useNavigate()

  useEffect(() => {
    postEventAttendee({ eventId }).then(res => {
      setEventData(res)
      setIsLoaded(true)
    }).catch(error => {
      console.log(error)
      setIsBlocked(true)
    })
  }, [])

  if (isBlocked) {
    navigate('index')
    return null
  }

  if (isLoaded) {
    return (
      <LivestreamSturrAppPageActualWrapper
        eventData={eventData}
        isPublisher={isPublisher}
        pageMode={pageMode}
      />
    )
  }

  return <LivestreamSturrAppPageFallback pageMode={pageMode} />
}

export default memo(LivestreamSturrAppPage)
