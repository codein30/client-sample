import React, { memo, forwardRef } from 'react'
import isUndefined from 'saturn-app-common/isUndefined'
import useSelectedTabId from 'saturn-app-hooks/useSelectedTabId'
import Box from 'saturn-app-ui/Box'

const TabPanel = memo(forwardRef((props, ref) => {
  let {
    value,
    index,
    children,
    keepMounted = false
  } = props

  let selectedTabId = useSelectedTabId()
  // Legacy tabs behavior
  if (isUndefined(selectedTabId)) {
    selectedTabId = value
    value = index
  }

  const isActive = selectedTabId === value

  if (!keepMounted) return isActive ? children : null

  const display = isActive ? 'block' : 'none'

  return (
    <Box display={display} ref={ref}>{children}</Box>
  )
}))

TabPanel.displayName = 'TabPanel'

export default TabPanel
