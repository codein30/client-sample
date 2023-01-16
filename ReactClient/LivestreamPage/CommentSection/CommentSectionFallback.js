import React, { useRef } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import CommentsFallback from './Comments/CommentsFallback'
import useTranslation from 'saturn-app-hooks/useTranslation'
import useComponentSize from 'saturn-app-hooks/useComponentSize'

import Box from 'saturn-app-ui/Box'
import IconButton from 'saturn-app-ui/IconButton'
import Icon from 'saturn-app-ui/Icon'
import TextFieldBase from 'saturn-app-ui/TextFieldBase'

import PropTypes from 'prop-types'

const useStyles = makeStyles(styleClasses)

const CommentSectionFallback = (props) => {
  const { t } = useTranslation()
  const parentRef = useRef(null)
  const { height: parentHeight } = useComponentSize(parentRef)

  const classes = useStyles({ parentHeight })

  return (
    <>
      <Box ref={parentRef} className={classes.commentsBox}>
        <CommentsFallback parentHeight={parentHeight} />
      </Box>
      <Box className={classes.sendMessageBox}>
        <TextFieldBase
          size="small"
          disabled
          placeholder={t('SturrAppClient.send_message')}
          InputProps={{ className: classes.sendMessageField }}
        />
        <IconButton
          disabled
          classes={{ root: classes.sendBtn }}
        >
          <Icon fontSize="small">send</Icon>
        </IconButton>
      </Box>
    </>
  )
}

CommentSectionFallback.propTypes = {
  eventId: PropTypes.any.isRequired
}

export default CommentSectionFallback
