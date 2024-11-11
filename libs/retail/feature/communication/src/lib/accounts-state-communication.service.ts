import { Injectable } from '@angular/core';
import {
  AccountsState,
  AccountsStateCommunicationService as AccountsStateCommunicationServiceAPI,
} from '@backbase/accounts-transactions-journey-ang';
import { QuickTransferJourneyCommunicationService } from '@backbase/quick-transfer-journey-ang';

@Injectable({
  providedIn: 'root',
})
export class AccountsStateCommunicationService
  implements AccountsStateCommunicationServiceAPI, QuickTransferJourneyCommunicationService
{
  private accountsState: AccountsState | undefined;

  setupAccountsState(accountsState: AccountsState) {
    this.accountsState = accountsState;
  }

  private refreshAccounts() {
    this.accountsState?.refreshAccounts();
  }

  transferSucceeded(): void {
    this.refreshAccounts();
  }
}
