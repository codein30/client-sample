import decoratePageableQuery from 'saturn-app-common/decoratePageableQuery'
import normalizeDate from 'saturn-app-common/normalizeDate'

const infoAndProfileListeners = (payload) => {
  const { event, helpers } = payload
  switch (event.eventCode) {
    case 'AVATAR_URL_UPDATED': {
      if (event.isOptimistic) {
        return helpers.updateQueryData(data => {
          const avatarUrl = event.payload.avatarUrl
          const hasAvatarImage = !!event.payload.avatarUrl
          return { ...data, avatarUrl, hasAvatarImage }
        })
      } else return helpers.revalidateQuery()
    }
    case 'BANNER_URL_UPDATED': {
      if (event.isOptimistic) {
        return helpers.updateQueryData(data => {
          const bannerUrl = event.payload.bannerUrl
          const hasBannerImage = !!event.payload.bannerUrl
          return { ...data, bannerUrl, hasBannerImage }
        })
      } else return helpers.revalidateQuery()
    }
    case 'USER_NAME_UPDATED': {
      if (event.isOptimistic) {
        return helpers.updateQueryData(data => {
          const { firstName, lastName } = event.payload
          return { ...data, firstName, lastName }
        })
      } else return helpers.revalidateQuery()
    }
    case 'TAGLINE_UPDATED': {
      if (event.isOptimistic) {
        return helpers.updateQueryData(data => {
          const { tagLine } = event.payload
          return { ...data, tagLine }
        })
      } else return helpers.revalidateQuery()
    }
    case 'EMAIL_UPDATED': {
      if (event.isOptimistic) {
        return helpers.updateQueryData(data => {
          const { unverifiedEmail } = event.payload
          return { ...data, unverifiedEmail, isEmailVerified: false }
        })
      } else return helpers.revalidateQuery()
    }
    case 'EMAIL_VERIFIED': {
      return helpers.revalidateQuery()
    }
    case 'USERNAME_UPDATED': {
      if (event.isOptimistic) {
        return helpers.updateQueryData(data => {
          const { username } = event.payload
          return { ...data, username }
        })
      } else return helpers.revalidateQuery()
    }
    case 'EMAIL_VISIBILITY_CHANGED': {
      if (event.isOptimistic) {
        return helpers.updateQueryData(data => {
          const { showEmail } = event.payload
          return { ...data, showEmail }
        })
      } else return helpers.revalidateQuery()
    }
    case 'PHONE_UPDATED': {
      if (event.isOptimistic) {
        return helpers.updateQueryData(data => {
          const { phone } = event.payload
          return { ...data, phone }
        })
      } else return helpers.revalidateQuery()
    }
    case 'SHOP_URL_UPDATED': {
      if (event.isOptimistic) {
        return helpers.updateQueryData(data => {
          const { shopUrl } = event.payload
          return { ...data, shopUrl }
        })
      } else return helpers.revalidateQuery()
    }
    case 'FACEBOOK_LINK_UPDATED': {
      if (event.isOptimistic) {
        return helpers.updateQueryData(data => {
          const { facebook } = event.payload
          return { ...data, facebook }
        })
      } else return helpers.revalidateQuery()
    }
    case 'INSTAGRAM_LINK_UPDATED': {
      if (event.isOptimistic) {
        return helpers.updateQueryData(data => {
          const { instagram } = event.payload
          return { ...data, instagram }
        })
      } else return helpers.revalidateQuery()
    }
    case 'TWITTER_LINK_UPDATED': {
      if (event.isOptimistic) {
        return helpers.updateQueryData(data => {
          const { twitter } = event.payload
          return { ...data, twitter }
        })
      } else return helpers.revalidateQuery()
    }
    case 'FOLLOW_USER': {
      if (event.isOptimistic) {
        return helpers.updateQueryData(data => {
          return { ...data, isFollowed: true }
        })
      } else return helpers.revalidateQuery()
    }
    case 'UNFOLLOW_USER': {
      if (event.isOptimistic) {
        return helpers.updateQueryData(data => {
          return { ...data, isFollowed: false }
        })
      } else return helpers.revalidateQuery()
    }
  }
}

