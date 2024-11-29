
import { stripSpaces } from '@backbase/internal-payments-shared-util';
import { SchemeNames } from '@backbase/payment-order-v3-http-ang';
/** @internal */
export function mapContactAccounts(contact) {
  return contact.accounts.map((account) => ({
    name: contact.name,
    ...(contact.accounts.length > 1 ? { accountName: account.name } : null),
    addressLine1: contact.addressLine1,
    addressLine2: contact.addressLine2,
    streetName: contact.streetName,
    town: contact.town,
    postCode: contact.postCode,
    countrySubDivision: contact.countrySubDivision,
    country: contact.country,
    accounts: [
      {
        ...account,
        accountNumber: account.accountNumber || account.IBAN || '',
        email: account.email || contact.emailId,
        phoneNumber: account.phoneNumber || contact.phoneNumber,
      },
    ],
    id: contact.id,
  }));
}
/** @internal */
// export function contactListFromService(response, isLoadMore = false) {
//   const responseValue: any = fromResponse(response);
//   const items = responseValue.reduce((acc, contact) => {
//     acc.push(...mapContactAccounts(contact));
//     return acc;
//   }, []);
//   return {
//     items,
//     itemsCount: responseValue.length,
//     count: parseInt(response.headers.get('x-total-count'), 10),
//     isLoadMore,
//   };
// }
/** @internal */
export function getBankDetails({ bankBranchCode: bankCode, bic: BIC, bankName, postalAddress }) {
  return {
    bankCode,
    BIC,
    bankName,
    bankAddressLine1: postalAddress.addressLine1,
    bankAddressLine2: postalAddress.addressLine2,
    bankStreetName: postalAddress.streetName,
    bankPostCode: postalAddress.postCode,
    bankTown: postalAddress.town,
    bankCountrySubDivision: postalAddress.countrySubDivision,
    bankCountry: postalAddress.country,
  };
}
/** @internal */
export function contactItemToService(counterparty) {
  const { name, accountNumber, schemeName, creditorBank = {}, postalAddress = {} } = counterparty;
  let schemeValue;
  switch (schemeName) {
    case SchemeNames.Email:
      schemeValue = { email: stripSpaces(accountNumber) };
      break;
    case SchemeNames.Mobile:
      schemeValue = { phoneNumber: stripSpaces(accountNumber) };
      break;
    case SchemeNames.Iban:
      schemeValue = { IBAN: stripSpaces(accountNumber) };
      break;
    default:
      schemeValue = { accountNumber: stripSpaces(accountNumber) };
  }
  return {
    name,
    addressLine1: postalAddress.addressLine1,
    addressLine2: postalAddress.addressLine2,
    streetName: postalAddress.streetName,
    town: postalAddress.town,
    postCode: postalAddress.postCode,
    countrySubDivision: postalAddress.countrySubDivision,
    country: postalAddress.country,
    accounts: [
      {
        ...getBankDetails(creditorBank),
        ...schemeValue,
      },
    ],
  };
}
