# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2023.02-LTS]

### Changed

- Bump Entitlements capabilities for release 2023.02
- Bump `@backbase/initiate-payment-journey-ang` to version `2.6.4`, `@backbase/manage-payment-templates-journey-ang` to version `4.6.1`, `@backbase/manage-payments-journey-ang` to version `3.6.2`. and `@backbase/stop-checks-journey-ang` to version `3.6.1`
- Bump `@backbase/identity-self-service-journey-ang` to version `3.0.0`
- Bump `@backbase/accounts-transactions-journey-ang` to version `4.29.0`. Add EAA flows, fix `0` values displaying.
- Bump `@backbase/initiate-loans-payment-journey` to version `2.3.4`
- Bump `@backbase/retail-loans-journey-ang` to version `2.4.4`
- Bump `@backbase/quick-transfer-journey-ang` to version `2.6.1`, `@backbase/manage-upcoming-and-historical-payments-journey-ang` to version `2.3.1`, `@backbase/connect-external-accounts-journey-ang` to version `2.4.0` - contains ui and a11y bugfixes
- **Self Enrollment Journey** - patched to correctly ignore `accountNumberMaxLength` when edition is set to Universal.
- Add default router configuration to `RoutableModalModule`

### Fixed

- Fix Quick Actions navigation overflow on small screens. [WEB2-1892]
- Bump `@backbase/messages-client-inbox-journey-ang` to `3.4.0`

### Deprecated

- Bump billpay journeys, deprecating `@backbase/billpay-journeys-common` internal lib

## [2023.01]

### Added

- Add env configuration `accountsUseArrangementViewsApi` to configure arrangements/view API usage in `accounts-transactions-journey-ang` [PRSUM-8706]
- Add back button in payment edit flow, update loan payment page titles [KB-2291]
- Add default value for `displayNotificationSettingsButton$` property to fix `ExpressionChangedAfterItHasBeenCheckedError` error [DLRN-4525]
- Update identity journeys to provide RTL support.

### Changed

- Bump `@backbase/authorized-users-journey-ang` and `@backbase/places-journey-ang` to `2.1.0` - apply nx executor for handling peer deps.
- Change `arrangementViewsName` journey configuration to `legacy-summary` in `@backbase/accounts-transactions-journey-ang`.
- Bump `@backbase/account-statement-retail-journey-ang` to `3.4.1` - journey title is configurable
- Bump `@backbase/manage-statements-journey-ang` to `1.1.0` - improved account number masking
- **Shared Auth** - All usages of `revokeTokenAndLogout` have been changed to `logOut` as the `LOGOUT` event was not being generated in the Identity Audit logs.
- **Self Enrollment Journey** - Universal edition selected as default in retail app, to select the US edition modify the `SelfEnrollmentJourneyConfig`.
- Bump `@backbase/accounts-transactions-journey-ang` to version `4.22.1`. Read transactions list configurations from journey configuration service.
- Bump `@backbase/accounts-transactions-journey-ang` to version `4.25.0`. Disable proof of transaction / Support RTL.
- **Identity Auth** - Issuer URLs beginning with `auth` will no longer be transformed incorrectly when the user responds to a Step Up challenge
- Bump `@backbase/initiate-loans-payment-journey`,`@backbase/loans-journey-ang` and `@backbase/retail-loans-journey-ang` to fix Visibility Service injection error
- Bump retail payment journeys, add support for loan-payment in Upcoming Payments Journey
- Bump `@backbase/manage-upcoming-and-historical-payments-journey-ang` to 2.3.0 - updates incorrect peer dependencies, supports new spec for `"@backbase/payment-order-http-ang`
- Bump `@backbase/connect-external-accounts-journey-ang` to 2.3.0 and `@backbase/quick-transfer-journey-ang` to 2.6.0 - updates incorrect peer dependencies
- Bump `@backbase/ui-ang` to version `8.9.0`
- Bump `@backbase/manage-pockets-journey-ang` to `2.0.7`.
  - Show goal amount in pocket list view with decimals [NVCTS-1719]
  - Goal date validation messages are now more specific and accessible [NVCTS-1272]
  - Removed extra usage of date pipe in pocket deadline [NVCTS-1716]
- Bump `@backbase/cards-management-journey-ang` to `3.1.7`.
  - Fixed card limit error message formatting ignoring the currency [NVCTS-1395]

### Fixed

- Fix `Send money to someone` title by updating translation keys
- Fix clipped focus on buttons in `@backbase/contact-manager-journey-ang`
- Fix automation tests for `@backbase/manage-pockets-journey-ang`
- **Self Enrollment Journey** - `accountNumberMaxLength` configuration now will allow entries with fewer digits than the limit to be submitted as its name suggests.
- Fix account-details failing e2e test.

