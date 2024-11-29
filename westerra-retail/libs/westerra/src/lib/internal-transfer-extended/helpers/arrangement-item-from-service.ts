/** @internal */
export function arrangementItemFromService(record) {
  return {
    id: record.id,
    name: record.displayName || record.bankAlias || record.name || '',
    alias: (record.userPreferences || {}).alias || record.bankAlias,
    balance: record.bookedBalance || record.availableBalance,
    bookedBalance: record.bookedBalance,
    availableBalance: record.availableBalance,
    creditLimit: record.creditLimit,
    currency: record.currency || '',
    bankBranchCode: record.bankBranchCode || '',
    BIC: record.BIC,
    IBAN: record.IBAN || record.number,
    BBAN: record.BBAN,
    externalTransferAllowed: record.externalTransferAllowed,
    urgentTransferAllowed: record.urgentTransferAllowed,
    additions: record.additions,
    productKindName: record.productKindName,
    isArrangement: true,
    defaultRecord: record,
  };
}
