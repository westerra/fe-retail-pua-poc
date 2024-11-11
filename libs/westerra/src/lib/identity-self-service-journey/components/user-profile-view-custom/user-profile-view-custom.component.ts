import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewUserProfileViewComponent } from '@backbase/identity-user-profile-features';
import { IdentityUserProfileJourneyConfigurationService } from '@backbase/identity-user-profile-util';
import { NotificationService } from '@backbase/ui-ang/notification';
import { UserProfileWrapperService } from '@backbase/identity-user-profile-features';
import { IdentitySelfJourneyCustomService } from '../../services/identity-self-journey-custom.service';

@Component({
  selector: 'bb-user-profile-view-custom',
  templateUrl: './user-profile-view-custom.component.html',
  styleUrls: ['./user-profile-view-custom.component.scss'],
})
export class UserProfileViewCustomComponent extends ViewUserProfileViewComponent {
  private readonly ADDRESS_OPTIONS_CONFIG_CUSTOM = [
    {
      type: 'EDIT',
      label: $localize`:Menu item label for changing address@@bb-user-profile-features.view-user-profile-view.options-menu-item-button-text.change-postal:Change`,
      action: this.changeAddressClick.bind(this),
      dataRole: 'view-user-profile-address-edit-button',
    },
    {
      type: 'REMOVE',
      label: $localize`:Menu item label for removing an address@@bb-user-profile-features.view-user-profile-view.options-menu-item-button-text.remove-postal:Remove`,
      action: this.removeAddressClick.bind(this),
      dataRole: 'view-user-profile-postal-delete-button',
    },
  ];

  private readonly optionTypes = {
    edit: 'EDIT',
    remove: 'REMOVE',
  };

  constructor(
    public configService: IdentityUserProfileJourneyConfigurationService,
    router: Router,
    activatedRoute: ActivatedRoute,
    wrapper: UserProfileWrapperService,
    notificationService: NotificationService,
    private identitySelfServiceCustom: IdentitySelfJourneyCustomService,
  ) {
    super(configService, router, activatedRoute, wrapper, notificationService);
  }

  updatedAddressOptions(addressItem, index: any) {
    let addressOptionsToBeReturned: any = this.ADDRESS_OPTIONS_CONFIG_CUSTOM;
    addressOptionsToBeReturned = addressItem.primary
      ? this.removeConfigOptions(addressOptionsToBeReturned, this.optionTypes.remove)
      : this.addressOptions;
    return addressOptionsToBeReturned;
  }

  removeConfigOptions(mode: any, type: any) {
    let modeReturned = [];
    if (mode.length) {
      modeReturned = mode.filter((item) => !item.type.includes(type));
    }
    return modeReturned;
  }

  updatedAddressType(type: string) {
    return this.identitySelfServiceCustom.updatedAddressType(type);
  }
}
