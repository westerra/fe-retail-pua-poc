import { Injectable } from '@angular/core';
import { catchError, map, of, pluck } from 'rxjs';
import { FinancialInstitutionManagerClientHttpService } from '@backbase/financial-institution-manager-http-ang';
import { hasExternalInfo } from '@backbase/actions-retail-notification-preferences-journey-util';

@Injectable({
  providedIn: 'root',
  // providedIn: ActionsRetailNotificationsPreferencesExtendedModule,
})
export class AccountsExternalInfoService {
  private readonly financialInstitutionsHttpService;
  // private getAssignedFinancialInstitutionIds;
  // private addExternalInfoToAccount;
  // private getExternalInfo;
  // private getFinancialInstitutions$;
  constructor(financialInstitutionsHttpService: FinancialInstitutionManagerClientHttpService) {
    this.financialInstitutionsHttpService = financialInstitutionsHttpService;
  }
  getAccountsWithExternalInfo$(accounts) {
    const accountsList = Array.isArray(accounts) ? accounts : [accounts];
    const financialInstitutionIds = this.getAssignedFinancialInstitutionIds(accountsList);
    return financialInstitutionIds.length
      ? this.getFinancialInstitutions$(financialInstitutionIds).pipe(
          map((institutions) =>
            Array.isArray(accounts)
              ? accountsList.map((account) => this.addExternalInfoToAccount(account, institutions))
              : this.addExternalInfoToAccount(accounts, institutions),
          ),
          catchError(() => of(accounts)),
        )
      : of(accounts);
  }
  getAssignedFinancialInstitutionIds(items) {
    const itemsWithExternalInfo = items.filter(hasExternalInfo);
    const financialInstitutionIds = itemsWithExternalInfo.map((item) => item.financialInstitutionId);
    return financialInstitutionIds.filter((item, index) => financialInstitutionIds.indexOf(item, index + 1) === -1);
  }
  addExternalInfoToAccount(account, institutions) {
    return { ...account, ...this.getExternalInfo(account, institutions) };
  }
  getExternalInfo(account, institutions) {
    const isExternalInfoAvailable = hasExternalInfo(account);
    return isExternalInfoAvailable
      ? { financialInstitution: institutions.find((institution) => institution.id === account.financialInstitutionId) }
      : {};
  }
  getFinancialInstitutions$(ids) {
    return this.financialInstitutionsHttpService.getFinancialInstitutions({ ids }).pipe(pluck('financialInstitutions'));
  }
}
