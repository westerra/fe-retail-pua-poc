import { NgModule } from '@angular/core';
import {
  AccountStatementRetailJourneyModule,
  AccountStatementRetailJourneyConfiguration,
  ACCOUNT_STATEMENT_RETAIL_JOURNEY_CONFIGURATION_TOKEN,
  ACCOUNT_STATEMENT_TABLE_CONFIG_TOKEN,
} from '@backbase/account-statement-retail-journey-ang';
import { ACCOUNT_STATEMENT_CATEGORIES_TOKEN, accountStatementCategories, MIME_TYPE_EXTENSIONS_TOKEN, mimeTypeExtensions, PaginationType, } from '@backbase/internal-account-statement-shared-util';
import { AccountStatementJourneyComponent } from './account-statement-journey.component';
import { HeaderModule } from '@backbase/ui-ang/header';
import { CommonModule } from '@angular/common';
import { RouterModule, provideRoutes } from '@angular/router';
import { IconModule } from '@backbase/ui-ang/icon';
import { ButtonModule } from '@backbase/ui-ang/button';
import { RETAIL_JOURNEY_DEFAULT_TABLE_CONFIGURATION } from './retail-journey-default-table-configuration';
import { ProductSummaryHttpService } from '@backbase/arrangement-manager-http-ang';
import { AccountStatementHttpService } from '@backbase/account-statements-http-ang';
import { accountStatementRetailJourney } from './account-statement-journey-routing.module';




const imports = [HeaderModule, IconModule, ButtonModule];

const categoriesProvider = {
  provide: ACCOUNT_STATEMENT_CATEGORIES_TOKEN,
  useValue: accountStatementCategories,
};
const extensionsProvider = {
  provide: MIME_TYPE_EXTENSIONS_TOKEN,
  useValue: mimeTypeExtensions,
};
const tableConfigProvider = {
  provide: ACCOUNT_STATEMENT_TABLE_CONFIG_TOKEN,
  useValue: RETAIL_JOURNEY_DEFAULT_TABLE_CONFIGURATION,
};


@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule
  ],
  providers: [
    {
      provide: ACCOUNT_STATEMENT_RETAIL_JOURNEY_CONFIGURATION_TOKEN,
      useValue: {
        absoluteDateLimit: '',
        notificationDismissTime: 5,
        pageSize: 24,
        paginationType: PaginationType.loadMore,
        relativeDateLimit: 0,
        sortingDirection: 'DESC',
        sortingOrder: 'date',
        productSummaryBusinessFunction: 'Product Summary',
        productSummaryResourceName: 'Product Summary',
        showManageStatementsNavigation: false,
        manageStatementsNavigationUrl: '/manage-statements',
      } as Partial<AccountStatementRetailJourneyConfiguration>,
    },
    {
      provide: ACCOUNT_STATEMENT_CATEGORIES_TOKEN,
      useValue: {
        Account: $localize`:@@account-statements.category.account:Account`,
        'Credit Card': $localize`:@@account-statements.category.creditCard:Credit Card`,
        Mortgage: $localize`:@@account-statements.category.mortgage:Mortgage`,
        'Tax Form': $localize`:@@account-statements.category.taxForm:Tax Form`,
        LOC: $localize`:@@account-statements.category.loc:LOC`,
        EELOC: $localize`:@@account-statements.category.eeloc:EELOC`,
      },
    },
    {
      provide: ACCOUNT_STATEMENT_TABLE_CONFIG_TOKEN,
      useValue: [
        {
          key: 'date',
          name: $localize`:@@account-statement.table.header.date:Book date`,
          sortable: true,
        },
        {
          key: 'category',
          name: $localize`:@@account-statement.table.header.category:Category`,
          sortable: true,
        },
        {
          key: 'description',
          name: $localize`:@@account-statement.table.header.description:Description`,
          sortable: true,
        },
      ],
    },
    {
      provide: MIME_TYPE_EXTENSIONS_TOKEN,
      useValue: {
        'application/pdf': 'PDF',
        'text/csv': 'CSV',
        'text/plain': 'TXT',
        'application/rtf': 'RTF',
        'application/msword': 'DOC',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          'DOC',
        'application/vnd.ms-excel': 'XLS',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLS',
        'application/xml': 'XML',
        'image/png': 'PNG',
        'image/jpeg': 'JPG',
        'image/gif': 'GIF',
        'image/tiff': 'TIFF',
        'binary/octet-stream': 'File',
      }
    }
  ],
  declarations: [
    AccountStatementJourneyComponent
  ],
})

export class AccountStatementJourneyModule {
  static forRoot(data = {
    routes: accountStatementRetailJourney,
  }) {
    return {
      ngModule: AccountStatementRetailJourneyModule,
      providers: [
        provideRoutes([data.routes]),
        categoriesProvider,
        extensionsProvider,
        tableConfigProvider,
        ProductSummaryHttpService,
        AccountStatementHttpService,
      ],
    };
  }
}
