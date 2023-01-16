import React, { memo } from 'react'
import useTranslation from 'saturn-app-hooks/useTranslation'
import KwivrrButton from 'saturn-app-scenes-pe/components/SturrAppClient/ui/KwivrrButton'
import Icon from 'saturn-app-ui/Icon'

const goBack = () => history.back()

const BackButton = (props) => {
  const { t } = useTranslation()

  return (
    <KwivrrButton
      startIcon={<Icon>arrow_back</Icon>}
      onClick={goBack}
      color="default"
    >
      {t('SturrAppClient.back')}
    </KwivrrButton>
  )
}

export default memo(BackButton)
