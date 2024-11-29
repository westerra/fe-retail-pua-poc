import { environment } from '../../environments/environment';

export const canViewManageNotificationsForActions =
  'ProductSummary.ProductSummary.view AND Actions.ManageActionRecipes.view';
export const canViewManageNotificationsForEngagements =
  'ProductSummary.ProductSummary.view AND CommunicationPreferences.GeneralNotificationPreferences.view AND CommunicationPreferences.GeneralNotificationPreferences.create AND CommunicationPreferences.GeneralNotificationPreferences.edit';

export const setNotificationPreference = (preference: string) => {
  return preference === 'actions' ? canViewManageNotificationsForActions : canViewManageNotificationsForEngagements;
};

export const PERMISSIONS = {
  canViewBillPaySso: 'Billpay.BillpaySSO.create',
  canCreateA2A: 'Payments.A2ATransfer.create',
  canViewMyAccounts: 'ProductSummary.ProductSummary.view OR ProductSummary.ProductSummary.edit',
  canViewTransfers:
    'Payments.A2ATransfer.view OR Payments.SEPACT.view AND ProductSummary.ProductSummary.view',
  canViewMakeTransfer: 'Payments.A2ATransfer.view OR Payments.SEPACT.view AND ProductSummary.ProductSummary.view',
  canViewTransferToMember: 'Payments.A2ATransfer.view OR Payments.SEPACT.view AND ProductSummary.ProductSummary.view',
  canViewTransferToSomeone: 'Payments.A2ATransfer.view OR Payments.SEPACT.view AND ProductSummary.ProductSummary.view',
  canViewScheduledTransfers: 'Payments.A2ATransfer.view OR Payments.SEPACT.view',
  canViewConnectedAccounts: 'Payments.A2ATransfer.view',
  canViewBillPay:
    'Contacts.USBillpayPayees.view OR Payments.USBillpayPayments.view AND Contacts.USBillpayPayees-Search.execute AND Contacts.USBillpayPayees-Summary.view',
  canViewPayABill: 'Contacts.USBillpayPayees.view OR Payments.USBillpayPayments.view',
  canViewPendingPayments: 'Payments.USBillpayPayments.view',
  canViewHistoryPayments: 'Payments.USBillpayPayments.view',
  canViewTransactionsAnalytics: 'Transactions.Transactions.view',
  canViewSelfService:
    'ProductSummary.ProductSummary.view OR UserProfiles.ManageUserProfiles.view OR User.ManageAuthorizedUsers.view OR PersonalFinanceManagement.ManageCards.view OR Payments.StopChecks.view OR AccountStatements.ManageStatements.view',
  canViewMyProfile: 'UserProfiles.ManageUserProfiles.view',
  canViewAuthorizedUsers: 'User.ManageAuthorizedUsers.view',
  canViewManageCards: 'PersonalFinanceManagement.ManageCards.view',
  canViewManageContacts: 'Contacts.Contacts.view AND Contacts.Contacts.create',
  canViewStopChecks: 'Payments.StopChecks.view',
  canViewAccountStatements: 'AccountStatements.ManageStatements.view',
  canViewManageStatements: 'AccountStatements.ManageStatements.view AND AccountStatements.ManageStatements.edit',
  canViewBudgets: 'PersonalFinanceManagement.ManageBudgets.view',
  canViewPlaces: 'PersonalFinanceManagement.Places.view',
  canViewManagePockets: 'PersonalFinanceManagement.ManagePockets.view',
  canViewManageNotifications: canViewManageNotificationsForActions,
  canViewLoans: 'ProductSummary.ProductSummary.view OR ProductSummary.ProductSummaryLimitedView.view',
  canViewRealTimeCommunicationChat: 'RealTimeCommunications.RTCSupportRequest.execute',
  
  canViewMyAccountsAlone: 'ProductSummary.ProductSummary.view',
  canViewManageAccounts: 'ProductSummary.ProductSummary.edit',
  canViewSelfServiceAlone: 'Notifications.ManageNotifications.view AND ProductSummary.ProductSummary.view OR UserProfiles.ManageUserProfiles.view OR User.ManageAuthorizedUsers.view OR PersonalFinanceManagement.ManageCards.view OR Payments.StopChecks.view OR AccountStatements.ManageStatements.view',
  canViewManageNotificationsAlone: 'Notifications.ManageNotifications.view AND ProductSummary.ProductSummary.view AND Actions.ManageActionRecipes.view',
  canViewMessages: 'MessageCenter.ManageMessages.view'
};
