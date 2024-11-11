import { CommonFixtures, UseFunction } from '../../fixtures';
import {
  BasePage,
  ConnectedAccountsPage,
  CreatePocketPage,
  CreateTravelNoticePage,
  FindAtmBranchPage,
  IdentityLoginPage,
  LoanPaymentPagesType,
  LoanPaymentsPage,
  MakeTransferPage,
  ManageAccountsPage,
  ManageBudgetsPage,
  ManageCardsListPage,
  MessagesPage,
  MyAccountsPage,
  PayBillsListPage,
  PocketListItem,
  PocketListPage,
  ScheduledTransfersPage,
  SelectContextPage,
  SendMoneyToMemberPage,
  SendMoneyToSomeonePage,
  ServiceAgreementsPage,
  StopChecksPage,
  TransactionsDetailsPage,
  TransactionsPage,
  TransferPage,
  TravelNoticeListPage,
} from '../page-objects';
import { selfEnrollmentFixtures, SelfEnrollmentPageFixtures } from './self-enrollment-fixtures';

export interface PageFixtures extends SelfEnrollmentPageFixtures {
  findAtmBranchPage: FindAtmBranchPage;
  identityLogInPage: IdentityLoginPage;
  selectContextPage: SelectContextPage;
  serviceAgreementsPage: ServiceAgreementsPage;
  transactionsPage: TransactionsPage;
  transactionsDetailsPage: TransactionsDetailsPage;
  myAccountsPage: MyAccountsPage;
  manageAccountsPage: ManageAccountsPage;
  pocketListPage: PocketListPage;
  createPocketPage: CreatePocketPage;
  manageCardsListPage: ManageCardsListPage;
  travelNoticeListPage: TravelNoticeListPage;
  createTravelNoticePage: CreateTravelNoticePage;
  payBillsListPage: PayBillsListPage;
  makeTransferPage: MakeTransferPage;
  sendMoneyToMemberPage: SendMoneyToMemberPage;
  sendMoneyToSomeonePage: SendMoneyToSomeonePage;
  connectedAccountsPage: ConnectedAccountsPage;
  scheduledTransfersPage: ScheduledTransfersPage;
  manageBudgetsPage: ManageBudgetsPage;
  addMoneyPage: TransferPage;
  withdrawMoneyPage: TransferPage;
  loanPaymentPage: LoanPaymentsPage;
  loanAdvancePage: LoanPaymentsPage;
  stopChecksPage: StopChecksPage;
  messagesPage: MessagesPage;
}

