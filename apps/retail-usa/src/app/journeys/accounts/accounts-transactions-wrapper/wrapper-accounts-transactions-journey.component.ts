import { Component, OnInit } from '@angular/core';
import { RemoteConfigService } from '@backbase/remote-config-ang';
import { PERMISSIONS } from '../../../auth/permissions';
import { RetailAppRemoteConfig } from '../../../remote-config/remote-config';
import { QuickActionLink } from '../quick-actions.component';

@Component({
  selector: 'bb-accounts-transactions-journey-wrapper',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-12 no-print">
          <ng-container *ngIf="remoteConfigParameters.showMaintenanceBanner">
            <bb-alert-ui
              modifier="warning"
              title="Maintenance alert"
              i18n-title="@@accounts.remote-config-banner.title"
              dismissible="true"
              (close)="hideMaintenanceBanner()"
            >
              <p i18n="@@accounts.remote-config-banner.text">
                {{ remoteConfigParameters.maintenanceBannerText }}
              </p>
            </bb-alert-ui>
          </ng-container>
         <!-- <ng-container *ngIf="isClosingAccountAlertShown">
            <bb-alert-ui
              modifier="warning"
              title="Reminder: Activate Your Card(s) Now"
              dismissible="true"
              (close)="hideClosingAccountAlert()"
            >
              <p>
                We want to ensure members’ use of their Westerra debit and credit cards are not disrupted! <br> If you have recently received a new debit or credit card and have NOT activated it, please do so as soon as possible. <br> To activate your card, call 1-866-762-0558.
              </p>
            </bb-alert-ui>
          </ng-container> -->
        </div>
        <div class="col-md-8">
          <router-outlet></router-outlet>
        </div>
        <div class="col-md-4 pt-5">
          <!-- 
        <div class="mb-4 mt-5">
            <bb-campaign-space-ang name="bb-campaign-space-ang-0"></bb-campaign-space-ang> 
          </div>
          <div class="card bb-block--xl">
            <bb-quick-transfer-journey></bb-quick-transfer-journey>
          </div>
           -->
          <div class="card no-print">
            <bb-quick-actions [links]="quickActionLinks"></bb-quick-actions>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AccountsTransactionsJourneyWrapperComponent implements OnInit {
  remoteConfigParameters = {
    showMaintenanceBanner: this.remoteConfigService.getValue('show_maintenance_banner'),
    maintenanceBannerText: this.remoteConfigService.getValue('maintenance_banner_text'),
  };

  quickActionLinks: QuickActionLink[] = [
    {
      menuIcon: 'settings',
      title: $localize`:Link Title|Manage accounts@@accounts.quick-actions.span.manageAccounts:Manage Accounts`,
      url: '/my-accounts/manage',
      permission: PERMISSIONS.canViewMyAccounts,
    },
    {
      menuIcon: 'receipt',
      title: $localize`:Link Title|Pay bills@@accounts.quick-actions.span.payABill:Pay Bills`,
      url: '/transfers/OneTimePayment',
      permission: PERMISSIONS.canViewPayABill,
    },
    {
      menuIcon: 'description',
      title: $localize`:Link Title|Account statements@@accounts.quick-actions.span.account-statements:Account Statements`,
      url: '/self-service/download-statements',
      permission: PERMISSIONS.canViewAccountStatements,
    },
    {
      menuIcon: 'chat',
      title: $localize`:Link Title|Dispute a Transaction@@accounts.quick-actions.span.dispute-a-transation:Dispute a Transaction`,
      externalUrl: "https://www.westerracu.com/resources/forms?q=card-dispute-forms",
      permission: PERMISSIONS.canViewAccountStatements,
    },
    {
      menuIcon: 'notifications-active',
      title: $localize`:Link Title|Manage notifications@@accounts.quick-actions.span.manageNotifications:Manage Notifications`,
      url: '/self-service/product-list/manage-notifications',
      permission: PERMISSIONS.canViewManageNotifications,
    },
    // {
    //   menuIcon: 'flight',
    //   title: $localize`:Link Title|Set travel notice@@accounts.quick-actions.span.setTravelNotice:Set Travel Notice`,
    //   url: '/self-service/manage-cards/travel-notice',
    //   permission: PERMISSIONS.canViewManageCards,
    // },
    {
      menuIcon: 'room',
      title: $localize`:Link Title|Find Us@@accounts.quick-actions.span.findUs:Find Us`,
      url: '/more/find-us',
      permission: PERMISSIONS.canViewSelfServiceAlone,
    },
    {
      menuIcon: 'local-play',
      title: $localize`:Link Title|Cash Rewards@@accounts.quick-actions.span.cardRewards:Card Rewards`,
      url: '/cardRewards',
      permission: PERMISSIONS.canViewSelfServiceAlone,
    },
    {
      menuIcon: 'local-phone',
      title: $localize`:Link Title|Schedule an Appointment@@accounts.quick-actions.span.schedule-appointment:Schedule an Appointment`,
      url: null,
      externalUrl:
        location.href.match(/localhost/) ||
          location.href.match(/dev/) ||
          location.href.match(/sit/) ||
          location.href.match(/uat/)
          ? 'https://ui-stage.timetradesystems.com/app/westerracu/workflows/westerra001/schedule'
          : 'https://www.timetrade.com/app/westerracu/workflows/westerra002/schedule?resourceId=any',
      permission: PERMISSIONS.canViewSelfServiceAlone,
    },
  ];

  public isClosingAccountAlertShown:boolean=false;
  
  constructor(private remoteConfigService: RemoteConfigService<RetailAppRemoteConfig>) { }

  ngOnInit() {
    this.isClosingAccountAlertShown = localStorage.getItem('showclosingAccountAlert') === 'true';
  }
  
  hideMaintenanceBanner() {
    this.remoteConfigParameters.showMaintenanceBanner = false;
  }

  hideClosingAccountAlert() {
    this.isClosingAccountAlertShown = false;
    localStorage.setItem('showclosingAccountAlert', 'false');
  }
}
