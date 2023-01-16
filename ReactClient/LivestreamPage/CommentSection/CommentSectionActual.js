import React, { useRef, useState, useEffect, useMemo, Fragment } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import Comments from './Comments'
import useTranslation from 'saturn-app-hooks/useTranslation'
import useCallback from 'saturn-app-hooks/useCallback'
import useActions from 'saturn-app-hooks/useActions'
import useConfig from 'saturn-app-hooks/useConfig'
import useComponentSize from 'saturn-app-hooks/useComponentSize'

import Box from 'saturn-app-ui/Box'
import IconButton from 'saturn-app-ui/IconButton'
import Icon from 'saturn-app-ui/Icon'
import TextFieldBase from 'saturn-app-ui/TextFieldBase'

import PropTypes from 'prop-types'

const useStyles = makeStyles(styleClasses)

const CommentSectionActual = (props) => {
  const {
    isBanned,
    eventId,
    streamType,
    close,
    showOverlayComments
  } = props

  const { addEventMessage } = useActions()

  const { commentOverlay, collaborationProvider } = useConfig()

  const { t } = useTranslation()
  const parentRef = useRef(null)
  const { height: parentHeight } = useComponentSize(parentRef)
  const [comment, setComment] = useState('')
  const [mounted, setMounted] = useState({ open: false, rendering: false })

  const classes = useStyles({ parentHeight, streamType, commentOverlay, open: mounted.open, collaborationProvider })

  const sendComment = useCallback(() => {
    const payload = {
      eventId: parseInt(eventId),
      message: comment
    }
    addEventMessage(payload).then(() => {
      setComment('')
    })
  }, [eventId, addEventMessage, comment, setComment])

  const onKeypressCommentField = useCallback(e => {
    if (e.keyCode === 13 && comment.length) sendComment()
  }, [comment.length, sendComment])

  const onChangeComment = useCallback((e) => {
    setComment(e.target.value)
  }, [setComment])

  const closeCommentsOverlay = useCallback(() => {
    setMounted({ rendering: true, open: false })
    setTimeout(() => {
      setMounted({ rendering: false, open: false })
      close()
    }, 500)
  }, [setMounted, close])

  useEffect(() => {
    if (showOverlayComments) {
      setMounted({
        open: true,
        rendering: true
      })
    } else {
      closeCommentsOverlay()
    }
  }, [showOverlayComments, setMounted, closeCommentsOverlay])

  const Container = useMemo(() => commentOverlay ? Box : Fragment, [commentOverlay])

  if (!mounted.rendering) return null

  return (
    <Box className={classes.commentSectionContainer}>
      <Box className={classes.blurred} />
      <Container className={classes.commentsContainer}>
        <Box ref={parentRef} className={classes.commentsBox}>
          <Comments
            streamType={streamType}
            eventId={eventId}
            parentHeight={parentHeight}
            parentRef={parentRef}
          />
        </Box>
        <Box className={classes.sendMessageBox}>
          <TextFieldBase
            size="small"
            disabled={isBanned}
            value={comment}
            onChange={onChangeComment}
            onKeyDown={onKeypressCommentField}
            placeholder={t('SturrAppClient.send_message')}
            InputProps={{ className: classes.sendMessageField }}
          />
          <IconButton
            disabled={!comment.length || isBanned}
            onClick={sendComment}
            classes={{ root: classes.sendBtn }}
          >
            <Icon fontSize="small">send</Icon>
          </IconButton>
        </Box>
        {commentOverlay && (
          <Box className={classes.closeButton}>
            <IconButton onClick={closeCommentsOverlay}>
              <Icon className={classes.icon} fontSize="medium">close</Icon>
            </IconButton>
          </Box>
        )}
      </Container>
    </Box>
  )
}

CommentSectionActual.propTypes = {
  isBanned: PropTypes.bool.isRequired,
  eventId: PropTypes.any.isRequired,
  streamType: PropTypes.string.isRequired,
  showOverlayComments: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired

}

export default CommentSectionActual
