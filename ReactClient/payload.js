import PropTypes from 'prop-types'

const payload = {
  lzSelector: {
    defaultValue: '#saturn-app-lz-pe-LMS'
  },
  verticalPreview: {
    defaultValue: true
  },
  lzStyle: {
    playgroundValue: {
      flex: 1
    }
  },
  adaptorId: {
    playgroundValue: 'playgroundAdaptor',
    livePlaygroundValue: 'saturnCoreAdaptor'
  },
  userEvents: {
    description: 'Events the user has active tickets for',
    isRequired: true,
    isPublic: true,
    defaultValue: [
      {
        id: 6,
        numTickets: 5
      },
      {
        id: 8,
        numTickets: 2
      },
      {
        id: 10,
        numTickets: 4
      },
      {
        id: 16,
        numTickets: 1
      },
      {
        id: 18,
        numTickets: 27
      }
    ],
    propType: PropTypes.func
  },
  onFetchEvents: {
    description: 'Callback to fetch list of events.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchHomePageFeed: {
    description: 'Callback to fetch home page feed.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEvent: {
    description: 'Single event details for EventPage.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchUserInfo: {
    description: 'Callback to fetch user info.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventsHosting: {
    description: 'Callback to fetch events hosting.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventsHosted: {
    description: 'Callback to fetch events hosted.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventsAttending: {
    description: 'Callback to fetch events attending.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventsAttended: {
    description: 'Callback to fetch events attended.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventsHostingByUserId: {
    description: 'Callback to fetch public profile events hosting.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventsHostedByUserId: {
    description: 'Callback to fetch public profile events hosted.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventsAttendingByUserId: {
    description: 'Callback to fetch public profile events attending.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventsAttendedByUserId: {
    description: 'Callback to fetch public profile events attended.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventCalendar: {
    description: 'Callback to fetch event calendar.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchFeaturedItems: {
    description: 'Callback to fetch public profile products.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchCreditProfileInfo: {
    description: 'Callback to fetch credit profile info.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchCreditHistory: {
    description: 'Callback to fetch credit history.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchMyEvents: {
    description: 'Callback to fetch the events the user has tickets for.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchPurchaseTicketDetails: {
    description: 'Callback to fetch the ticket purchase details for an event.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchLanguageList: {
    description: 'Callback to fetch list of languages to choose from.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchBankList: {
    description: 'Callback to fetch list of banks to choose from.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventHostTickets: {
    description: 'Callback to fetch the ticket details for an event host user is hosting.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventGuestTickets: {
    description: 'Callback to fetch the ticket details for an event guest user is hosting.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventSearchResults: {
    description: 'Callback to fetch list of event search results.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchCreditBalance: {
    description: 'Callback to fetch user credit balance.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchUserManagementSearchResults: {
    description: 'Callback to fetch list of search results for the "User Management" tab.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchAttendeeSearchResults: {
    description: 'Callback to fetch list of search results for the "Attendee History Report" tab.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchUserSearchResults: {
    description: 'Callback to fetch list of user search results.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchNotifications: {
    description: 'Callback to fetch list of notifications.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  userFullName: {
    description: 'Full name of user.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.string,
    playgroundValue: 'Megan Hendricks'
  },
  onChangeUserAvatar: {
    description: 'Callback to save new user avatar.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onChangeUserName: {
    description: 'Callback to save new user name.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onChangeUserEmail: {
    description: 'Callback to save new user email.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onChangeUserUsername: {
    description: 'Callback to save new user username.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onChangeEmailVisibility: {
    description: 'Callback to save new email visibility.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onChangeUserTagline: {
    description: 'Callback to save new user tagline.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onChangeUserPassword: {
    description: 'Callback to save new user password.',
    isRequired: true,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onSearch: {
    description: 'What happens when a search term is submitted.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onSearchSubmit: {
    description: 'What happens when a search term is submitted.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onSellCustomEventTickets: {
    description: 'Callback to sell custom event tickets',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onSearchSpeakerProfilesAndUsers: {
    description: 'Callback to search speakers',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onAddSpeakerProfile: {
    description: 'Callback to add a speaker profile',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onSearchUsers: {
    description: 'Callback to search users',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onTransferEventTicket: {
    description: 'Callback to transfer a ticket',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onReclaimEventTicket: {
    description: 'Callback to reclaim a ticket',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onAssignCredentialId: {
    description: 'Callback to assign credential id',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onRevokeEventTicket: {
    description: 'Callback to revoke (and optionally refund) a ticket.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onCheckInPhysicalEventTicket: {
    description: 'Callback to check in a physical ticket.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onCheckInVirtualEventTicket: {
    description: 'Callback to check in a virtual event ticket.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onUncheckInEventTicket: {
    description: 'Callback to uncheck in a ticket.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onUpgradeTicket: {
    description: 'Callback to upgrade a ticket.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onAddFeaturedItem: {
    description: 'Callback to add a new featured item to user\'s shop.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onAddEventMessage: {
    description: 'Callback to add a new event message to the chat.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onStartEventStream: {
    description: 'Callback to start stream.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onProvisionStream: {
    description: 'Callback to provision stream variants.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onDeprovisionStream: {
    description: 'Callback to deprovision stream variants.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onEndEventStream: {
    description: 'Callback to end stream.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  c: {
    description: 'Callback to get event messages for the chat.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchSurveys: {
    description: 'Callback to fetch the surveys linked to a particular event.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventOverview: {
    description: 'Callback to fetch the surveys linked to a particular event.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchUserPaymentMethods: {
    description: 'Callback to fetch the user\'s payment methods.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchUserPayoutMethods: {
    description: 'Callback to fetch the user\'s payout methods.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchLivestream: {
    description: 'Callback to fetch a specific livestream.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onAddPayoutMethod: {
    description: 'Callback to add a payout method.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onDeletePayoutMethod: {
    description: 'Callback to delete a payout method.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onDeleteEventManager: {
    description: 'Callback to delete an event manager.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventTicketHistory: {
    description: 'Callback to get a ticket\'s history.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventTicket: {
    description: 'Callback to view ticket.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onChangePayoutMethodDefault: {
    description: 'Callback to set a new default payout method.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onChangePaymentMethodDefault: {
    description: 'Callback to set a new default payout method.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchLivestreamViewers: {
    description: 'Callback to fetch a specific livestream viewers.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchEventAttendees: {
    description: 'Callback to fetch a specific livestream viewers.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onAddCreditCard: {
    description: 'Callback to add a new credit card.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onAddBankAccount: {
    description: 'Callback to add a new bank account.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onAddSurvey: {
    description: 'Callback to add a new survey.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onDeleteSurvey: {
    description: 'Callback to delete a survey.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onDeleteCreditCard: {
    description: 'Callback to delete a credit card.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onDeleteBankAccount: {
    description: 'Callback to delete a bank account.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onCreateUser: {
    description: 'Callback to create a Kwivrr account.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchNotificationPreferences: {
    description: 'Callback to fetch a user\'s notification preferences.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onUpdateNotificationPreferences: {
    description: 'Callback to update a user\'s notification preferences.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onAddToWaitlist: {
    description: 'Callback to add user to an event\'s waitlist.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchClaimEventTicketDetails: {
    description: 'Callback to get event ticket details for claim page.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onClaimEventTicket: {
    description: 'Callback for a user to claim an event ticket.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  showingBankAccount: {
    description: 'Display bank account functionality?',
    isRequired: false,
    isPublic: true,
    defaultValue: false,
    propType: PropTypes.bool
  },
  hasSurveyFunctionality: {
    description: 'Boolean for whether or not surveys are used',
    isRequired: false,
    isPublic: true,
    defaultValue: false,
    propType: PropTypes.bool
  },
  hasAdminSearch: {
    description: 'Boolean for whether or not to show admin search features as needed.',
    isRequired: false,
    isPublic: true,
    defaultValue: true,
    propType: PropTypes.bool
  },
  hasEventGroupsFunctionality: {
    description: 'Boolean for whether or not to enable event groups functionality.',
    isRequired: false,
    isPublic: true,
    defaultValue: false,
    propType: PropTypes.bool
  },
  onFetchEventSpeakers: {
    description: 'Callback to fetch event speakers',
    isRequired: false,
    isPublic: true,
    defaultValue: false,
    propType: PropTypes.func
  },
  onCloneEvent: {
    description: 'Callback to clone an existing event, expects a new title.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchRevokeEventTicketRefundBreakdown: {
    description: 'Callback to fetch details for a refund request.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onAddEventSpeaker: {
    description: 'Callback to add event speaker.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onDeleteEventSpeaker: {
    description: 'Callback to delete event speaker.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onUpdateEventSpeaker: {
    description: 'Callback to update event speaker.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchTicketingTypes: {
    description: 'Callback to get ticketing types.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onCreateTicketingType: {
    description: 'Callback to create a ticketing type.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onUpdateTicketingType: {
    description: 'Callback to update a ticketing type.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onDeleteTicketingType: {
    description: 'Callback to delete a ticketing type.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onFetchAddons: {
    description: 'Callback to get addons.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onCreateAddon: {
    description: 'Callback to create an addon.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onUpdateAddon: {
    description: 'Callback to update an addon.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onDeleteAddon: {
    description: 'Callback to delete an addon.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onSSOLogin: {
    description: 'Callback for SSO Login request.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onDeleteEvent: {
    description: 'Callback for deleting event.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onRegisterForEvent: {
    description: 'Callback to register for an event.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onUnregisterForEvent: {
    description: 'Callback to unregister for an event.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  },
  onLoginWithFirebase: {
    description: 'Callback to login with firebase.',
    isRequired: false,
    isPublic: true,
    defaultValue: undefined,
    propType: PropTypes.func
  }
}

export default payload
