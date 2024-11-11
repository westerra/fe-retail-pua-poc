import { Page } from '@playwright/test';
import { BasePage } from '../base-page.po';

export class MyAccountsPage extends BasePage {
  journeyUi = this.page.locator('bb-accounts-list');
  productItem = this.page.locator('.bb-product-kind__item');
  transactionsList = this.page.locator('bb-transactions-list-widget');
  allTransactions = this.page.locator('bb-transactions-list-item');
  manageAccountBtn = this.page.locator('.btn-link', { hasText: 'Manage Accounts' });
  accountItem = this.page.locator('.bb-product-kind-ui__item');
  transactionsListTab = this.page.locator('[data-role=tab-item]').nth(0);
  accountDetailsTab = this.page.locator('[data-role=tab-item]').nth(1);
  achRoutingNumberLabel = this.page.locator('[data-role=account-info-property-bankBranchCode-label] span');
  achRoutingNumber = this.page.locator('[data-role=account-info-property-bankBranchCode-value]');
  billPay = this.page.locator('a[id="bb-menu-header-button-transfers"]');
  remoteConfigMaintenanceBanner = this.page.locator('[title="Maintenance alert"]');
  remoteConfigMaintenanceText = this.remoteConfigMaintenanceBanner.locator('[data-role="alert-content"]');

  constructor(page: Page) {
    super(page);
  }
}
