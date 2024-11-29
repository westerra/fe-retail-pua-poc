import '@angular/localize/init';
export const RETAIL_JOURNEY_DEFAULT_TABLE_CONFIGURATION = [
    {
        key: 'date',
        name: $localize `:@@account-statement.table.header.date:Book date`,
        sortable: true,
    },
    {
        key: 'category',
        name: $localize `:@@account-statement.table.header.category:Category`,
        sortable: true,
    },
    {
        key: 'description',
        name: $localize `:@@account-statement.table.header.description:Description`,
        sortable: true,
    },
];