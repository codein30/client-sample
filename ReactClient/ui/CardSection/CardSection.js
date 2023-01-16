import React, { memo } from 'react'
import CardSectionFallback from './CardSectionFallback'
import CardSectionActual from './CardSectionActual'
import SuspenseQuery from 'saturn-app-ui/SuspenseQuery'
import normalizeListProps from 'saturn-app-common/normalizeListProps'

const CardSection = (props) => {
  const {
    queryHelperBag
  } = props

  const { query, retryQuery } = queryHelperBag

  return (
    <SuspenseQuery
      component={CardSectionActual}
      fallback={CardSectionFallback}
      keepFallbackOnError={true}
      query={query}
      onRetry={retryQuery}
      maxRetries={3}
      withErrorBoundary={true}
      normalizeProps={normalizeListProps}
      {...props}
    />
  )
}

export default memo(CardSection)
