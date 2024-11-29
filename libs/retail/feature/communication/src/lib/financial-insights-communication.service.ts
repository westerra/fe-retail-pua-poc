import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BudgetDetails,
  CashFlowCommunicationService,
  CategoryDetails,
  CreateCategoryData,
} from '@backbase/cashflow-journey-ang';
import { BudgetsCommunicationService } from '@backbase/fi-budget-journey-ang';
@Injectable({
  providedIn: 'root',
})
export class FinancialInsightsCommunicationService
  implements BudgetsCommunicationService, CashFlowCommunicationService
{
  constructor(private readonly router: Router) {}

  navigateToInsightsDashboard(route: string, queryParams?: { date: string; arrangementIds: string }): void {
    this.router.navigate([route], {
      queryParams: queryParams,
    });
  }

  navigateToViewAllBudgets(): void {
    this.router.navigate(['insights-dashboard/budgets']);
  }

  navigateToCategoryDetails(categoryDetails: CategoryDetails): void {
    this.router.navigate([
      'insights-dashboard/budgets/category',
      categoryDetails.categoryName,
      categoryDetails.periodStartDate,
      categoryDetails.periodEndDate,
      categoryDetails.arrangementIds,
      categoryDetails.creditDebitIndicator,
      categoryDetails.accountsSelected,
    ]);
  }

  navigateToCreateBudget(navigatedFrom: string, routeParam?: CreateCategoryData): void {
    if (routeParam) {
      this.router.navigate(
        [
          'budgets/create',
          {
            name: routeParam?.categoryName,
            id: routeParam?.categoryId,
          },
        ],
        {
          state: {
            data: navigatedFrom,
            arrangementIds: routeParam.arrangementIds,
            accountsSelected: routeParam.accountsSelected,
          },
        },
      );
    } else {
      this.router.navigate(['budgets/create'], { state: { data: navigatedFrom } });
    }
  }

  navigateToEditBudget(
    details: BudgetDetails,
    data?: string,
    arrangementIds?: string,
    accountsSelected?: string,
  ): void {
    this.router.navigate(['budgets/edit', details.categoryName, details.id, details.amount], {
      state: { data: data, arrangementIds: arrangementIds, accountsSelected: accountsSelected },
    });
  }
}
