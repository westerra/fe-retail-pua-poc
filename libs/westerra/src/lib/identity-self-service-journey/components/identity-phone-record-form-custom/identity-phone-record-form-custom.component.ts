import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PhoneRecordFormComponent, UserProfileWrapperService } from '@backbase/identity-user-profile-features';
import { PhoneNumberPipe } from '@backbase/ui-ang/phone-number-format-pipe';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'bb-identity-phone-record-form-custom',
  templateUrl: './identity-phone-record-form-custom.component.html',
  styles: ['.bb-force-ltr{ direction:ltr; }'],
})
export class IdentityPhoneRecordFormCustomComponent extends PhoneRecordFormComponent {
  public phoneNumberMaxDigitLimit = 10;
  public phoneNumberMinDigitLimit = 10;
  public phoneNumberHasCorrectLength: boolean = false;

  public profile$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public existingPhoneTypes = [];

  public updatedFormTitle = 'Phone number';

  @Input() isEditMode: boolean = false;

  constructor(
    formBuilder: FormBuilder,
    phoneNumberFormatter: PhoneNumberPipe,
    private userProfileService: UserProfileWrapperService,
  ) {
    super(formBuilder, phoneNumberFormatter);

    this.getProfileData();
  }
  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    /* 
    To be used when phone number is to be validated w.r.t default country code
    */
    // this.updatePhoneNumberWithDefaultCountryCode();

    this.updateMaxlengthForPhoneNumberField();

    /*
     * To update form title based on the type being edited. Only called on edit mode
     */
    this.updateFormTitle();
  }

  updatePhoneNumberWithDefaultCountryCode() {
    let phoneNumberValue = this.form.controls.number.value;
    let countryCodeDigitCount = phoneNumberValue.split('+1').length - 1;
    if (countryCodeDigitCount === 0) {
      let updatedPhoneNumber = '+1' + phoneNumberValue;
      this.form.patchValue({
        ['number']: updatedPhoneNumber,
      });
      this.form.updateValueAndValidity();
    }
  }

  updateMaxlengthForPhoneNumberField() {
    let phoneNumberValue = this.form.controls.number.value;
    let phoneNumberWithoutCountryCode = phoneNumberValue.replace('+1', '').replaceAll(' ', '');

    let spaceCount = phoneNumberValue.split(' ').length - 1;
    let countryCodeDigitCount = phoneNumberValue.split('+1').length - 1;

    // To set up minimum length validation
    if (phoneNumberValue) {
      this.form.controls.number.setValidators(
        Validators.minLength(
          spaceCount === 0 ? 10 : spaceCount > 0 && spaceCount < 3 ? this.phoneNumberMaxDigitLimit : 15,
        ),
      );
      this.form.controls.number.updateValueAndValidity();
    }

    /* 
    15 is the max count of digits in the number field
    which includes 10 digits of number,
    3 whitespace and 2 digits for country code.

    Upon decrementing one number the 
    whitespace count decreases from 3 to 1.  
    
    So the whitespace count decrement must be 
    reduced from the max count of 15 to ensure 
    only 10 digits of phone number is entered  */

    if (spaceCount === 0) {
      this.phoneNumberMaxDigitLimit = 10;
    } else if (spaceCount <= 1 && countryCodeDigitCount === 0) {
      // To counter the invalid phone number digit count in edit number form
      this.phoneNumberMaxDigitLimit = 11;
    } else if (spaceCount >= 1 && phoneNumberValue.length < 15) {
      this.phoneNumberMaxDigitLimit = phoneNumberValue.length + (13 - phoneNumberValue.length);
    } else if (phoneNumberValue.length === 15) {
      this.phoneNumberMaxDigitLimit = 15;
    }

    this.phoneNumberHasCorrectLength =
      phoneNumberWithoutCountryCode.length === this.phoneNumberMinDigitLimit ? true : false;
  }

  getProfileData() {
    this.userProfileService.dataService.getUserProfile$.subscribe((res: any) => {
      this.profile$.next(res);

      let phoneAddresses = this.profile$.value['phone-addresses'];

      phoneAddresses.forEach((element) => {
        this.existingPhoneTypes.push(element.type);
      });
    });
  }

  checkIfDisbaled(value: any) {
    if (this.profile$.value) {
      let typeIndex = this.existingPhoneTypes.findIndex((item) => item === value);
      return typeIndex !== -1;
    } else {
      return false;
    }
  }

  updateFormTitle() {
    this.updatedFormTitle = !this.isEditMode ? this.updatedFormTitle : `${this.form.controls.type.value} phone number`;
  }
}
