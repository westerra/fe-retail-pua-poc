import { map } from 'rxjs';
import { ProductKinds, Scheme } from '@backbase/internal-payments-shared-feature-forms';
/**
 * @deprecated scheme: string literal 'IBAN' and 'BBAN' are deprecated, use Scheme.BBAN or Scheme.IBAN instead
 * @internal
 */
export const accMap =
  (scheme = Scheme.BBAN) =>
  (source) =>
    source.pipe(map((arrangements) => mapArrangementList(arrangements, scheme)));
/**
 * @deprecated scheme: string literal 'IBAN' and 'BBAN' are deprecated, use Scheme.BBAN or Scheme.IBAN instead
 * @internal
 */
export const mapArrangementList = (arrangements, scheme = Scheme.BBAN) =>
  arrangements.items.map((arrangement) => ({
    id: arrangement.id,
    BIC: arrangement.BIC,
    name: arrangement.name,
    alias: arrangement.alias,
    currency: arrangement.currency,
    balance: arrangement.bookedBalance,
    creditLimit: arrangement.creditLimit,
    displayName: arrangement.displayName,
    bookedBalance: arrangement.bookedBalance,
    defaultRecord: arrangement.defaultRecord,
    bankBranchCode: arrangement.bankBranchCode,
    productKindName: arrangement.productKindName,
    availableBalance: arrangement.availableBalance,
    urgentTransferAllowed: arrangement.urgentTransferAllowed,
    externalTransferAllowed: arrangement.externalTransferAllowed,
    isArrangement: true,
    accountType: scheme,
    additions: arrangement.additions || {},
    schemeName: arrangement.IBAN ? Scheme.IBAN : Scheme.BBAN,
    number: arrangement[scheme] || arrangement.BBAN || arrangement.IBAN || '',
    accountNumber: arrangement[scheme] || arrangement.BBAN || arrangement.IBAN || '',
  }));
/** @internal */
export const mapConnectedAccounts = (account) => ({
  id: account.externalAccountId,
  name: account.accountNickName || account.bankName,
  accountNumber: account.accountNumber,
  productKindName: ProductKinds.connectedAccounts,
  accountType: account.accountType,
});
/**
 * @deprecated scheme: string literal 'IBAN' and 'BBAN' are deprecated, use Scheme.BBAN or Scheme.IBAN instead
 * @internal
 */
export const mapToItemsAndCount = (arrangements, scheme = Scheme.BBAN) => ({
  items: mapArrangementList(arrangements, scheme),
  count: arrangements.count,
});
