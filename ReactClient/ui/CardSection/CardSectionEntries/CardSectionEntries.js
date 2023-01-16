import React, { memo } from 'react'
import CardSectionEntriesFallback from './CardSectionEntriesFallback'
import CardSectionEntriesActual from './CardSectionEntriesActual'
import useHydratedQuery from 'saturn-app-hooks/useHydratedQuery'
import SuspenseQuery from 'saturn-app-ui/SuspenseQuery'
import normalizeListProps from 'saturn-app-common/normalizeListProps'

const CardSectionEntries = (props) => {
  const { query, retryQuery } = useHydratedQuery(props.query)

  return (
    <SuspenseQuery
      component={CardSectionEntriesActual}
      fallback={CardSectionEntriesFallback}
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

export default memo(CardSectionEntries)
