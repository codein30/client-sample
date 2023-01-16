import React, { memo, useState } from 'react'
import makeStyles from 'saturn-app-common/makeStyles'
import styleClasses from './styles'
import useMemo from 'saturn-app-hooks/useMemo'
import useCallback from 'saturn-app-hooks/useCallback'
import useTranslation from 'saturn-app-hooks/useTranslation'
import { Home, Search, Calendar, User, Radio } from 'saturn-app-common/react-feather'
import CreateLivestreamIcon from 'saturn-app-scenes-pe/components/SturrAppClient/icons/CreateLivestreamIcon'
import useNavigate from 'saturn-app-hooks/useNavigate'
import useHashParams from 'saturn-app-hooks/useHashParams'
import useIsBreakpoint from 'saturn-app-hooks/useIsBreakpoint'
import isUndefined from 'saturn-app-common/isUndefined'
import Box from 'saturn-app-ui/Box'
import Button from 'saturn-app-ui/Button'
import Fade from 'saturn-app-ui/Fade'
import Popover from 'saturn-app-ui/Popover'
import IconButton from 'saturn-app-ui/IconButton'
import Icon from 'saturn-app-ui/Icon'
import Typography from 'saturn-app-ui/Typography'

const useStyles = makeStyles(styleClasses)

const Navigation = (props) => {
  const { setSearchBarIsShowing } = props
  const classes = useStyles()
  const navigate = useNavigate()
  const { t } = useTranslation()
  let { view } = useHashParams()
  if (isUndefined(view)) view = 'index'
  const isSm = useIsBreakpoint('sm')
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenStreamOptions = useCallback(event => {
    setAnchorEl(event.currentTarget)
  }, [setAnchorEl])

  const handleClose = () => {
    setAnchorEl(null)
  }

  const streamOptionsOpen = Boolean(anchorEl)

  const navigateToHome = useCallback(() => {
    navigate('index')
  }, [navigate])

  const navigateToCreateLivestream = useCallback(createType => {
    navigate('create-livestream', { createType })
    handleClose()
  }, [navigate])

  const navigateToManageEvents = useCallback(() => {
    navigate('manage-events', { viewTab: 'card' })
  }, [navigate])

  const enableSearch = useCallback(() => {
    setSearchBarIsShowing(true)
  }, [setSearchBarIsShowing])

  const navElements = useMemo(() => ([
    {
      id: 'index',
      NavElementIcon: Home,
      onClick: navigateToHome
    },
    {
      id: 'search',
      NavElementIcon: Search,
      onClick: enableSearch
    },
    {
      id: 'create-livestream',
      NavElementIcon: CreateLivestreamIcon,
      onClick: handleOpenStreamOptions
    },
    {
      id: 'manage-events',
      NavElementIcon: Calendar,
      onClick: navigateToManageEvents
    }
  ]), [navigateToHome, enableSearch, navigateToManageEvents, handleOpenStreamOptions])

  const streamOptions = useMemo(() => ([
    {
      id: 'physical',
      label: t('SturrAppClient.in_person'),
      OptionIcon: User,
      onClick: () => navigateToCreateLivestream('physical')
    },
    {
      id: 'digital',
      label: t('SturrAppClient.stream'),
      OptionIcon: Radio,
      onClick: () => navigateToCreateLivestream('digital')
    }
  ]), [t, navigateToCreateLivestream])

  return (
    <Box className={classes.container}>
      {navElements.map(({ id, NavElementIcon, onClick }) => {
        const color = isSm ? '#fff' : '#000'
        return (
          <Button
            key={id}
            disableRipple
            onClick={onClick}
            classes={{
              root: classes.buttonRoot,
              label: classes.buttonLabel
            }}
          >
            <NavElementIcon
              color={id !== 'create-livestream' ? color : undefined}
              size={28}
            />
            <Fade in={view === id}><Box className={classes.line} /></Fade>
          </Button>
        )
      })}
      <Popover
        open={streamOptionsOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{
          root: classes.streamOptionsRoot,
          paper: classes.streamOptionsPaper
        }}
        anchorOrigin={{
          vertical: isSm ? 'bottom' : 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: isSm ? 'top' : 'bottom',
          horizontal: 'center'
        }}
      >
        <Box className={classes.popoverContents}>
          <Box className={classes.streamOptions}>
            {streamOptions.map(({ id, OptionIcon, onClick, label }) => {
              return (
                <Box key={id} className={classes.streamOption}>
                  <Box>
                    <IconButton onClick={onClick} size="small" className={classes.streamOptionIconButton}>
                      <OptionIcon color={isSm ? '#000' : '#fff'} size={20} />
                    </IconButton>
                  </Box>
                  <Typography className={classes.streamOptionLabel}>
                    {label}
                  </Typography>
                </Box>
              )
            })}
          </Box>
          <Box className={classes.closeBtnBox}>
            <IconButton size="small" className={classes.closeBtn} onClick={handleClose}>
              <Icon fontSize="small">close</Icon>
            </IconButton>
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}

export default memo(Navigation)
