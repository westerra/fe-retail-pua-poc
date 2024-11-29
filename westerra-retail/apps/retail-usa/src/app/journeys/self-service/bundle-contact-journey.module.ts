import { NgModule, Provider } from '@angular/core';
import {
  ContactManagerDetailViewComponent,
  ContactManagerJourneyComponent,
  ContactManagerJourneyConfig,
  ContactManagerJourneyConfigurationToken,
  ContactManagerJourneyModule,
  ContactManagerListViewComponent,
  ContactManagerTypeListViewComponent,
  DiscardChangesGuard,
} from '@backbase/contact-manager-journey-ang';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
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

const contactManagerDefaultRoutes = [
  {
      path: '',
      component: ContactManagerJourneyComponent,
      children: [
          {
              path: '',
              component: ContactManagerListViewComponent,
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
                      canDeactivate: [DiscardChangesGuard],
                      component: ContactManagerFormViewCustomComponent,
                  },
              ],
          },
      ],
  },
];

@NgModule({
  imports: [ContactManagerJourneyModule.forRoot({ routes: contactManagerDefaultRoutes })],
  providers: [ContactManagerConfigProviders],
})
export class ContactManagerJourneyBundleModule {}