const queries = {
  getHomePageFeed: (queryPayload) => (criteria) => {
    const {
      onFetchHomePageFeed,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchHomePageFeed(finalCriteria)
        },
        payloadKey: `${queryPrefix}onFetchHomePageFeed(${finalCriteria.page})`,
        eventsToListenFor: [
          'EVENT_CREATED',
          'EVENT_UPDATED',
          'EVENT_DELETED',
          'TICKET_PURCHASED',
          'CUSTOM_TICKET_SOLD',
          'EVENT_REGISTERED_FOR',
          'EVENT_UNREGISTERED_FOR',
          'USER_INTERESTED_IN_EVENT',
          'USER_NOT_INTERESTED_IN_EVENT'
        ],
        shouldListenFor: (shouldListenForPayload) => {
          return true
        },
        listenFor: (listenerPayload) => {
          const {
            helpers,
            event
          } = listenerPayload

          if (event.isOptimistic) {
            switch (event.eventCode) {
              case 'EVENT_REGISTERED_FOR': {
                return helpers.updateQueryData(data => {
                  const { id } = event.actionPayload
                  const entries = data.entries.map(entry => {
                    if (entry.id === id) {
                      return {
                        ...entry,
                        userTicketsCount: 1,
                        hasTickets: true
                      }
                    }
                    return entry
                  })
                  return {
                    ...data,
                    entries
                  }
                })
              }
              case 'EVENT_UNREGISTERED_FOR': {
                return helpers.updateQueryData(data => {
                  const { id } = event.actionPayload
                  const entries = data.entries.map(entry => {
                    if (entry.id === id) {
                      return {
                        ...entry,
                        userTicketsCount: 0,
                        hasTickets: false
                      }
                    }
                    return entry
                  })
                  return {
                    ...data,
                    entries
                  }
                })
              }
              case 'USER_INTERESTED_IN_EVENT': {
                return helpers.updateQueryData(data => {
                  const { eventId } = event.actionPayload
                  const entries = data.entries.map(entry => {
                    if (entry.id === eventId) {
                      return {
                        ...entry,
                        interestedCount: entry.interestedCount + 1,
                        isInterested: true
                      }
                    }
                    return entry
                  })
                  return {
                    ...data,
                    entries
                  }
                })
              }
              case 'USER_NOT_INTERESTED_IN_EVENT': {
                return helpers.updateQueryData(data => {
                  const { eventId } = event.actionPayload
                  const entries = data.entries.map(entry => {
                    if (entry.id === eventId) {
                      return {
                        ...entry,
                        interestedCount: entry.interestedCount - 1,
                        isInterested: false
                      }
                    }
                    return entry
                  })
                  return {
                    ...data,
                    entries
                  }
                })
              }
            }
            return
          }
          switch (event.eventCode) {
            case 'EVENT_REGISTERED_FOR':
            case 'EVENT_UNREGISTERED_FOR':
            case 'USER_INTERESTED_IN_EVENT':
            case 'USER_NOT_INTERESTED_IN_EVENT':
          }
          return helpers.revalidateQuery()
        }
      }
    }, criteria)

    return ret
  },
  getForMeEvents: (queryPayload) => (criteria) => {
    const {
      onFetchForMeEvents,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      const { page, filters } = finalCriteria
      return {
        payload: {
          func: () => onFetchForMeEvents(finalCriteria)
        },
        payloadKey: `${queryPrefix}onFetchForMeEvents(${page}, ${filters})`,
        eventsToListenFor: [
          'EVENT_REGISTERED_FOR',
          'EVENT_UNREGISTERED_FOR',
          'USER_INTERESTED_IN_EVENT',
          'USER_NOT_INTERESTED_IN_EVENT',
          'EVENT_CREATED',
          'EVENT_UPDATED',
          'EVENT_DELETED'
        ],
        shouldListenFor: (shouldListenForPayload) => {
          return true
        },
        listenFor: (listenerPayload) => {
          const {
            helpers,
            event
          } = listenerPayload

          if (event.isOptimistic) {
            switch (event.eventCode) {
              case 'EVENT_REGISTERED_FOR': {
                return helpers.updateQueryData(data => {
                  const { id } = event.actionPayload
                  const entries = data.entries.map(entry => {
                    if (entry.id === id) {
                      return {
                        ...entry,
                        userTicketsCount: 1,
                        hasTickets: true
                      }
                    }
                    return entry
                  })
                  return {
                    ...data,
                    entries
                  }
                })
              }
              case 'EVENT_UNREGISTERED_FOR': {
                return helpers.updateQueryData(data => {
                  const { id } = event.actionPayload
                  const entries = data.entries.map(entry => {
                    if (entry.id === id) {
                      return {
                        ...entry,
                        userTicketsCount: 0,
                        hasTickets: false
                      }
                    }
                    return entry
                  })
                  return {
                    ...data,
                    entries
                  }
                })
              }
              case 'USER_INTERESTED_IN_EVENT': {
                return helpers.updateQueryData(data => {
                  const { eventId } = event.actionPayload
                  const entries = data.entries.map(entry => {
                    if (entry.id === eventId) {
                      return {
                        ...entry,
                        interestedCount: entry.interestedCount + 1,
                        isInterested: true
                      }
                    }
                    return entry
                  })
                  return {
                    ...data,
                    entries
                  }
                })
              }
              case 'USER_NOT_INTERESTED_IN_EVENT': {
                return helpers.updateQueryData(data => {
                  const { eventId } = event.actionPayload
                  const entries = data.entries.map(entry => {
                    if (entry.id === eventId) {
                      return {
                        ...entry,
                        interestedCount: entry.interestedCount - 1,
                        isInterested: false
                      }
                    }
                    return entry
                  })
                  return {
                    ...data,
                    entries
                  }
                })
              }
            }
            return
          }
          switch (event.eventCode) {
            case 'EVENT_REGISTERED_FOR':
            case 'EVENT_UNREGISTERED_FOR':
            case 'USER_INTERESTED_IN_EVENT':
            case 'USER_NOT_INTERESTED_IN_EVENT':
            case 'EVENT_CREATED':
            case 'EVENT_UPDATED':
            case 'EVENT_DELETED':
          }
          return helpers.revalidateQuery()
        }
      }
    }, criteria)

    return ret
  },
  getForMeEventsFilterCounts: ({ onFetchForMeEventsFilterCounts, queryPrefix }) => () => ({
    payload: {
      func: () => onFetchForMeEventsFilterCounts()
    },
    payloadKey: `${queryPrefix}onFetchForMeEventsFilterCounts()`,
    eventsToListenFor: [
      'EVENT_REGISTERED_FOR',
      'EVENT_UNREGISTERED_FOR',
      'USER_INTERESTED_IN_EVENT',
      'USER_NOT_INTERESTED_IN_EVENT'
    ],
    shouldListenFor: (shouldListenForPayload) => {
      return true
    },
    listenFor: (listenerPayload) => {
      const {
        helpers,
        event
      } = listenerPayload

      switch (event.eventCode) {
        case 'EVENT_REGISTERED_FOR':
        case 'EVENT_UNREGISTERED_FOR':
        case 'USER_INTERESTED_IN_EVENT':
        case 'USER_NOT_INTERESTED_IN_EVENT':
      }
      return helpers.revalidateQuery()
    }
  }),
  getEventCalendar: ({ onFetchEventCalendar, queryPrefix }) => ({ startDate, endDate }) => ({
    payload: {
      func: () => onFetchEventCalendar({ startDate, endDate })
    },
    payloadKey: `${queryPrefix}onFetchEventCalendar(${startDate},${endDate}})`,
    eventsToListenFor: [
      'EVENT_CREATED',
      'EVENT_UPDATED',
      'EVENT_DELETED',
      'TICKET_PURCHASED',
      'EVENT_REGISTERED_FOR',
      'EVENT_UNREGISTERED_FOR',
      'CUSTOM_TICKET_SOLD'
    ],
    shouldListenFor: (shouldListenForPayload) => {
      return true
    },
    listenFor: (listenerPayload) => {
      const {
        helpers
      } = listenerPayload

      return helpers.revalidateQuery()
    }
  }),
  getEvent: ({ onFetchEvent, queryPrefix }) => ({ id, withChat = false }) => ({
    payload: {
      func: () => onFetchEvent({ id, withChat })
    },
    params: {
      id: parseInt(id),
      withChat: !!withChat
    },
    payloadKey: `${queryPrefix}onFetchEvent(${id},${withChat})`,
    eventsToListenFor: [
      'EVENT_UPDATED',
      'EVENT_DELETED',
      'TICKET_PURCHASED',
      'CUSTOM_TICKET_SOLD',
      'EVENT_REGISTERED_FOR',
      'EVENT_UNREGISTERED_FOR'
    ],
    shouldListenFor: (shouldListenForPayload) => {
      const { params, actionPayload } = shouldListenForPayload
      return (params.id === actionPayload.id) || (params.id === actionPayload.eventId) // I hate this but I need to keep the API stable for now
    },
    listenFor: (listenerPayload) => {
      const {
        helpers,
        event,
        isMounted
      } = listenerPayload

      //   ret.isDigital && ret.hasTickets) return 'watch'
      // if (ret.isSoldOut) return 'sold_out'
      // if (ret.isCurrentlySellingTickets) return 'buy_tickets'
      // if (ret.isFree && !ret.hasTickets) return 'register'
      // if (ret.isFree && ret.hasTickets) return 'unregister'

      if (event.isOptimistic) {
        switch (event.eventCode) {
          case 'EVENT_REGISTERED_FOR': {
            return helpers.updateQueryData(data => {
              data.userTicketsCount = 1
              if (data.isDigital && data.isLive) {
                data.hasTickets = true
                data.hasInProgressActionWatch = true
              }
              return data
            })
          }
          case 'EVENT_UNREGISTERED_FOR': {
            return helpers.updateQueryData(data => {
              data.userTicketsCount = 0
              data.hasTickets = false
              return data
            })
          }
        }
        return
      }
      switch (event.eventCode) {
        case 'EVENT_UPDATED': {
          return helpers.updateAndRevalidateQuery(data => {
            return {
              ...data,
              ...listenerPayload.event.payload
            }
          })
        }
        case 'EVENT_REGISTERED_FOR':
        case 'EVENT_UNREGISTERED_FOR':
        case 'TICKET_PURCHASED': {
          return helpers.revalidateQuery()
        }
        case 'EVENT_DELETED': {
          if (!isMounted) return helpers.deleteCache()
        }
      }
    }
  }),
  getEventsHosting: (queryPayload) => (criteria) => {
    const { startDate: selectedDate } = criteria

    const {
      onFetchEventsHosting,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchEventsHosting(finalCriteria)
        },
        payloadKey: `${queryPrefix}onFetchEventsHosting(${selectedDate},${finalCriteria.page})`,
        params: {
          page: parseInt(finalCriteria.page),
          selectedDate: normalizeDate(selectedDate)
        },
        eventsToListenFor: [
          'EVENT_CREATED',
          'EVENT_UPDATED',
          'EVENT_DELETED'
        ],
        shouldListenFor: (shouldListenForPayload) => {
          return true
        },
        listenFor: (listenerPayload) => {
          const {
            helpers
          } = listenerPayload

          return helpers.revalidateQuery()
        }
      }
    }, criteria)

    return ret
  },
  getEventsHosted: (queryPayload) => (criteria) => {
    const { startDate: selectedDate } = criteria

    const {
      onFetchEventsHosted,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchEventsHosted(finalCriteria)
        },
        payloadKey: `${queryPrefix}onFetchEventsHosted(${selectedDate},${finalCriteria.page})`,
        params: {
          page: parseInt(finalCriteria.page),
          selectedDate: normalizeDate(selectedDate)
        },
        eventsToListenFor: [
          'EVENT_CREATED',
          'EVENT_UPDATED',
          'EVENT_DELETED'
        ],
        shouldListenFor: (shouldListenForPayload) => {
          return true
        },
        listenFor: (listenerPayload) => {
          const {
            helpers
          } = listenerPayload

          return helpers.revalidateQuery()
        }
      }
    }, criteria)

    return ret
  },
  getEventsAttending: (queryPayload) => (criteria) => {
    const { startDate: selectedDate } = criteria

    const {
      onFetchEventsAttending,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchEventsAttending(finalCriteria)
        },
        params: {
          page: parseInt(finalCriteria.page),
          selectedDate: normalizeDate(selectedDate)
        },
        payloadKey: `${queryPrefix}onFetchEventsAttending(${selectedDate},${finalCriteria.page})`,
        eventsToListenFor: [
          'TICKET_PURCHASED',
          'EVENT_REGISTERED_FOR',
          'EVENT_UNREGISTERED_FOR',
          'EVENT_UPDATED',
          'EVENT_DELETED'
        ],
        shouldListenFor: (shouldListenForPayload) => {
          return true
        },
        listenFor: (listenerPayload) => {
          const {
            helpers
          } = listenerPayload

          return helpers.revalidateQuery()
        }
      }
    }, criteria)

    return ret
  },
  getEventsAttended: (queryPayload) => (criteria) => {
    const { startDate: selectedDate } = criteria

    const {
      onFetchEventsAttended,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchEventsAttended(finalCriteria)
        },
        params: {
          page: parseInt(finalCriteria.page),
          selectedDate: normalizeDate(selectedDate)
        },
        payloadKey: `${queryPrefix}onFetchEventsAttended(${selectedDate},${finalCriteria.page})`,
        eventsToListenFor: [
          'TICKET_PURCHASED',
          'EVENT_REGISTERED_FOR',
          'EVENT_UNREGISTERED_FOR',
          'EVENT_UPDATED',
          'EVENT_DELETED',
          'CUSTOM_TICKET_SOLD'
        ],
        shouldListenFor: (shouldListenForPayload) => {
          return true
        },
        listenFor: (listenerPayload) => {
          const {
            helpers
          } = listenerPayload

          return helpers.revalidateQuery()
        }
      }
    }, criteria)

    return ret
  },
  getEventsHostingByUserId: (queryPayload) => (criteria) => {
    const { userId } = criteria

    const {
      onFetchEventsHostingByUserId,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchEventsHostingByUserId(finalCriteria)
        },
        payloadKey: `${queryPrefix}onFetchEventsHostingByUserId(${userId},${finalCriteria.page})`,
        eventsToListenFor: [
          'EVENT_CREATED',
          'EVENT_UPDATED',
          'EVENT_DELETED'
        ],
        shouldListenFor: (shouldListenForPayload) => {
          return true
        },
        listenFor: (listenerPayload) => {
          const {
            helpers
          } = listenerPayload

          return helpers.revalidateQuery()
        }
      }
    }, criteria)

    return ret
  },
  getEventsHostedByUserId: (queryPayload) => (criteria) => {
    const { userId } = criteria

    const {
      onFetchEventsHostedByUserId,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchEventsHostedByUserId(finalCriteria)
        },
        payloadKey: `${queryPrefix}onFetchEventsHostedByUserId(${userId},${finalCriteria.page})`,
        eventsToListenFor: [
          'EVENT_CREATED',
          'EVENT_UPDATED',
          'EVENT_DELETED'
        ],
        shouldListenFor: (shouldListenForPayload) => {
          return true
        },
        listenFor: (listenerPayload) => {
          const {
            helpers
          } = listenerPayload

          return helpers.revalidateQuery()
        }
      }
    }, criteria)

    return ret
  },
  getEventsAttendingByUserId: (queryPayload) => (criteria) => {
    const { userId } = criteria

    const {
      onFetchEventsAttendingByUserId,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchEventsAttendingByUserId(finalCriteria)
        },
        params: {
          userId: parseInt(userId),
          page: parseInt(finalCriteria.page)
        },
        payloadKey: `${queryPrefix}onFetchEventsAttendingByUserId(${userId},${finalCriteria.page})`,
        eventsToListenFor: [
          'TICKET_PURCHASED',
          'EVENT_REGISTERED_FOR',
          'EVENT_UNREGISTERED_FOR',
          'EVENT_UPDATED',
          'EVENT_DELETED'
        ],
        shouldListenFor: (shouldListenForPayload) => {
          return true
        },
        listenFor: (listenerPayload) => {
          const {
            helpers
          } = listenerPayload

          return helpers.revalidateQuery()
        }
      }
    }, criteria)

    return ret
  },
  getEventsAttendedByUserId: (queryPayload) => (criteria) => {
    const { userId } = criteria

    const {
      onFetchEventsAttendedByUserId,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchEventsAttendedByUserId(finalCriteria)
        },
        params: {
          userId: parseInt(userId),
          page: parseInt(finalCriteria.page)
        },
        payloadKey: `${queryPrefix}onFetchEventsAttendedByUserId(${userId},${finalCriteria.page})`,
        eventsToListenFor: [
          'TICKET_PURCHASED',
          'EVENT_REGISTERED_FOR',
          'EVENT_UNREGISTERED_FOR',
          'EVENT_UPDATED',
          'EVENT_DELETED',
          'CUSTOM_TICKET_SOLD'
        ],
        shouldListenFor: (shouldListenForPayload) => {
          return true
        },
        listenFor: (listenerPayload) => {
          const {
            helpers
          } = listenerPayload

          return helpers.revalidateQuery()
        }
      }
    }, criteria)

    return ret
  },
  getFeaturedItems: (queryPayload) => (criteria) => {
    const { userId } = criteria

    const {
      onFetchFeaturedItems,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchFeaturedItems(finalCriteria)
        },
        params: {
          userId: (userId === 'me' || !userId) ? 'me' : parseInt(userId),
          page: parseInt(finalCriteria.page)
        },
        payloadKey: `${queryPrefix}onFetchFeaturedItems(${userId},${finalCriteria.page})`,
        eventsToListenFor: [
          'FEATURED_ITEM_ADDED',
          'FEATURED_ITEM_DELETED'
        ],
        listenFor: (payload) => {
          const { event, helpers } = payload
          switch (event.eventCode) {
            case 'FEATURED_ITEM_ADDED': {
              return helpers.revalidateQuery()
            }
            case 'FEATURED_ITEM_DELETED': {
              if (event.isOptimistic) {
                return helpers.updateQueryData(data => {
                  return {
                    ...data,
                    entries: data.entries.filter(({ id }) => id !== event.payload.id)
                  }
                })
              }
              return helpers.revalidateQuery()
            }
          }
        }
      }
    }, criteria)

    return ret
  },
  getNotificationPreferences: ({ onFetchNotificationPreferences, queryPrefix }) => () => ({
    payload: {
      func: () => onFetchNotificationPreferences()
    },
    payloadKey: `${queryPrefix}onFetchNotificationPreference`,
    eventsToListenFor: [
      'NOTIFICATION_PREFERENCES_UPDATED'
    ],
    listenFor: (payload) => {
      const { event, helpers } = payload
      return helpers.updateQueryData(data => {
        return {
          ...data,
          ...event.actionPayload
        }
      })
      // post on this returns with data so no need to revalidate
    }
  }),
  getPrivacySettings: ({ onFetchPrivacySettings, queryPrefix }) => () => ({
    payload: {
      func: () => onFetchPrivacySettings()
    },
    payloadKey: `${queryPrefix}onFetchPrivacySettings`,
    eventsToListenFor: [
      'PRIVACY_SETTINGS_UPDATED'
    ],
    listenFor: (payload) => {
      const { event, helpers } = payload
      return helpers.updateQueryData(data => {
        return {
          ...data,
          ...event.actionPayload
        }
      })
      // no need to revalidate, post on this comes back with data
    }
  }),
  getCreditProfileInfo: ({ onFetchCreditProfileInfo, queryPrefix }) => (userId) => ({
    payload: {
      func: () => onFetchCreditProfileInfo(userId)
    },
    payloadKey: `${queryPrefix}onFetchCreditProfileInfo(${userId})`,
    eventsToListenFor: [
      'CREDITS_GIVEN'
    ],
    listenFor: (payload) => {
      const { event, helpers } = payload
      switch (event.eventCode) {
        case 'CREDITS_GIVEN': {
          return helpers.updateQueryData(data => {
            const ret = {
              ...data,
              numCredits: data.numCredits + event.payload.numCredits
            }
            return ret
          })
        }
      }
    }
  }),
  getCreditHistory: ({ onFetchCreditHistory, queryPrefix }) => (userId) => ({
    payload: {
      func: () => onFetchCreditHistory(userId)
    },
    payloadKey: `${queryPrefix}onFetchCreditHistory(${userId})`,
    eventsToListenFor: [
      'CREDITS_GIVEN'
    ],
    listenFor: (payload) => {
      const { event, helpers } = payload
      switch (event.eventCode) {
        case 'CREDITS_GIVEN': {
          return helpers.updateAndRevalidateQuery(data => {
            data.creditHistory.push(event.payload)
            return data
          })
        }
      }
    }
  }),
  getEventGroups: ({ onFetchEventGroups, queryPrefix }) => ({ userId } = {}) => ({
    payload: {
      func: () => onFetchEventGroups({ userId })
    },
    payloadKey: `${queryPrefix}onFetchEventGroups(${userId})`,
    eventsToListenFor: [
      'CREDITS_GIVEN'
    ],
    listenFor: (payload) => {
      const { event, helpers } = payload
      switch (event.eventCode) {
        case 'EVENT_GROUP_DELETED': {
          return helpers.updateQueryData(data => {
            return {
              entries: data.entries.filter(({ id }) => id !== event.payload.id)
            }
          })
        }
        case 'EVENT_GROUP_CREATED': {
          return helpers.updateQueryData(data => {
            return {
              entries: [...data.entries, event.payload]
            }
          })
        }
        case 'EVENT_GROUP_UPDATED': {
          return helpers.updateQueryData(data => {
            const finalEntries = data.entries.map(entry => {
              if (entry.id === payload.event.id) entry.title = payload.event.title
              return {
                entries: finalEntries
              }
            })
            return [...data.entries, event.payload]
          })
        }
      }
    }
  }),
  getPurchaseTicketDetails: ({ onFetchPurchaseTicketDetails, queryPrefix }) => ({ isUpgrading, eventId, numTickets, ticketType, creditsUsed }) => ({
    payload: {
      func: () => onFetchPurchaseTicketDetails({ isUpgrading, eventId, numTickets, ticketType, creditsUsed })
    },
    payloadKey: `${queryPrefix}onFetchPurchaseTicketDetails(${isUpgrading},${eventId},${numTickets},${ticketType},${creditsUsed}})`
  }),
  getEventHostTickets: ({ onFetchEventHostTickets, queryPrefix }) => ({ eventId, term, page }) => ({
    payload: {
      func: () => onFetchEventHostTickets({ eventId, term, page })
    },
    params: {
      eventId: parseInt(eventId),
      page: parseInt(page),
      term
    },
    payloadKey: `${queryPrefix}onFetchEventHostTickets(${eventId},${term},${page})`,
    eventsToListenFor: [
      'VIRTUAL_EVENT_TICKET_CHECKED_IN',
      'PHYSICAL_EVENT_TICKET_CHECKED_IN',
      'TICKET_UNCHECKED_IN',
      'TICKET_UPGRADED',
      'TICKET_TRANSFERRED',
      'TICKET_DIRECT_TRANSFERRED',
      'TICKET_RECLAIMED',
      'CREDENTIALS_ASSIGNED',
      'TICKET_REVOKED',
      'CUSTOM_TICKET_SOLD'
    ],
    shouldListenFor: (shouldListenForPayload) => {
      const { eventCode, getData, actionPayload } = shouldListenForPayload

      if (eventCode === 'CUSTOM_TICKET_SOLD') return true

      const data = getData()
      return data.entries.some(entry => entry.id === actionPayload.id)
    },
    listenFor: (listensForPayload) => {
      const { event, helpers } = listensForPayload
      switch (event.eventCode) {
        case 'PHYSICAL_EVENT_TICKET_CHECKED_IN':
        case 'VIRTUAL_EVENT_TICKET_CHECKED_IN': {
          if (event.isOptimistic) {
            const actionPayload = event.actionPayload
            return helpers.updateQueryData(data => {
              return {
                ...data,
                entries: data.entries.map(entry => {
                  const { id } = entry
                  if (id === actionPayload.id) {
                    return {
                      ...entry,
                      isCheckInable: false,
                      isCheckedIn: true,
                      ticketState: 'CHECKED_IN'
                    }
                  }
                  return entry
                })
              }
            })
          }
          return helpers.revalidateQuery()
        }
        case 'TICKET_UNCHECKED_IN': {
          if (event.isOptimistic) {
            const actionPayload = event.actionPayload
            return helpers.updateQueryData(data => {
              return {
                ...data,
                entries: data.entries.map(entry => {
                  const { id } = entry
                  if (id === actionPayload.id) {
                    return {
                      ...entry,
                      isCheckInable: true,
                      isCheckedIn: false,
                      ticketState: 'UNCHECKED_IN'
                    }
                  }
                  return entry
                })
              }
            })
          }
          return helpers.revalidateQuery()
        }
        case 'CREDENTIALS_ASSIGNED': {
          if (event.isOptimistic) {
            const actionPayload = event.actionPayload
            return helpers.updateQueryData(data => {
              return {
                ...data,
                entries: data.entries.map(entry => {
                  const { id, credentialsId } = actionPayload
                  if (entry.id === id) {
                    return {
                      ...entry,
                      credentialsId,
                      isSetCredentialsable: false,
                      ticketState: 'CREDENTIALS_SET'
                    }
                  }
                  return entry
                })
              }
            })
          }
          return helpers.revalidateQuery()
        }
      }
      return helpers.revalidateQuery()
    }
  }),
  getEventGuestTickets: ({ onFetchEventGuestTickets, queryPrefix }) => ({ eventId, term, page = 1 }) => {
    return {
      payload: {
        func: () => onFetchEventGuestTickets({ eventId, term: term, page })
      },
      params: {
        eventId: parseInt(eventId),
        term,
        page: parseInt(page)
      },
      payloadKey: `${queryPrefix}onFetchEventGuestTickets(${eventId},${term},${page})`,
      eventsToListenFor: [
        'TICKET_PURCHASED',
        'EVENT_REGISTERED_FOR',
        'EVENT_UNREGISTERED_FOR',
        'TICKET_UPGRADED',
        'TICKET_TRANSFERRED',
        'TICKET_RECLAIMED'
      ],
      shouldListenFor: (shouldListenForPayload) => {
        const { params, actionPayload } = shouldListenForPayload

        return (params.eventId === actionPayload.id) || (params.eventId === actionPayload.eventId)
      },
      listenFor: (listenerPayload) => {
        const {
          helpers
        } = listenerPayload

        return helpers.revalidateQuery()
      }
    }
  },
  getUserManagementSearchResults: ({ onFetchUserManagementSearchResults, queryPrefix }) => (searchTerm) => ({
    payload: {
      func: () => onFetchUserManagementSearchResults({ searchTerm })
    },
    payloadKey: `${queryPrefix}onFetchUserManagementSearchResults(${searchTerm})`
  }),
  getAttendeeSearchResults: ({ onFetchAttendeeSearchResults, queryPrefix }) => ({ searchTerm, startDate, endDate }) => ({
    payload: {
      func: () => onFetchAttendeeSearchResults({ searchTerm, startDate, endDate })
    },
    payloadKey: `${queryPrefix}onFetchAttendeeSearchResults({ ${searchTerm}, ${startDate}, ${endDate},)`
  }),
  getEventSearchResults: ({ onFetchEventSearchResults, queryPrefix }) => ({ term }) => ({
    payload: {
      func: () => onFetchEventSearchResults({ term })
    },
    payloadKey: `${queryPrefix}onFetchEventSearchResults(${term})`
  }),
  getUserSearchResults: ({ onFetchUserSearchResults, queryPrefix }) => ({ term, page = 1 }) => ({
    payload: {
      func: () => onFetchUserSearchResults({ term, page })
    },
    payloadKey: `${queryPrefix}onFetchUserSearchResults(${term},${page})`
  }),
  getNotifications: (queryPayload) => (criteria) => {
    const {
      onFetchNotifications,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchNotifications(finalCriteria)
        },
        payloadKey: `${queryPrefix}onFetchNotifications(${finalCriteria.page})`
      }
    }, criteria)

    return ret
  },
  getLanguageList: ({ onFetchLanguageList, queryPrefix }) => () => ({
    payload: onFetchLanguageList,
    payloadKey: `${queryPrefix}onFetchLanguageList`
  }),
  getBankList: ({ onFetchBankList, queryPrefix }) => () => ({
    payload: onFetchBankList,
    payloadKey: `${queryPrefix}onFetchBankList`
  }),
  getUserInfo: ({ onFetchUserInfo, queryPrefix }) => () => ({
    payload: {
      func: () => onFetchUserInfo()
    },
    payloadKey: `${queryPrefix}onFetchUserInfo`,
    eventsToListenFor: [
      'AVATAR_URL_UPDATED',
      'BANNER_URL_UPDATED',
      'USER_NAME_UPDATED',
      'TAGLINE_UPDATED',
      'EMAIL_UPDATED',
      'EMAIL_VERIFIED',
      'USERNAME_UPDATED',
      'EMAIL_VISIBILITY_CHANGED',
      'PHONE_UPDATED',
      'SHOP_URL_UPDATED',
      'FACEBOOK_LINK_UPDATED',
      'INSTAGRAM_LINK_UPDATED',
      'TWITTER_LINK_UPDATED'
    ],
    shouldListenFor: () => {
      return true
    },
    listenFor: (payload) => infoAndProfileListeners(payload)
  }),
  getUserProfile: ({ onFetchUserProfile, queryPrefix }) => ({ id }) => ({
    payload: {
      func: () => onFetchUserProfile({ id })
    },
    payloadKey: `${queryPrefix}onFetchUserProfile({${id}})`,
    eventsToListenFor: [
      'AVATAR_URL_UPDATED',
      'BANNER_URL_UPDATED',
      'USER_NAME_UPDATED',
      'TAGLINE_UPDATED',
      'EMAIL_UPDATED',
      'EMAIL_VERIFIED',
      'USERNAME_UPDATED',
      'EMAIL_VISIBILITY_CHANGED',
      'PHONE_UPDATED',
      'SHOP_URL_UPDATED',
      'FACEBOOK_LINK_UPDATED',
      'INSTAGRAM_LINK_UPDATED',
      'TWITTER_LINK_UPDATED',
      'FOLLOW_USER',
      'UNFOLLOW_USER'
    ],
    shouldListenFor: () => {
      return true
    },
    listenFor: (payload) => infoAndProfileListeners(payload)
  }),
  getUserPaymentMethods: ({ onFetchUserPaymentMethods, queryPrefix }) => () => ({
    payload: onFetchUserPaymentMethods,
    payloadKey: `${queryPrefix}onFetchUserPaymentMethods`,
    eventsToListenFor: [
      'BANK_ACCOUNT_ADDED',
      'BANK_ACCOUNT_DELETED',
      'CREDIT_CARD_ADDED',
      'CREDIT_CARD_DELETED',
      'CHANGE_PAYMENT_DEFAULT'
    ],
    shouldListenFor: () => {
      return true
    },
    listenFor: (payload) => {
      const { event, helpers } = payload
      switch (event.eventCode) {
        case 'BANK_ACCOUNT_ADDED': {
          return helpers.updateAndRevalidateQuery(data => {
            if (!event.payload.isDefault) {
              return {
                ...data,
                bankAccounts: [...data.bankAccounts, { ...event.payload }]
              }
            }
            const creditCardsNotDefaulted = data.creditCards.map(item => {
              return { ...item, isDefault: false }
            })
            const bankAccountsNotDefaulted = data.bankAccounts.map(item => {
              return { ...item, isDefault: false }
            })
            return {
              ...data,
              creditCards: creditCardsNotDefaulted,
              bankAccounts: [...bankAccountsNotDefaulted, { ...event.payload }]
            }
          })
        }
        case 'BANK_ACCOUNT_DELETED': {
          if (event.isOptimistic) {
            const { id } = event.payload
            return helpers.updateQueryData(data => {
              return {
                ...data,
                bankAccounts: data.bankAccounts.filter(acct => acct.id !== id)
              }
            })
          }
          return helpers.revalidateQuery()
        }
        case 'CREDIT_CARD_ADDED': {
          return helpers.updateAndRevalidateQuery(data => {
            if (!event.payload.isDefault) {
              return {
                ...data,
                creditCards: [...data.creditCards, { ...event.payload }]
              }
            }
            const creditCardsNotDefaulted = data.creditCards.map(item => {
              return { ...item, isDefault: false }
            })
            const bankAccountsNotDefaulted = data.bankAccounts.map(item => {
              return { ...item, isDefault: false }
            })
            return {
              ...data,
              creditCards: [...creditCardsNotDefaulted, { ...event.payload }],
              bankAccounts: bankAccountsNotDefaulted
            }
          })
        }
        case 'CREDIT_CARD_DELETED': {
          if (event.isOptimistic) {
            const { id } = event.payload
            return helpers.updateQueryData(data => {
              return {
                ...data,
                creditCards: data.creditCards.filter(card => card.id !== id)
              }
            })
          }
          return helpers.revalidateQuery()
        }
        case 'CHANGE_PAYMENT_DEFAULT': {
          if (event.isOptimistic) {
            return helpers.updateQueryData(data => {
              const creditCards = data.creditCards.map(item => {
                if (item.id === event.payload.id) return { ...item, isDefault: true }
                return { ...item, isDefault: false }
              })
              const bankAccounts = data.bankAccounts.map(item => {
                if (item.id === event.payload.id) return { ...item, isDefault: true }
                return { ...item, isDefault: false }
              })
              return {
                creditCards,
                bankAccounts
              }
            })
          }
          return helpers.revalidateQuery()
        }
      }
    }
  }),
  getUserPayoutMethods: ({ onFetchUserPayoutMethods, queryPrefix }) => () => ({
    payload: onFetchUserPayoutMethods,
    payloadKey: `${queryPrefix}onFetchUserPayoutMethods`,
    eventsToListenFor: [
      'PAYOUT_METHOD_ADDED',
      'CHANGE_PAYOUT_DEFAULT',
      'PAYOUT_METHOD_DELETED'
    ],
    shouldListenFor: () => {
      return true
    },
    listenFor: (listenForPayload) => {
      const { event, helpers } = listenForPayload
      switch (event.eventCode) {
        case 'PAYOUT_METHOD_ADDED': {
          return helpers.updateAndRevalidateQuery(data => {
            if (!event.payload.isDefault) {
              return {
                ...data,
                entries: [...data.entries, event.payload]
              }
            }
            const notDefaulted = data.entries.map(item => {
              return { ...item, isDefault: false }
            })
            return {
              ...data,
              entries: [...notDefaulted, event.payload]
            }
          })
        }
        case 'CHANGE_PAYOUT_DEFAULT': {
          if (event.isOptimistic) {
            return helpers.updateQueryData(data => {
              const ret = {
                ...data,
                entries: data.entries.map(item => {
                  if (item.id === event.payload.id) return { ...item, isDefault: true }
                  return { ...item, isDefault: false }
                })
              }
              return ret
            })
          }
          return helpers.revalidateQuery()
        }
        case 'PAYOUT_METHOD_DELETED': {
          if (event.isOptimistic) {
            return helpers.updateQueryData(data => {
              return {
                ...data,
                entries: data.entries.filter(({ id }) => id !== event.payload.id)
              }
            })
          }
          return helpers.revalidateQuery()
        }
      }
    }
  }),
  getSurveys: ({ onFetchSurveys, queryPrefix }) => (eventId) => ({
    payload: {
      func: () => onFetchSurveys(eventId)
    },
    payloadKey: `${queryPrefix}onFetchSurveys(${eventId})`,
    listenFor: (payload) => {
      const { event, helpers } = payload
      switch (event.eventCode) {
        case 'SURVEY_ADDED': {
          return helpers.updateQueryData(data => {
            data.unshift(event.payload.survey)
            return data
          })
        }
        case 'SURVEY_DELETED': {
          const { surveyId } = event.payload
          return helpers.updateQueryData(data => {
            return data.filter(survey => survey.id !== surveyId)
          })
        }
      }
    }
  }),
  getEventOverview: ({ onFetchEventOverview, queryPrefix }) => ({ eventId }) => ({
    payload: {
      func: () => onFetchEventOverview({ eventId })
    },
    params: {
      eventId: parseInt(eventId)
    },
    payloadKey: `${queryPrefix}onFetchEventOverview(${eventId})`,
    eventsToListenFor: [
      'VIRTUAL_EVENT_TICKET_CHECKED_IN',
      'PHYSICAL_EVENT_TICKET_CHECKED_IN',
      'TICKET_UNCHECKED_IN',
      'TICKET_UPGRADED',
      'TICKET_PURCHASED',
      'EVENT_REGISTERED_FOR',
      'EVENT_UNREGISTERED_FOR',
      'TICKET_REVOKED',
      'CUSTOM_TICKET_SOLD'
    ],
    shouldListenFor: (shouldListenForPayload) => {
      const { params, actionPayload } = shouldListenForPayload
      return (params.eventId === actionPayload.id) || (params.eventId === actionPayload.eventId)
    },
    listenFor: (listenerPayload) => {
      const {
        helpers
      } = listenerPayload

      return helpers.revalidateQuery()
    }
  }),
  getGuestListCounts: ({ onFetchGuestListCounts, queryPrefix }) => ({ eventId }) => ({
    payload: {
      func: () => onFetchGuestListCounts({ eventId })
    },
    params: {
      eventId: parseInt(eventId)
    },
    payloadKey: `${queryPrefix}onFetchGuestListCounts(${eventId})`,
    eventsToListenFor: [
      'TICKET_PURCHASED',
      'TICKET_REVOKED',
      'EVENT_REGISTERED_FOR',
      'EVENT_UNREGISTERED_FOR',
      'CUSTOM_TICKET_SOLD',
      'USER_INTERESTED_IN_EVENT',
      'USER_NOT_INTERESTED_IN_EVENT'
    ],
    shouldListenFor: (shouldListenForPayload) => {
      const { params, actionPayload } = shouldListenForPayload
      return (params.eventId === actionPayload.id) || (params.eventId === actionPayload.eventId)
    },
    listenFor: (listenerPayload) => {
      const {
        helpers
      } = listenerPayload

      return helpers.revalidateQuery()
    }
  }),
  getRevokeEventTicketRefundBreakdown: ({ onFetchRevokeEventTicketRefundBreakdown, queryPrefix }) => ({ id }) => ({
    payload: {
      func: () => onFetchRevokeEventTicketRefundBreakdown({ id })
    },
    payloadKey: `${queryPrefix}onFetchRevokeEventTicketRefundBreakdown(${id})`
  }),
  getEventMessages: (queryPayload) => ({ eventId, page = 1 }) => {
    const {
      onFetchEventMessages,
      queryPrefix,
      helpers: {
        services: {
          kwivrrApi
        }
      }
    } = queryPayload

    return ({
      payload: {
        func: () => onFetchEventMessages({ eventId, page })
      },
      params: {
        eventId: parseInt(eventId),
        page: parseInt(page)
      },
      payloadKey: `${queryPrefix}onFetchEventMessages(${eventId},${page})`,
      eventsToListenFor: [
        'EVENT_MESSAGE_ADDED'
      ],
      shouldListenFor: (shouldListenForPayload) => {
        const { params, actionPayload } = shouldListenForPayload
        return params.eventId === actionPayload.eventId
      },
      listenFor: (payload) => {
        const { event, helpers } = payload
        switch (event.eventCode) {
          case 'EVENT_MESSAGE_ADDED': {
            const message = kwivrrApi.normalizeEventMessage(event.payload)
            return helpers.updateQueryData(data => {
              data.entries.push(message)
              return data
            })
          }
        }
      }
    })
  },
  getLivestreamViewers: ({ onFetchLivestreamViewers, queryPrefix }) => (eventId) => ({
    payload: {
      func: () => onFetchLivestreamViewers(eventId)
    },
    payloadKey: `${queryPrefix}onFetchLivestreamViewers(${eventId})`
  }),
  getEventAttendees: (queryPayload) => ({ eventId, page = 1 }) => {
    const {
      onFetchEventAttendees,
      queryPrefix
    } = queryPayload

    return ({
      payload: {
        func: () => onFetchEventAttendees({ eventId, page })
      },
      params: {
        eventId: parseInt(eventId),
        page: parseInt(page)
      },
      eventsToListenFor: [
        'EVENT_ATTENDEE_STATUS',
        'ATTENDEE_BANNED',
        'ATTENDEE_UNBANNED',
        'ATTENDEE_BLOCKED',
        'ATTENDEE_UNBLOCKED'
      ],
      shouldListenFor: (shouldListenForPayload) => {
        const { params, actionPayload } = shouldListenForPayload
        return params.eventId === actionPayload.eventId
      },
      payloadKey: `${queryPrefix}onFetchEventAttendees(${eventId},${page})`,
      listenFor: (listensForPayload) => {
        const { event, helpers } = listensForPayload
        switch (event.eventCode) {
          case 'EVENT_ATTENDEE_STATUS': {
            const member = event.payload.eventAttendee
            return helpers.updateAndRevalidateQuery(data => {
              const newEntries = data.entries.map(m => {
                if (m.userId === member.userId) return member
                return m
              })
              data.entries = newEntries
              return data
            })
          }
          case 'ATTENDEE_BANNED': {
            if (event.isOptimistic) {
              const actionPayload = event.actionPayload
              return helpers.updateQueryData(data => {
                const newEntries = data.entries.map(m => {
                  if (m.userId === actionPayload.userId) {
                    m.isBanned = true
                  }
                  return m
                })
                data.entries = newEntries
                return data
              })
            }
            return helpers.revalidateQuery()
          }
          case 'ATTENDEE_UNBANNED': {
            if (event.isOptimistic) {
              const actionPayload = event.actionPayload
              return helpers.updateQueryData(data => {
                const newEntries = data.entries.map(m => {
                  if (m.userId === actionPayload.userId) {
                    m.isBanned = false
                  }
                  return m
                })
                data.entries = newEntries
                return data
              })
            }
            return helpers.revalidateQuery()
          }
          case 'ATTENDEE_BLOCKED': {
            if (event.isOptimistic) {
              const actionPayload = event.actionPayload
              return helpers.updateQueryData(data => {
                const newEntries = data.entries.map(m => {
                  if (m.userId === actionPayload.userId) {
                    m.isBlocked = true
                  }
                  return m
                })
                data.entries = newEntries
                return data
              })
            }
            return helpers.revalidateQuery()
          }
          case 'ATTENDEE_UNBLOCKED': {
            if (event.isOptimistic) {
              const actionPayload = event.actionPayload
              return helpers.updateQueryData(data => {
                const newEntries = data.entries.map(m => {
                  if (m.userId === actionPayload.userId) {
                    m.isBlocked = false
                  }
                  return m
                })
                data.entries = newEntries
                return data
              })
            }
            return helpers.revalidateQuery()
          }
        }
      }
    })
  },
  getEventTicketHistory: ({ onFetchEventTicketHistory, queryPrefix }) => ({ id }) => ({
    payload: {
      func: () => onFetchEventTicketHistory({ id })
    },
    payloadKey: `${queryPrefix}onFetchEventTicketHistory(${id})`
  }),
  getEventTicket: ({ onFetchEventTicket, queryPrefix }) => ({ id }) => ({
    payload: {
      func: () => onFetchEventTicket({ id })
    },
    payloadKey: `${queryPrefix}onFetchEventTicket(${id})`
  }),
  getCreditBalance: ({ onFetchCreditBalance, queryPrefix }) => () => ({
    payload: {
      func: () => onFetchCreditBalance()
    },
    payloadKey: `${queryPrefix}onFetchCreditBalance`
  }),
  getClaimEventTicketDetails: ({ onFetchClaimEventTicketDetails, queryPrefix }) => (payload) => ({
    payload: {
      func: () => onFetchClaimEventTicketDetails(payload)
    },
    payloadKey: `${queryPrefix}onFetchClaimEventTicketDetails`
  }),
  getEventSpeakers: ({ onFetchEventSpeakers, queryPrefix }) => (payload) => ({
    payload: {
      func: () => onFetchEventSpeakers(payload)
    },
    params: {
      id: parseInt(payload.id)
    },
    payloadKey: `${queryPrefix}onFetchEventSpeakers(${payload.id})`,
    eventsToListenFor: [
      'EVENT_SPEAKER_ADDED',
      'EVENT_SPEAKER_UPDATED',
      'EVENT_SPEAKER_DELETED'
    ],
    shouldListenFor: (shouldListenForPayload) => {
      const { params, actionPayload } = shouldListenForPayload
      return params.id === actionPayload.eventId
    },
    listenFor: (listenerPayload) => {
      const { event, helpers } = listenerPayload

      // ok, so we are dealing with a query related to our event
      switch (event.eventCode) {
        case 'EVENT_SPEAKER_ADDED': {
          return helpers.updateAndRevalidateQuery(data => {
            const newEventSpeaker = event.payload
            return {
              ...data,
              entries: [...data.entries, newEventSpeaker]
            }
          })
        }
        case 'EVENT_SPEAKER_UPDATED': {
          if (event.isOptimistic) {
            return helpers.updateQueryData(data => {
              // we can't get the new speaker details here, so this may be temporarily incorrect if speaker changes
              const finalEntries = data.entries.map(entry => {
                if (entry.eventSpeakerJoinId !== event.payload.eventSpeakerJoinId) return entry
                return {
                  ...entry,
                  ...event.payload
                }
              })

              return {
                ...data,
                entries: finalEntries
              }
            })
          } else {
            // after we return, we should get the new speaker back and since we can't be sure the optimistic update
            // was accurate, we want to still do a quick update here
            return helpers.updateAndRevalidateQuery(data => {
              const finalEntries = data.entries.map(entry => {
                if (entry.eventSpeakerJoinId !== event.payload.eventSpeakerJoinId) return entry
                return event.payload
              })

              return {
                ...data,
                entries: finalEntries
              }
            })
          }
        }
        case 'EVENT_SPEAKER_DELETED': {
          if (event.isOptimistic) {
            return helpers.updateQueryData(data => {
              return {
                ...data,
                entries: data.entries.filter(({ eventSpeakerJoinId }) => eventSpeakerJoinId !== event.payload.eventSpeakerJoinId)
              }
            })
          } else return helpers.revalidateQuery()
        }
      }
    }
  }),
  getTicketingTypes: ({ onFetchTicketingTypes, queryPrefix }) => (payload) => ({
    payload: {
      func: () => onFetchTicketingTypes(payload)
    },
    params: {
      id: parseInt(payload.id)
    },
    payloadKey: `${queryPrefix}onFetchTicketingTypes(${payload.id})`,
    eventsToListenFor: [
      'TICKETING_TYPE_CREATED',
      'TICKETING_TYPE_UPDATED',
      'TICKETING_TYPE_DELETED'
    ],
    shouldListenFor: (shouldListenForPayload) => {
      const { params, actionPayload } = shouldListenForPayload
      return params.id === actionPayload.eventId
    },
    listenFor: (listenerPayload) => {
      const { event, helpers } = listenerPayload

      // ok, so we are dealing with a query related to our event
      switch (event.eventCode) {
        case 'TICKETING_TYPE_CREATED': {
          return helpers.updateAndRevalidateQuery(data => {
            const newTicketingType = event.payload
            const newEntries = [...data.entries, newTicketingType]
            const sortedEntries = newEntries.sort((a, b) => a.price - b.price)

            return {
              ...data,
              entries: sortedEntries
            }
          })
        }
        case 'TICKETING_TYPE_UPDATED': {
          if (event.isOptimistic) {
            return helpers.updateQueryData(data => {
              const newEntries = data.entries.map(entry => {
                if (entry.id !== event.payload.id) return entry
                return {
                  ...entry,
                  ...event.payload
                }
              })

              const sortedEntries = newEntries.sort((a, b) => a.price - b.price)

              return {
                ...data,
                entries: sortedEntries
              }
            })
          } else {
            return helpers.updateAndRevalidateQuery(data => {
              const newEntries = data.entries.map(entry => {
                if (entry.id !== event.payload.id) return entry
                return event.payload
              })

              const sortedEntries = newEntries.sort((a, b) => a.price - b.price)

              return {
                ...data,
                entries: sortedEntries
              }
            })
          }
        }
        case 'TICKETING_TYPE_DELETED': {
          if (event.isOptimistic) {
            return helpers.updateQueryData(data => {
              return {
                ...data,
                entries: data.entries.filter(({ id }) => id !== event.payload.id)
              }
            })
          } else return helpers.revalidateQuery()
        }
      }
    }
  }),
  getAddons: ({ onFetchAddons, queryPrefix }) => (payload) => ({
    payload: {
      func: () => onFetchAddons(payload)
    },
    params: {
      id: parseInt(payload.id)
    },
    payloadKey: `${queryPrefix}onFetchAddons(${payload.id})`,
    eventsToListenFor: [
      'ADDON_CREATED',
      'ADDON_UPDATED',
      'ADDON_DELETED'
    ],
    shouldListenFor: (shouldListenForPayload) => {
      const { params, actionPayload } = shouldListenForPayload
      return params.id === actionPayload.eventId
    },
    listenFor: (listenerPayload) => {
      const { event, helpers } = listenerPayload

      // ok, so we are dealing with a query related to our event
      switch (event.eventCode) {
        case 'ADDON_CREATED': {
          return helpers.updateAndRevalidateQuery(data => {
            const newAddon = event.payload
            const newEntries = [...data.entries, newAddon]
            const sortedEntries = newEntries.sort((a, b) => a.price - b.price)

            return {
              ...data,
              entries: sortedEntries
            }
          })
        }
        case 'ADDON_UPDATED': {
          if (event.isOptimistic) {
            return helpers.updateQueryData(data => {
              const newEntries = data.entries.map(entry => {
                if (entry.id !== event.payload.id) return entry
                return {
                  ...entry,
                  ...event.payload
                }
              })

              const sortedEntries = newEntries.sort((a, b) => a.price - b.price)

              return {
                ...data,
                entries: sortedEntries
              }
            })
          } else {
            return helpers.updateAndRevalidateQuery(data => {
              const newEntries = data.entries.map(entry => {
                if (entry.id !== event.payload.id) return entry
                return event.payload
              })

              const sortedEntries = newEntries.sort((a, b) => a.price - b.price)

              return {
                ...data,
                entries: sortedEntries
              }
            })
          }
        }
        case 'ADDON_DELETED': {
          if (event.isOptimistic) {
            return helpers.updateQueryData(data => {
              return {
                ...data,
                entries: data.entries.filter(({ id }) => id !== event.payload.id)
              }
            })
          } else return helpers.revalidateQuery()
        }
      }
    }
  }),
  getUpgradeEventTicketDetails: ({ onFetchUpgradeEventTicketDetails, queryPrefix }) => (payload) => ({
    payload: {
      func: () => onFetchUpgradeEventTicketDetails(payload)
    },
    params: {
      id: parseInt(payload.id)
    },
    payloadKey: `${queryPrefix}onFetchUpgradeEventTicketDetails(${payload.id})`
  }),
  getEventManagers: (queryPayload) => (criteria) => {
    criteria.eventId = parseInt(criteria.eventId)
    const { eventId } = criteria
    const {
      onFetchEventManagers,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchEventManagers(finalCriteria)
        },
        params: {
          eventId: parseInt(eventId),
          page: parseInt(finalCriteria.page)
        },
        payloadKey: `${queryPrefix}onFetchEventManagers(${eventId},${finalCriteria.page})`,
        eventsToListenFor: [
          'EVENT_MANAGER_ADDED',
          'EVENT_MANAGER_DELETED'
        ],
        shouldListenFor: (shouldListenForPayload) => {
          const { params, actionPayload } = shouldListenForPayload
          return params.eventId === actionPayload.eventId
        },
        listenFor: (listenForPayload) => {
          const { event, helpers } = listenForPayload
          switch (event.eventCode) {
            case 'EVENT_MANAGER_ADDED': {
              return helpers.updateAndRevalidateQuery(data => {
                const newAdmin = event.payload
                return {
                  ...data,
                  entries: [...data.entries, newAdmin]
                }
              })
            }
            case 'EVENT_MANAGER_DELETED': {
              if (event.isOptimistic) {
                return helpers.updateQueryData(data => {
                  const finalEntries = data.entries.filter(({ id }) => id !== event.payload.userId)
                  return {
                    ...data,
                    entries: finalEntries
                  }
                })
              }
              return helpers.revalidateQuery()
            }
          }
        }
      }
    }, criteria)

    return ret
  },
  getRegisteredGuests: (queryPayload) => (criteria) => {
    criteria.eventId = parseInt(criteria.eventId)
    const { eventId } = criteria
    const {
      onFetchRegisteredGuests,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchRegisteredGuests(finalCriteria)
        },
        params: {
          eventId: parseInt(eventId),
          page: parseInt(finalCriteria.page)
        },
        payloadKey: `${queryPrefix}onFetchRegisteredGuests(${eventId},${finalCriteria.page})`,
        eventsToListenFor: [
          'EVENT_REGISTERED_FOR',
          'EVENT_UNREGISTERED_FOR'
        ],
        shouldListenFor: (shouldListenForPayload) => {
          const { params, actionPayload } = shouldListenForPayload
          return params.eventId === actionPayload.eventId
        },
        listenFor: (listensForPayload) => {
          const { event, helpers } = listensForPayload
          switch (event.eventCode) {
            case 'EVENT_REGISTERED_FOR':
            case 'EVENT_UNREGISTERED_FOR': {
              return helpers.revalidateQuery()
            }
          }
        }
      }
    }, criteria)

    return ret
  },
  getInterestedGuests: (queryPayload) => (criteria) => {
    criteria.eventId = parseInt(criteria.eventId)
    const { eventId } = criteria
    const {
      onFetchInterestedGuests,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchInterestedGuests(finalCriteria)
        },
        params: {
          eventId: parseInt(eventId),
          page: parseInt(finalCriteria.page)
        },
        payloadKey: `${queryPrefix}onFetchInterestedGuests(${eventId},${finalCriteria.page})`,
        eventsToListenFor: [
          'USER_INTERESTED_IN_EVENT',
          'USER_NOT_INTERESTED_IN_EVENT'
        ],
        shouldListenFor: (shouldListenForPayload) => {
          const { params, actionPayload } = shouldListenForPayload
          return params.eventId === actionPayload.eventId
        },
        listenFor: (listensForPayload) => {
          const { event, helpers } = listensForPayload
          switch (event.eventCode) {
            case 'USER_INTERESTED_IN_EVENT':
            case 'USER_NOT_INTERESTED_IN_EVENT': {
              return helpers.revalidateQuery()
            }
          }
        }
      }
    }, criteria)

    return ret
  },
  getAttendanceReport: (queryPayload) => (criteria) => {
    const { searchTerm, startDate, endDate } = criteria
    const {
      onFetchAttendanceReport,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchAttendanceReport(finalCriteria)
        },
        params: {
          searchTerm,
          startDate,
          endDate,
          page: parseInt(finalCriteria.page)
        },
        payloadKey: `${queryPrefix}onFetchAttendanceReport(${searchTerm},${startDate},${endDate},${finalCriteria.page})`
      }
    }, criteria)

    return ret
  },
  getUsersReport: (queryPayload) => (criteria) => {
    const { searchTerm } = criteria
    const {
      onFetchUsersReport,
      queryPrefix
    } = queryPayload

    const ret = decoratePageableQuery(finalCriteria => {
      return {
        payload: {
          func: () => onFetchUsersReport(finalCriteria)
        },
        params: {
          searchTerm,
          page: parseInt(finalCriteria.page)
        },
        payloadKey: `${queryPrefix}onFetchUsersReport(${searchTerm},${finalCriteria.page})`
      }
    }, criteria)

    return ret
  }
}

export default queries
