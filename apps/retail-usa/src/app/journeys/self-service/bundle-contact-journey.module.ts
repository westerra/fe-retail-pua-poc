import { NgModule, Provider } from '@angular/core';
import {
  CanDeactivateGuard,
  ContactManagerDetailViewComponent,
  ContactManagerJourneyComponent,
  ContactManagerJourneyConfig,
  ContactManagerJourneyConfigurationToken,
  ContactManagerJourneyModule,
  ContactManagerTypeListViewComponent,
} from '@backbase/contact-manager-journey-ang';
import { ContactManagerFormViewCustomComponent } from '@backbase/westerra';

const ContactManagerConfigProviders: Provider = {
  provide: ContactManagerJourneyConfigurationToken,
  useValue: {
    newContact: true,
    pageSize: 5,
    maxNavPages: 3,
    paginationType: 'pagination',
    notificationDismissTime: 5000,
    createContactIBAN: false,
    createContactAccount: true,
    createContactPhone: false,
    createContactEmail: false,
  } as Partial<ContactManagerJourneyConfig>,
};

const ContactJourneyCustomRoutes = [
  {
    path: '',
    component: ContactManagerJourneyComponent,
    children: [
      {
        path: '',
        component: ContactManagerDetailViewComponent,
      },
      {
        path: 'select',
        component: ContactManagerTypeListViewComponent,
      },
      {
        path: ':id',
        component: ContactManagerDetailViewComponent,
      },

      {
        path: 'edit/:id/:type',
        canDeactivate: [CanDeactivateGuard],
        component: ContactManagerFormViewCustomComponent,
      },
    ],
  },
];

@NgModule({
  imports: [ContactManagerJourneyModule.forRoot({ routes: ContactJourneyCustomRoutes })],
  providers: [ContactManagerConfigProviders],
})
export class ContactManagerJourneyBundleModule {}
