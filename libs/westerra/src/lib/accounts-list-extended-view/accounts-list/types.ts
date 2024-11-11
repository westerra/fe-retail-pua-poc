import { AdditionalProperties } from '@backbase/arrangement-manager-http-ang';
import { Product } from '@backbase/product-summary-common-ang';
export declare type ArrangementOverview = {
  productKindUri?: string;
  paymentsPastDue?: number;
  amountInArrear?: number;
  bban?: string;
  iban?: string;
  primaryBalance?: number;
  secondaryBalance?: number;
  tertiaryBalance?: number;
  alias?: string;
  favorite?: boolean;
  institutionId?: string;
  accountNumber?: string;
};
/**
 * The interface of a tab to be displayed on the journey layout.
 */
export interface Tab {
  /**
   * Title of the tab which will be displayed on the tab navigation component.
   */
  title: string;
  /**
   * Route of the tab.
   */
  route: string;
}
/**
 * Product summary list account interface
 */
export declare type AccountSummary = Product &
  ArrangementOverview & {
    BBAN?: string;
    IBAN?: string;
    number?: string;
    accountHolderNames?: string;
    accruedInterest?: number;
    availableBalance?: string;
    bookedBalance?: string;
    creditLimit?: string;
    creditLimitUsage?: number;
    currency?: string;
    currentInvestmentValue?: string;
    principalAmount?: number;
    paymentsPastDue?: number;
    lastSyncDate?: string;
  };

export interface ProductKind extends AdditionalProperties {
  id: string;
  name?: string;
  aggregatedBalance?: string;
  currency?: string;
  products?: Array<AccountSummary>;
}

export interface ProductKindCustomized extends AdditionalProperties {
  id: string;
  name?: string;
  aggregatedBalance?: string;
  currency?: string;
  products: Array<AccountSummary>;
}
