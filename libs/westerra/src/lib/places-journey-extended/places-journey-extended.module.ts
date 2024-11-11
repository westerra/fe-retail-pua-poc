import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesViewCustomComponent } from './components/places-view-custom/places-view-custom.component';
import { provideRoutes } from '@angular/router';
import {
  PlacesJourneyComponent,
  PlacesJourneyConfigService,
  PlacesService,
  PlacesJourneyModule,
} from '@backbase/places-journey-ang';
import { HeaderModule } from '@backbase/ui-ang/header';
import { MapAPILoaderService } from './services/map-api-loader.service';
import { MapHelpersService } from './services/map-helpers.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyStateModule } from '@backbase/ui-ang/empty-state';
import { ErrorCommonStateModule } from '@backbase/ui-ang/common-error-state';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { IconModule } from '@backbase/ui-ang/icon';
import { ButtonModule } from '@backbase/ui-ang/button';
import { CollapsibleModule } from '@backbase/ui-ang/collapsible';
import { CollapsibleAccordionModule } from '@backbase/ui-ang/collapsible-accordion';
import { InputCheckboxModule } from '@backbase/ui-ang/input-checkbox';
import { MapSearchUiCustomComponent } from './components/map-search-ui-custom/map-search-ui-custom.component';
import { SearchBoxModule } from '@backbase/ui-ang/search-box';
import { PlacesListCustomComponent } from './components/places-list-custom/places-list-custom.component';
import { PlacesDetailsCustomComponent } from './components/places-details-custom/places-details-custom.component';
import { WorkTimesCustomComponent } from './components/work-times-custom/work-times-custom.component';
import { MapWrapperCustomComponent } from './components/map-wrapper-custom/map-wrapper-custom.component';
import { MapUiCustomComponent } from './components/map-ui-custom/map-ui-custom.component';

export const placesJourneyCustomRoutes = {
  path: '',
  component: PlacesJourneyComponent,
  children: [
    {
      path: '',
      component: PlacesViewCustomComponent,
      data: { title: 'Places' },
    },
  ],
};

const uiModules = [
  HeaderModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  EmptyStateModule,
  ErrorCommonStateModule,
  LoadingIndicatorModule,
  IconModule,
  ButtonModule,
  CollapsibleModule,
  CollapsibleAccordionModule,
  InputCheckboxModule,
];

const internalModules = [
  // PlacesJourneyModule,
  SearchBoxModule,
];

const components = [
  PlacesViewCustomComponent,
  MapSearchUiCustomComponent,
  PlacesListCustomComponent,
  PlacesDetailsCustomComponent,
  WorkTimesCustomComponent,
  MapWrapperCustomComponent,
  MapUiCustomComponent,
];

const internalServices = [PlacesJourneyConfigService, PlacesService, MapAPILoaderService, MapHelpersService];

@NgModule({
  declarations: [...components],
  imports: [...uiModules, ...internalModules],
  providers: [...internalServices],
  exports: [...components],
})
export class PlacesJourneyExtendedModule {
  static forRoot(data = { route: placesJourneyCustomRoutes }) {
    return {
      ngModule: PlacesJourneyExtendedModule,
      providers: [provideRoutes([data.route])],
    };
  }
}