export const pageFixtures = {
  basePage: async ({ page }: CommonFixtures, use: UseFunction) => {
    await use(new BasePage(page));
  },
  findAtmBranchPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    const PlacesPage = new FindAtmBranchPage(page);
    await PlacesPage.navigateTo();
    await use(PlacesPage);
  },
  identityLogInPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    await use(new IdentityLoginPage(page));
  },
  selectContextPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    await use(new SelectContextPage(page));
  },
  serviceAgreementsPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    await use(new ServiceAgreementsPage(page));
  },
  myAccountsPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    const myAccountsPage = new MyAccountsPage(page);
    await myAccountsPage.myAccountsNav.click();
    await use(myAccountsPage);
  },
  manageAccountsPage: async ({ page, myAccountsPage }: CommonFixtures, use: UseFunction) => {
    await myAccountsPage.manageAccountBtn.click();
    await use(new ManageAccountsPage(page));
  },
  transactionsPage: async ({ page, myAccountsPage }: CommonFixtures, use: UseFunction) => {
    await myAccountsPage.accountItem.nth(0).click();
    await myAccountsPage.transactionsListTab.click();
    await use(new TransactionsPage(page));
  },
  transactionsDetailsPage: async ({ page, transactionsPage }: CommonFixtures, use: UseFunction) => {
    await transactionsPage.allTransactions.nth(0).click();
    await use(new TransactionsDetailsPage(page));
  },
  pocketListPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    const pocketListPage = new PocketListPage(page);
    await pocketListPage.pocketsNavItem.click();
    await pocketListPage.isOnSuccessPage();
    await use(pocketListPage);
  },
  createPocketPage: async ({ page, pocketListPage }: CommonFixtures, use: UseFunction) => {
    await pocketListPage.createPocketButton.click();
    await use(new CreatePocketPage(page));
  },
  manageCardsListPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    const manageCardsListPage = new ManageCardsListPage(page);
    await manageCardsListPage.selfService.click();
    await manageCardsListPage.manageCardsNavItem.click();
    await use(manageCardsListPage);
  },
  travelNoticeListPage: async ({ page, manageCardsListPage }: CommonFixtures, use: UseFunction) => {
    await manageCardsListPage.travelNoticeButton.click();
    await use(new TravelNoticeListPage(page));
  },
  createTravelNoticePage: async ({ page, travelNoticeListPage }: CommonFixtures, use: UseFunction) => {
    await travelNoticeListPage.navigateToCreation();
    await use(new CreateTravelNoticePage(page));
  },
  payBillsListPage: async ({ page, manageCardsListPage }: CommonFixtures, use: UseFunction) => {
    await manageCardsListPage.billPay.click();
    await manageCardsListPage.billPayNavItem.click();
    await use(new PayBillsListPage(page));
  },
  makeTransferPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    const makeTransferPage = new MakeTransferPage(page);
    await makeTransferPage.transfersNavItem.click();
    await makeTransferPage.navSubMenuItem.click();
    await use(makeTransferPage);
  },
  sendMoneyToMemberPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    const sendMoneyToMemberPage = new SendMoneyToMemberPage(page);
    await sendMoneyToMemberPage.transfersNavItem.click();
    await sendMoneyToMemberPage.navSubMenuItem.click();
    await use(sendMoneyToMemberPage);
  },
  sendMoneyToSomeonePage: async ({ page }: CommonFixtures, use: UseFunction) => {
    const sendMoneyToSomeonePage = new SendMoneyToSomeonePage(page);
    await sendMoneyToSomeonePage.transfersNavItem.click();
    await sendMoneyToSomeonePage.navSubMenuItem.click();
    await use(sendMoneyToSomeonePage);
  },
  scheduledTransfersPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    const scheduledTransfersPage = new ScheduledTransfersPage(page);
    await scheduledTransfersPage.transfersNavItem.click();
    await scheduledTransfersPage.navSubMenuItem.click();
    await use(scheduledTransfersPage);
  },
  connectedAccountsPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    const connectedAccountsPage = new ConnectedAccountsPage(page);
    await connectedAccountsPage.transfersNavItem.click();
    await connectedAccountsPage.navSubMenuItem.click();
    await use(connectedAccountsPage);
  },

  manageBudgetsPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    const manageBudgetsPage = new ManageBudgetsPage(page);
    await manageBudgetsPage.moreNavigation.click();
    await manageBudgetsPage.budgetsNavItem.click();
    await use(manageBudgetsPage);
  },
  addMoneyPage: async ({ page, pocketListPage }: CommonFixtures, use: UseFunction) => {
    const filteredPocketLocator = pocketListPage.pocketListItems.first();
    const pocketElement = new PocketListItem(filteredPocketLocator);
    await pocketElement.transferButton.click();
    await pocketListPage.addMoneyLink.click();
    const newTransfersPage = new TransferPage(page);
    await use(newTransfersPage);
  },
  withdrawMoneyPage: async ({ page, pocketListPage }: CommonFixtures, use: UseFunction) => {
    const filteredPocketLocator = pocketListPage.pocketListItems.first();
    const pocketElement = new PocketListItem(filteredPocketLocator);
    await pocketElement.transferButton.click();
    await pocketListPage.withdrawMoney.click();
    const newTransfersPage = new TransferPage(page);
    await use(newTransfersPage);
  },
  loanPaymentPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    const loanPaymentPage = new LoanPaymentsPage(page, LoanPaymentPagesType.LoanPayment);
    await loanPaymentPage.loanListItem.click();
    await loanPaymentPage.clickOnPaymentButtonOnLoansJourney();
    await use(loanPaymentPage);
  },
  loanAdvancePage: async ({ page }: CommonFixtures, use: UseFunction) => {
    const loanAdvancePage = new LoanPaymentsPage(page, LoanPaymentPagesType.LoanAdvance);
    await loanAdvancePage.loanListItem.click();
    await loanAdvancePage.clickOnPaymentButtonOnLoansJourney();
    await use(loanAdvancePage);
  },
  stopChecksPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    const stopChecksPage = new StopChecksPage(page);
    await stopChecksPage.selfServiceNavItem.click();
    await stopChecksPage.stopChecksDropdownItem.click();
    await use(stopChecksPage);
  },
  messagesPage: async ({ page }: CommonFixtures, use: UseFunction) => {
    const messagesPage = new MessagesPage(page);
    await messagesPage.moreNavigation.click();
    await messagesPage.messagesNav.click();
    await use(messagesPage);
  },
  ...selfEnrollmentFixtures,
};
