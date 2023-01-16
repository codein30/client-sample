import React, { memo } from 'react'
import Box from 'saturn-app-ui/Box'

const CardSectionEntriesActual = (props) => {
  const {
    entries,
    cardComponentProps,
    CardComponent
  } = props

  return entries.map(entry => (
    <Box key={entry.id} className="saturn-app-card-slide">
      <CardComponent entry={entry} {...cardComponentProps} />
    </Box>
  ))
}

export default memo(CardSectionEntriesActual)
