import { TestBed } from '@angular/core/testing';
import { AccountsState } from '@backbase/accounts-transactions-journey-ang';
import { AccountsStateCommunicationService } from './accounts-state-communication.service';

describe('AccountsStateCommunicationService', () => {
  let service: AccountsStateCommunicationService;
  const accountsState: AccountsState = {
    refreshAccounts: jasmine.createSpy('refreshAccounts'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsStateCommunicationService);
    service['accountsState'] = undefined;
  });

  it('should accounts state be undefined initially', () => {
    service['refreshAccounts']();
    expect(service['accountsState']).toBeUndefined();
  });

  it('should setup accounts state', () => {
    service.setupAccountsState(accountsState);
    expect(service['accountsState']).toBeDefined();
  });

  it('should refresh accounts on successful transfer', () => {
    service.setupAccountsState(accountsState);
    service.transferSucceeded();
    expect(accountsState.refreshAccounts).toHaveBeenCalled();
  });
});
