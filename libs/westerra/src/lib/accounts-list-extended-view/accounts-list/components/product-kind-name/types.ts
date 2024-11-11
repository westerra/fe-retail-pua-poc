export interface ProductSummaryProductKind {
  kind?: string;
}
export declare enum ProductKindNames {
  CurrentAccount = 'Current Account',
  SavingsAccount = 'Savings Account',
  TermDeposit = 'Term Deposit',
  Loan = 'Loan',
  CreditCard = 'Credit Card',
  DebitCard = 'Debit Card',
  InvestmentAccount = 'Investment Account',
}
/**
 * Default values of "kindUri" per product kind
 */
export declare enum ProductKindUri {
  CREDIT_CARD = 'credit-card',
  CURRENT_ACCOUNT = 'current-account',
  DEBIT_CARD = 'debit-card',
  INVESTMENT_ACCOUNT = 'investment-account',
  LOAN = 'loan',
  POCKET = 'pocket',
  POCKET_PARENT = 'pocket-parent',
  SAVINGS_ACCOUNT = 'savings-account',
  TERM_DEPOSIT = 'term-deposit',
}
export interface ProductKindInfo {
  productKindUri?: string;
  product?: {
    productKind?: {
      kindUri: string;
    };
  };
}