## [2022.12]

### Deprecated

- `bb-session-timeout-modal` is deprecated and will be removed in 2023.9 release. Please use `bb-activity-monitor` instead.

### Added

- Add missing `ACCOUNTS_TRANSACTIONS_JOURNEY_EXTERNAL_ACCOUNT_AGGREGATOR_BASE_PATH` in `accounts-transactions-journey-ang` bundle. [TRANS-7473]
- Integrated Password Reset journey [IDULS-578]
- Integrated Self Enrollment journey [IDWOJ-1489]
- Added E2E test for messages
- Replaced usage of `bb-session-timeout-modal` with `bb-activity-monitor` fixing an issue with logouts not occurring after long inactivity when the web app is run in a background tab.

### Changed

- Bump Entitlements capabilities for release 2022.12
- Bump `@backbase/identity-auth` to `1.4.0` - New header for transaction signing for reverse a batch
- Bump `@backbase/initiate-loans-payment-journey` to version `2.1.2`
- Bump `@backbase/retail-loans-journey-ang` to version `2.2.2`
- Bump `@backbase/loans-http-ang` to version `1.0.0`,
- Bump Entitlements capabilities for release 2022.11
- Bump `@backbase/manage-pockets-journey-ang` to `2.0.2` - Fixed empty screen conditions for it to be displayed [MAINT-19558]
- Bump `@backbase/cards-management-journey-ang` to `3.1.3` - Exposed `CardDetailsComponent`, `CardsListComponent`, `CardsTravelNoticeComponent`, `PaymentCardComponent` [MAINT-18406]
- Update `my-accounts` page locators, Exporting a Single Transaction as a PDF Statement [TRANS-3900].
- Bump `@backbase/ui-ang` to version `8.6.0-pr.11`
- Bump `@backbase/arrangement-manager-http-ang` to version `3.2.0`
- Bump `@backbase/accounts-transactions-journey-ang` to version `4.14.0`
- Bump `@backbase/identity-self-service-journey-ang` to version `2.2.0`
- Bump `@backbase/initiate-payment-journey-ang` to version `2.4.3`, `@backbase/manage-payment-templates-journey-ang` to version `4.4.2`, `@backbase/manage-payments-journey-ang` to version `3.4.2`. and `@backbase/stop-checks-journey-ang` to version `3.4.2`
- Removed custom mock provider for actions
- Bump `@backbase/cards-management-journey-ang` to `3.1.4` - Fixed unexpected form submission on enter key press. [NVCTS-1720]
- Bump `@backbase/manage-pockets-journey-ang` to `2.0.4` - Proper handling of balance display on pocket cards to be RTL friendly [NVCTS-1552]
- Bump `@backbase/income-spending-analysis-journey-ang` to `2.1.3` - Fixed RTL related issues [NVCTS-1493]
- `@backbase/income-spending-analysis-journey-ang` - Spending analysis: Fixed an issue with categories list being summed up when they should not be. [NVCTS-1760]
- Bump `@backbase/budget-journey-ang` to `2.0.1` - Proper internal structure alignment (Nx dependencies) [NVCTS-1774]
- Bump `@backbase/turnovers-journey-ang` to `2.0.3` - Fixed RTL related issues [NVCTS-1493]
- Bump `@backbase/notifications-ang` to `2.2.0`, `@backbase/actions-retail-notification-preferences-journey-ang` to `4.5.0`, `@backbase/messages-client-inbox-journey-ang` to `3.1.0`, `@backbase/campaign-space-ang` to `2.1.0`
- Bump `@backbase/connect-external-accounts-journey-ang` to version `2.2.1`, `@backbase/manage-upcoming-and-historical-payments-journey-ang` to version `2.1.3`, `@backbase/quick-transfer-journey-ang` to version `2.4.1`
- Fix failing payment e2e tests, refactor stop checks journey tests to be against modelbank env
- Bump `@backbase/accounts-transactions-journey-ang` to version `4.18.0`. Provide configuration for translating the transaction type field into user friendly language.

### Fixed

- corrected registry for product release

## [2022.11]

### Changed

