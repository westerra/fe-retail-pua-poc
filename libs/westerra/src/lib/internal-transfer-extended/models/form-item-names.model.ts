export var AccessContextScope;
(function (AccessContextScope) {
    AccessContextScope["USER"] = "USER";
    AccessContextScope["SA"] = "SA";
    AccessContextScope["LE"] = "LE";
})(AccessContextScope || (AccessContextScope = {}));
export var PaymentComponents;
(function (PaymentComponents) {
    PaymentComponents["text"] = "text";
    PaymentComponents["date"] = "date";
    PaymentComponents["phone"] = "phone";
    PaymentComponents["number"] = "number";
    PaymentComponents["textarea"] = "textarea";
    PaymentComponents["address"] = "address";
    PaymentComponents["select"] = "select";
    PaymentComponents["radio"] = "radio";
    PaymentComponents["checkbox"] = "checkbox";
    PaymentComponents["debitAccountSelector"] = "debitAccountSelector";
    PaymentComponents["countrySelector"] = "countrySelector";
    PaymentComponents["sanctionedCountrySelector"] = "sanctionedCountrySelector";
    PaymentComponents["beneficiarySelector"] = "beneficiarySelector";
    PaymentComponents["selectPaymentOption"] = "selectPaymentOption";
    PaymentComponents["paymentCost"] = "paymentCost";
    PaymentComponents["chargeBearer"] = "chargeBearer";
    PaymentComponents["schedule"] = "schedule";
    PaymentComponents["amount"] = "amount";
    PaymentComponents["sanctionedCurrencyAmount"] = "sanctionedCurrencyAmount";
    PaymentComponents["switch"] = "switch";
    PaymentComponents["internalAccountSelector"] = "internalAccountSelector";
    PaymentComponents["compactAmount"] = "compactAmount";
    PaymentComponents["scheduleHeader"] = "scheduleHeader";
    PaymentComponents["buttonGroup"] = "buttonGroup";
    PaymentComponents["internalAmountOptions"] = "internalAmountOptions";
    PaymentComponents["header"] = "header";
    PaymentComponents["purposeOfPayment"] = "purposeOfPayment";
    PaymentComponents["alert"] = "alert";
    PaymentComponents["scheduleSwitch"] = "scheduleSwitch";
    PaymentComponents["beneficiaryGroupHeader"] = "beneficiaryGroupHeader";
    PaymentComponents["contactSelector"] = "contactSelector";
    PaymentComponents["accountSelector"] = "accountSelector";
})(PaymentComponents || (PaymentComponents = {}));
export var AddressType;
(function (AddressType) {
    AddressType["beneficiary"] = "beneficiary";
    AddressType["beneficiary bank"] = "beneficiary bank";
    AddressType["correspondent bank"] = "correspondent bank";
    AddressType["intermediary bank"] = "intermediary bank";
})(AddressType || (AddressType = {}));
export var TemplateModeType;
(function (TemplateModeType) {
    TemplateModeType["CREATE"] = "CREATE";
    TemplateModeType["EDIT"] = "EDIT";
})(TemplateModeType || (TemplateModeType = {}));
export var PaymentMode;
(function (PaymentMode) {
    PaymentMode["EDIT_PAYMENT"] = "EDIT_PAYMENT";
    PaymentMode["CREATE_PAYMENT"] = "CREATE_PAYMENT";
    PaymentMode["COPY_PAYMENT"] = "COPY_PAYMENT";
    PaymentMode["EDIT_TEMPLATE"] = "EDIT_TEMPLATE";
    PaymentMode["CREATE_TEMPLATE"] = "CREATE_TEMPLATE";
})(PaymentMode || (PaymentMode = {}));
export var ContactScheme;
(function (ContactScheme) {
    ContactScheme["accountNumber"] = "accountNumber";
    ContactScheme["phoneNumber"] = "phoneNumber";
    ContactScheme["email"] = "email";
})(ContactScheme || (ContactScheme = {}));
export var ReviewScreens;
(function (ReviewScreens) {
    ReviewScreens[ReviewScreens["ADAPTED"] = 0] = "ADAPTED";
    ReviewScreens[ReviewScreens["DEFAULT"] = 1] = "DEFAULT";
})(ReviewScreens || (ReviewScreens = {}));
export var Scheme;
(function (Scheme) {
    Scheme["IBAN"] = "IBAN";
    Scheme["BBAN"] = "BBAN";
    Scheme["ID"] = "ID";
})(Scheme || (Scheme = {}));
export var ProductKinds;
(function (ProductKinds) {
    ProductKinds["currentAccount"] = "Current Account";
    ProductKinds["savingsAccount"] = "Savings Account";
    ProductKinds["creditCard"] = "Credit Card";
    ProductKinds["debitCard"] = "Debit Card";
    ProductKinds["loanAccount"] = "Loan";
    ProductKinds["connectedAccounts"] = "Connected Account";
    ProductKinds["investmentAccount"] = "Investment Account";
})(ProductKinds || (ProductKinds = {}));
export var AccountBalances;
(function (AccountBalances) {
    AccountBalances["available"] = "availableBalance";
    AccountBalances["current"] = "bookedBalance";
    AccountBalances["creditLimit"] = "creditLimit";
    AccountBalances["outstandingPrincipalAmount"] = "outstandingPrincipalAmount";
})(AccountBalances || (AccountBalances = {}));
export var InitiatePaymentHeaderStates;
(function (InitiatePaymentHeaderStates) {
    InitiatePaymentHeaderStates["FORM"] = "FORM";
    InitiatePaymentHeaderStates["REVIEW"] = "REVIEW";
    InitiatePaymentHeaderStates["SUBMITTED"] = "SUBMITTED";
})(InitiatePaymentHeaderStates || (InitiatePaymentHeaderStates = {}));
export var AccountType;
(function (AccountType) {
    AccountType["credit"] = "credit";
    AccountType["debit"] = "debit";
})(AccountType || (AccountType = {}));