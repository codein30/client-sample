import React, { memo } from 'react'
import Box from 'saturn-app-ui/Box'

const CardSectionEntriesFallback = (props) => {
  const {
    cardComponentProps,
    CardComponent
  } = props

  return Array.from(new Array(10)).map((k, idx) => (
    <Box key={idx} className="saturn-app-card-slide">
      <CardComponent isLoading {...cardComponentProps}/>
    </Box>
  ))
}

export default memo(CardSectionEntriesFallback)