- Bump `@backbase/account-statement-retail-journey-ang` to version `3.2.0`
- Bump `@backbase/account-statements-http-ang` to version `2.3.0`
- Bump `@backbase/contact-manager-journey-ang` to `2.2.0`
- Bump `@backbase/ui-ang` to version `8.3.0` - fix displaying of "initiate payment" dialog [MAINT-18078]
- Bump `@backbase/ui-ang` to version `~8.4.0-pr.1` and `@backbase/places-journey-ang` to fix [MAINT-14722]
- Bump `@backbase/income-spending-analysis-journey-ang` to `2.1.0` - limit donut chart for one month view in spending|income analysis [NVCTS-1432]
- `@backbase/income-spending-analysis-journey-ang` - Align month-selector buttons with design-works [NVCTS-1432]
- Bump `@backbase/turnovers-journey-ang` to `2.0.1` - Align month-selector buttons with design-works [NVCTS-1432]
- Bump `@backbase/places-journey-ang` to `2.0.4` - Fix work-time UI inconsistency on tablet screen [WEB2-1737]
- Bump `@backbase/authorized-users-journey-ang` to `2.0.1` - expose assets path token [MAINT-18518]
- Bump `@backbase/accounts-transactions-journey-ang` to version `4.10.0` - Include EAA (External Account Aggregation) feature and add Api docs to `accounts-transactions-journey-ang`.
- Bump `@backbase/identity-self-service-journey-ang` to `2.1.0` - Secondary addresses for address autocomplete [IDULS-1185]
- Added e2e testing for `@backbase/stop-checks-journey-ang` [KB-1993]

### Fixed

- Fix the spacing issue when the maintenance banner is dismissed [RCON-45]

### Added

- Add Remote Config feature flags in the Retail Web App [RCON-45]

## [2022.10.1]

### Changed

- Bump `@backbase/retail-loans-journey-ang` to version `2.0.2`
- Change label header for Edit Payment - Internal transfer, M2M and P2P [KB-2123]
- Bump `@backbase/manage-pockets-journey-ang` - Fixed aria attributes not being bound to a value. [NVCTS-1281]
- `@backbase/cards-management-journey-ang` - Added misssing exports to the public exportable apis. [MAINT-18406]
- `@backbase/cards-management-journey-ang`- Fixed the issue with plain texts being focusable via tab key. [NVCTS-1553]
- `@backbase/pay-bills-journey-ang` - Fixed total payment visibility issue after deleting payee [GAR-420]
- `@backbase/manage-payees-journey-ang` - Fixed issue when user can not exit payee on edit page when clicking lose changes button [GAR-430]
- Add loan payments e2e tests [KB-2271]
- Bump `@backbase/retail-loans-journey-ang` to version `2.0.5` - Fix dispay amount options on create loan payment [CME-2504]
- Bump `@backbase/actions-retail-notification-preferences-journey-ang` to version `3.1.2`
- Bump `@backbase/notifications-ang` to version `2.1.3`

### Fixed

- Fixed 'Added a test case to add electronic payee and removed unused code'

### Added

- New app version display to the `bb-user-context-menu-widget` from environment variables [NOJIRA]

## [2022.10]

### Changed

- Bump Entitlements capabilities for release 2022.10
- Bump `@backbase/cards-management-journey-ang` - Implemented new journey configuration named `cardPinLength`. [NVCTS-1353]
- Bump Payments Journeys for release 2022.10 - contains bank timezone configuration for payment submit

## [2022.09]

### Changed

