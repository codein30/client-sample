import React, { memo, useState, useEffect } from 'react'
import LivestreamEmbedPageFallback from './LivestreamEmbedPageFallback'
import LivestreamEmbedPageActualWrapper from './LivestreamEmbedPageActualWrapper'
import useActions from 'saturn-app-hooks/useActions'
import useNavigate from 'saturn-app-hooks/useNavigate'

import PropTypes from 'prop-types'

const LivestreamEmbedPage = (props) => {
  const { eventId, pageMode } = props
  const [isLoaded, setIsLoaded] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const [event, setEvent] = useState()
  const { postEventAttendee } = useActions()
  const navigate = useNavigate()

  useEffect(() => {
    postEventAttendee({ eventId: parseInt(eventId) })
      .then((event) => {
        setEvent(event)
        setIsLoaded(true)
      }).catch(error => {
        console.log(error)
        setIsBlocked(true)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isBlocked) {
    navigate('index')
    return null
  }

  if (isLoaded) return <LivestreamEmbedPageActualWrapper eventData={event} pageMode={pageMode} />
  return <LivestreamEmbedPageFallback pageMode={pageMode} />
}

LivestreamEmbedPage.propTypes = {
  eventId: PropTypes.string.isRequired,
  pageMode: PropTypes.string
}

export default memo(LivestreamEmbedPage)
