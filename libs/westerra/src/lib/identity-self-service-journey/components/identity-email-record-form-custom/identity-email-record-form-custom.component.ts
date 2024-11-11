import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { EmailRecordFormComponent, UserProfileWrapperService } from '@backbase/identity-user-profile-features';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'bb-identity-email-record-form-custom',
  templateUrl: './identity-email-record-form-custom.component.html',
})
export class IdentityEmailRecordFormCustomComponent extends EmailRecordFormComponent {
  public userProfileService;
  public profile$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public existingEmailTypes = [];

  @Input() isEditMode: boolean = false;

  constructor(formBuilder: FormBuilder, userProfileService: UserProfileWrapperService) {
    super(formBuilder);

    this.userProfileService = userProfileService;
    this.getProfileData();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  getProfileData() {
    this.userProfileService.dataService.getUserProfile$.subscribe((res: any) => {
      this.profile$.next(res);

      let emailAddresses = this.profile$.value['phone-addresses'];

      emailAddresses.forEach((element) => {
        this.existingEmailTypes.push(element.type);
      });
    });
  }

  checkIfDisbaled(value: any) {
    if (this.profile$.value) {
      let typeIndex = this.existingEmailTypes.findIndex((item) => item === value);
      return typeIndex !== -1;
    } else {
      return false;
    }
  }
}