- Change configuration of Account Statements to hide "Manage Statements" button if user lacks permissions
- Removed popup&sticky notifications [DLRN-4516]
- Changed configuration for engagement base path [DLRN-4543]
- Code refactored to remove duplication.
- `@backbase/accounts-transactions-journey-ang` - move http clients to peer dependencies
- Bump @backbase/connect-external-accounts-journey-ang (moved http clients to peer dependencies)
- Bump @backbase/manage-upcoming-and-historical-payments-journey-ang (Improved error handling, moved http clients to peer dependencies, other minor improvements)
- Bump @backbase/quick-transfer-journey-ang (moved http clients to peer dependencies)
- Remove `MessageCenter.ManageMessages.view` permission from permissions check
- Start using modelbank stg env instead of ret-latest.
- Bump @backbase/manage-bill-payments-journey-ang @backbase/manage-payees-journey-ang @backbase/pay-bills-journey-ang (moved http clients to peer dependencies)
- Remove payment forms duplicate titles, update loans payments
- Bump `@backbase/identity-self-service-journey-ang` (Address autocomplete [IDULS-352])
- Bump `@backbase/cards-management-journey-ang`. Fixed i18n repeated keys and removed `data-ang` dependency
- Rename Remote config release registration `provisioning-package` folder to `release-template`
- Update register-release action with the new path for creating the provisioning package
- E2E configuration will change as per the environment.
- Bump `@backbase/initiate-payment-journey-ang`, `@backbase/manage-payment-templates-journey-ang`, `@backbase/manage-payments-journey-ang` and `@backbase/stop-checks-journey-ang` versions (Fixes the date-picker timezone issue on edit flow)
- Changed test data for E2E tests
- Bump `@backbase/authorized-users-journey-ang` version (split create authorized user flow into routable/extendable views )
- Bump `@backbase/retail-loans-journey-ang`. Removed `@backbase/account-statement-business-widget-ang`, `@backbase/account-statement-store-ang` and updated `@backbase/account-statement-common-ang`.
- regex updated in pipeline for LTS release.
- Update `@backbase/identity-auth` to version `1.2.0`
- Enabled USA-only address autocomplete
- Angular update to v13.
- Bump `@backbase/places-journey-ang` - Angular v13 update + add full path to markerUrl assets.
- Bump `@backbase/account-statement-retail-journey-ang` version (changed journey name and added link to Manage Statements).
- Change menu link from "Download Statements" to "Account Statements"
- Deprecated `PUBSUB` and `SET_LOCALE` replaced with services compatible with `foundation-ang` v7
- Bump `@backbase/quick-transfer-journey-ang` - Angular v13 update + update assets handling.
- Bump `@backbase/remote-config-ang` to version `2.0.0`
- Bump `@backbase/actions-retail-notification-preferences-journey-ang` to version `4.0.1`
- Bump `@backbase/campaign-space-ang` to version `2.0.1`
- Bump `@backbase/messages-client-inbox-journey-ang` to version `3.0.2`
- Bump `@backbase/notifications-ang` to version `2.0.2`
- Set `engagements` as default value for api mode of notification preferences
- Bump `@backbase/places-journey-ang` for a small bugfix.
- Bump Entitlements capabilities (Angular 13)
- Bump `@backbase/accounts-transactions-journey-ang` to version `3.10.0`
- Bump `@backbase/manage-bill-payments-journey-ang`,`@backbase/manage-payees-journey-ang`,`@backbase/pay-bills-journey-ang` - Angular 13 update
- Bump `@backbase/retail-loans-journey-ang` to version `1.0.3` and `@backbase/initiate-loans-payment-journey` to version 2.0.1.
- Bump `@backbase/arrangement-manager-http-ang` to version `2.5.0`
- Bump `@backbase/cards-management-journey-ang` - Angular 13 update and i18n bugfixes
- Bump `@backbase/budget-journey-ang` - Angular 13
- Bump `@backbase/income-spending-analysis-journey-ang` - Angular 13, UI improvements and bugfixes
- Bump `@backbase/manage-pockets-journey-ang` - Angular 13
- Bump `@backbase/turnovers-journey-ang` - Angular 13
- Baas key made configurable.
- Bump `@backbase/accounts-transactions-journey-ang` to version `4.0.0`
- Bump `@backbase/retail-loans-journey-ang` to version `2.0.1`
- Patch ranges allowed for Backbase dependencies

### Fixed

- Stop calling `initLoginFlow` after `revokeTokenAndLogout`, to prevent unwanted side-effect of cancelling `/logout` page request.
- Added add/withdraw money and delete pocket scenario to pocket e2e tests
- Fixed `accounts-transactions-journey-ang` to read `apiKey` from an environment variable.
- Fixed 'User can edit existing budget' test
- Fixed 'Added a test case to add electronic payee and removed unused code'
- Fixed 'Create budget" test
- Fixed 'Edit budget' and 'Create travel notice' tests

### Added

- Added E2E tests for cards and budgets
- New Proxy configurations added for e2e tests
- End to end test cases for Accounts & Transactions.
- Extracting fixtures, configs, PO to retail-e2e lib.
- End to end test cases for Pockets based on new structure and stg modelbank.
- End to end test cases for Travel notice
- Loans Journey retaled basepaths to relevant modules.
- Changelog check + an automatic versioning.
- E2E tests for transfers and connected accounts.
- E2E tests for Bill Pay.
- Support for testing transaction signing in E2E tests
- E2E tests for Edit External A2A scheduled payments
- Add new journey "Manage Statements" `@backbase/manage-statements-journey-ang`.
- **Step Up** integrated via `@backbase/identity-auth/step-up` [IDWOJ-1241]
- **AuthEventsHandlerService** Added example version of how auth events could be handled [IDWOJ-1261]
- For `@backbase/manage-upcoming-and-historical-payments-journey-ang` updated route paths, title & version (added Historical payments tab into Activity tab)
- **AuthInterceptor** Updated implementation to align with recommendation from Identity. If an action is rejected with a 401 `invalid_token` error, attempt to refresh the user's token and replay the original request. Otherwise surface the original error. [IDWOJ-1259]
- **AuthGuard** Updated implementation to align with recommendation from Identity. If the user is not logged in, redirect them to the login flow. [IDWOJ-1260]
- E2E tests for `Places journey`.
- New app version display to the `bb-user-context-menu-widget` from environment variables [NOJIRA]
- Add new journey "Real Time Communication Journey" `@backbase/real-time-communication-journey-ang`
