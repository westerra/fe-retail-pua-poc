import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bb-accounts-list-header',
  template: `
    <div class="bb-heading-widget heading-widget px-0 flex-row align-items-center">
      <bb-header-ui headingType="h1" headingClasses="bb-heading-widget__heading" [heading]="myAccounts"></bb-header-ui>

      <!-- <ng-container *ngIf="isManageAccountsEnabled">
        <ng-container *ngIf="isAccountLinkingEnabled; else button">
          <ng-container *bbIfEntitlements="entitlementsKey; else button">
            <bb-dropdown-menu-ui
              container="body"
              position="bottom"
              icon="caret-down"
              btnColor="primary"
              iconSize="md"
              buttonSize="md"
              data-role="manage-accounts-dropdown"
              *ngIf="!isManageAccountsLoading; else loadingButton"
            >
              <ng-template bbDropdownLabel>
                <span>{{ manageAccounts }}</span>
              </ng-template>
              <ng-template bbDropdownMenuItem>
                <button
                  data-role="edit-accounts"
                  role="menuitem"
                  class="dropdown-item"
                  (click)="editAccountsAction.emit()"
                >
                  {{ editAccounts }}
                </button>
                <button
                  data-role="connect-external-account"
                  role="menuitem"
                  class="dropdown-item"
                  (click)="connectExternalAccountAction.emit()"
                >
                  {{ connectExternalAccount }}
                </button>
              </ng-template>
            </bb-dropdown-menu-ui>
            <ng-template #loadingButton>
              <bb-load-button-ui color="primary" [isLoading]="true" buttonSize="md">
                <span>{{ manageAccounts }}</span>
              </bb-load-button-ui>
            </ng-template>
          </ng-container>
        </ng-container>

        <ng-template #button>
          <button
            (click)="editAccountsAction.emit()"
            class="bb-heading-widget__button btn btn-link w-auto bb-button bb-button--xs-hide-text m-0"
            data-role="manage-accounts-button"
          >
            <i aria-hidden="true" class="bb-icon bb-icon-settings"></i>
            <span>{{ manageAccounts }}</span>
          </button>
        </ng-template>
      </ng-container> -->
    </div>
  `,
})
export class AccountsListHeaderComponent {
  /**
   * Label for accounts list title
   */
  readonly myAccounts = $localize`:My accounts heading|my accounts heading@@accounts-transactions-journey.accounts-list.heading.myAccounts:My Accounts`;
  /**
   * Label for manage accounts menu dropdown
   */
  readonly manageAccounts = $localize`:Manage accounts button title|manage accounts button title@@accounts-transactions-journey.accounts-list.buttonTitle.manageAccounts:Manage Accounts`;
  /**
   * Label for edit accounts navigation button
   */
  readonly editAccounts = $localize`:Edit accounts button title|edit accounts button title@@accounts-transactions-journey.accounts-list.buttonTitle.editAccounts:Edit Accounts`;
  /**
   * Label for connect an external account button
   */
  readonly connectExternalAccount = $localize`:Connect an external account button title|connect an external account button title@@accounts-transactions-journey.accounts-list.buttonTitle.connectExternalAccount:Connect an External Account`;

  /**
   * Input for displaying loading indicator on the button
   */
  @Input() isManageAccountsLoading = false;

  /**
   * Input for displaying loading indicator on the button
   */
  @Input() isManageAccountsEnabled = true;

  /**
   * Input for enabling account linking
   */
  @Input() isAccountLinkingEnabled = false;

  /**
   * Event emitter for the edit accounts button action
   */
  @Output() editAccountsAction = new EventEmitter<void>();

  /**
   * Event emitter for the connect external account button action
   */
  @Output() connectExternalAccountAction = new EventEmitter<void>();

  entitlementsKey = 'ExternalAccounts.ManageExternalAccounts.create';
}
