import React, { memo } from 'react'
import StopIconButton from 'saturn-app-scenes-pe/components/SturrAppClient/icons/StopIconButton'
import Box from 'saturn-app-ui/Box'

import PropTypes from 'prop-types'

const LifecycleButtonsActual = (props) => {
  return (
    <Box>
      <StopIconButton isLoading />
    </Box>
  )
}

LifecycleButtonsActual.propTypes = {
  streamType: PropTypes.string.isRequired
}

export default memo(LifecycleButtonsActual)
