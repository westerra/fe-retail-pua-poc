
// interface EntitlementsConfiguration {
//     additions: {[key]: any},
//     resource: string;
//     function: string
//     permission: {[key]: boolean}
//   }


export const entitlementsConfiguration = [
    {
        additions: {},
        resource: "Payments",
        function: "StopChecks",
        permissions:
        {
            cancel: true,
            view: true,
            edit: true,
            approve: true,
            create: true,
            delete: true
        }
    },
    {
        additions: {},
        resource: "Payments",
        function: "A2A Transfer",
        permissions:
        {
            cancel: true,
            view: true,
            edit: true,
            approve: true,
            create: true,
            delete: true
        }
    },
    {
        "additions": {},
        "resource": "Device",
        "function": "Manage Devices",
        "permissions":
        {
            "edit": true
        }
    },
    { "additions": {}, "resource": "Notifications", "function": "Manage Notifications", "permissions": { "create": true, "view": true, "edit": true, "delete": true, "approve": true } }, { "additions": {}, "resource": "Message Center", "function": "Manage Messages", "permissions": { "create": true, "view": true, "edit": true, "delete": true, "approve": true } }, { "additions": {}, "resource": "Payments", "function": "Remote Deposit Capture", "permissions": { "create": true, "view": true, "edit": true, "delete": true } }, { "additions": {}, "resource": "Account Statements", "function": "Manage Statements", "permissions": { "view": true } },
    { "additions": {}, "resource": "Product Summary", "function": "Product Summary", "permissions": { "edit": true, "view": true } }, { "additions": {}, "resource": "Billpay", "function": "US Billpay Enrolment", "permissions": { "execute": true, "view": true } }, { "additions": {}, "resource": "Contacts", "function": "US Billpay Payees-Search", "permissions": { "execute": true } }, { "additions": {}, "resource": "Payments", "function": "US Domestic Wire", "permissions": { "cancel": true, "view": true, "edit": true, "approve": true, "create": true, "delete": true } }, { "additions": {}, "resource": "Payments", "function": "US Foreign Wire", "permissions": { "cancel": true, "view": true, "edit": true, "approve": true, "create": true, "delete": true } }, { "additions": {}, "resource": "Personal Finance Management", "function": "Manage Budgets", "permissions": { "create": true, "view": true, "edit": true, "delete": true } }, { "additions": {}, "resource": "Actions", "function": "Manage Action Recipes", "permissions": { "create": true, "view": true, "edit": true, "delete": true, "execute": true } }, { "additions": {}, "resource": "Contacts", "function": "US Billpay Payees-Summary", "permissions": { "view": true } }, { "additions": {}, "resource": "Contacts", "function": "US Billpay Payees", "permissions": { "create": true, "view": true, "edit": true, "delete": true } }, { "additions": {}, "resource": "Message Center", "function": "Supervise Messages", "permissions": { "create": true, "view": true, "edit": true, "delete": true, "approve": true } }, { "additions": {}, "resource": "Contacts", "function": "Contacts", "permissions": { "create": true, "view": true, "edit": true, "delete": true, "approve": true } }, { "additions": {}, "resource": "Payments", "function": "Intra Company Payments", "permissions": { "cancel": true, "view": true, "edit": true, "approve": true, "create": true, "delete": true } }, { "additions": {}, "resource": "Personal Finance Management", "function": "Manage Saving Goals", "permissions": { "create": true, "view": true, "edit": true, "delete": true } }, { "additions": {}, "resource": "Limits", "function": "Manage Limits", "permissions": { "create": true, "view": true, "edit": true, "delete": true, "approve": true } }, { "additions": {}, "resource": "Transactions", "function": "Transactions", "permissions": { "edit": true, "view": true } }, { "additions": {}, "resource": "Audit", "function": "Audit", "permissions": { "create": true, "view": true } }, { "additions": {}, "resource": "Cash Flow", "function": "Cash Flow Forecasting", "permissions": { "create": true, "view": true, "edit": true, "delete": true } }, { "additions": {}, "resource": "Support Access", "function": "Support Access for Payments", "permissions": { "view": true } }, { "additions": {}, "resource": "Payments", "function": "US Domestic Wire - Intracompany", "permissions": { "cancel": true, "view": true, "edit": true, "approve": true, "create": true, "delete": true } }, { "additions": {}, "resource": "User", "function": "Manage Authorized Users", "permissions": { "create": true, "view": true, "edit": true } }, { "additions": {}, "resource": "Personal Finance Management", "function": "Manage Cards", "permissions": { "create": true, "view": true, "edit": true, "delete": true } }, { "additions": {}, "resource": "Payments", "function": "US Foreign Wire - Intracompany", "permissions": { "cancel": true, "view": true, "edit": true, "approve": true, "create": true, "delete": true } }, { "additions": {}, "resource": "Payments", "function": "ACH Credit - Intracompany", "permissions": { "cancel": true, "view": true, "edit": true, "approve": true, "create": true, "delete": true } }, { "additions": {}, "resource": "User Profiles", "function": "Manage User Profiles", "permissions": { "create": true, "view": true, "edit": true, "delete": true } }, { "additions": {}, "resource": "Arrangements", "function": "US Billpay Accounts", "permissions": { "view": true } }, { "additions": {}, "resource": "Payments", "function": "US Billpay Payments", "permissions": { "create": true, "view": true, "edit": true, "delete": true } }, { "additions": {}, "resource": "Actions", "function": "Access Actions History", "permissions": { "execute": true, "view": true } }]

