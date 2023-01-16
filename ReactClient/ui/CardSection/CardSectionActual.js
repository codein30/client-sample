import React, { useState, useEffect, useRef, memo } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import associateQueryHelperContext from 'saturn-app-common/associateQueryHelperContext'
import useCallback from 'saturn-app-hooks/useCallback'
import useMemo from 'saturn-app-hooks/useMemo'
import CardSectionEntries from './CardSectionEntries'
import Box from 'saturn-app-ui/Box'
import KwivrrCardSlider from 'saturn-app-scenes-pe/components/SturrAppClient/ui/KwivrrCardSlider'
import Typography from 'saturn-app-ui/Typography'
import useQueryHelperContext from 'saturn-app-hooks/useQueryHelperContext'
import queryPropType from 'saturn-app-common/queryPropType'
import listSummaryPropType from 'saturn-app-common/listSummaryPropType'
import KwivrrButton from 'saturn-app-scenes-pe/components/SturrAppClient/ui/KwivrrButton'
import PropTypes from 'prop-types'

const useStyles = makeStyles(styleClasses)

const CardSectionActual = (props) => {
  const {
    CardComponent,
    cardComponentProps,
    emptyText,
    query,
    listSummary,
    heading,
    headingCentered,
    rightSide,
    filters,
    toggleFilter,
    queryFilters
  } = props

  const classes = useStyles({ headingCentered })
  const [isLoading, setIsLoading] = useState(false)
  const ctx = useQueryHelperContext()
  const [page, setPage] = useState(1)
  const maxEntriesShowing = useMemo(() => listSummary.perPage * page, [listSummary.perPage, page])
  const currentQueryRef = useRef(query)

  const [entryComponents, setEntryComponents] = useState([])

  useEffect(() => {
    const newEntryComponents = [
      <CardSectionEntries
        key={0}
        CardComponent={CardComponent}
        cardComponentProps={cardComponentProps}
        query={currentQueryRef.current}
      />
    ]

    setEntryComponents(newEntryComponents)
  }, [setEntryComponents, CardComponent, cardComponentProps, currentQueryRef])

  const loadMore = useCallback(() => {
    setIsLoading(true)

    const { getNextQuery } = associateQueryHelperContext({ ctx, query: currentQueryRef.current })
    currentQueryRef.current = getNextQuery()

    setEntryComponents(prev => {
      return [
        ...prev,
        <CardSectionEntries
          key={prev.length}
          CardComponent={CardComponent}
          cardComponentProps={cardComponentProps}
          query={currentQueryRef.current}
        />
      ]
    })
    setPage((p) => p + 1)
    setIsLoading(false)
  }, [setPage, setIsLoading, cardComponentProps, CardComponent, currentQueryRef, setEntryComponents, ctx])

  const handleNext = useCallback(() => {
    if (isLoading) return
    if (listSummary.total <= maxEntriesShowing) return
    return loadMore()
  }, [isLoading, listSummary.total, maxEntriesShowing, loadMore])

  return (
    <Box>
      <Box className={classes.header}>
        <Box />
        <Typography align={headingCentered ? 'center' : 'left'} className={classes.heading}>
          {heading}
        </Typography>
        <Box className={classes.rightSide}>
          {rightSide}
        </Box>
      </Box>
      {!!filters?.length && (
        <Box className={classes.filters}>
          {filters.map(({ id, label }) => {
            const selected = queryFilters.includes(id)

            return (
              <KwivrrButton
                key={id}
                variant={selected ? 'contained' : 'outlined'}
                color="primary"
                onClick={toggleFilter(id)}
                className={classes.chip}
              >
                {label}
              </KwivrrButton>
            )
          })}
        </Box>
      )}
      {!!listSummary.total && (
        <KwivrrCardSlider
          entryComponents={entryComponents}
          onScrollEnd={handleNext}
        />
      )}
      {!listSummary.total && <Box m={2}>{emptyText}</Box>}
    </Box>
  )
}

CardSectionActual.propTypes = {
  heading: PropTypes.string.isRequired,
  CardComponent: PropTypes.any,
  emptyText: PropTypes.any,
  query: queryPropType,
  listSummary: listSummaryPropType,
  cardComponentProps: PropTypes.object,
  rightSide: PropTypes.any,
  headingCentered: PropTypes.bool,
  isMyEvent: PropTypes.bool,
  queryFilters: PropTypes.array,
  filters: PropTypes.array,
  toggleFilter: PropTypes.func
}

export default memo(CardSectionActual)
