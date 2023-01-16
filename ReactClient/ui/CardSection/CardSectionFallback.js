import React, { memo } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import CardSectionEntriesFallback from './CardSectionEntries/CardSectionEntriesFallback'
import Box from 'saturn-app-ui/Box'
import KwivrrCardSlider from 'saturn-app-scenes-pe/components/SturrAppClient/ui/KwivrrCardSlider'
import Typography from 'saturn-app-ui/Typography'
import KwivrrButton from 'saturn-app-scenes-pe/components/SturrAppClient/ui/KwivrrButton'
import PropTypes from 'prop-types'

const useStyles = makeStyles(styleClasses)

const CardSectionFallback = (props) => {
  const {
    CardComponent,
    cardComponentProps,
    heading,
    headingCentered,
    rightSide,
    filters
  } = props

  const classes = useStyles({ headingCentered })

  const entryComponents = [
    <CardSectionEntriesFallback
      key={0}
      CardComponent={CardComponent}
      cardComponentProps={cardComponentProps}
    />
  ]

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
          {filters.map(({ id, label }) => (
            <KwivrrButton
              key={id}
              variant={'outlined'}
              color="primary"
              className={classes.chip}
              disabled
            >
              {label}
            </KwivrrButton>
          ))}
        </Box>
      )}
      <KwivrrCardSlider
        entryComponents={entryComponents}
        isLoading
      />
    </Box>
  )
}

CardSectionFallback.propTypes = {
  CardComponent: PropTypes.any,
  cardComponentProps: PropTypes.object,
  heading: PropTypes.string.isRequired,
  headingCentered: PropTypes.bool,
  rightSide: PropTypes.any,
  filters: PropTypes.array
}

export default memo(CardSectionFallback)
