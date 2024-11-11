import { Component, Input } from '@angular/core';
import { AddressRecordFormComponent, UserProfileWrapperService } from '@backbase/identity-user-profile-features';
import { countryList, stateLabelValues } from '../../../services/constants';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IdentitySelfJourneyCustomService } from '../../services/identity-self-journey-custom.service';

@Component({
  selector: 'bb-identity-address-record-form-custom',
  templateUrl: './identity-address-record-form-custom.component.html',
})
export class IdentityAddressRecordFormCustomComponent extends AddressRecordFormComponent {
  public countrySubDivisionOptions = stateLabelValues;
  public countryOptions = countryList;
  public nonUSCountrySelected = false;
  public formSubmitted = false;

  public profile$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public existingAddressTypes = [];

  @Input() isEditMode: boolean = false;

  constructor(
    formBuilder: FormBuilder,
    private userProfileService: UserProfileWrapperService,
    private identitySelfServiceCustom: IdentitySelfJourneyCustomService,
  ) {
    super(formBuilder);

    this.getProfileData();

    // Setup state, province or region values
    this.updateStateValue(true);

    // Setup country values
    this.setInitialCountryValue();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.detectFormChanges();
  }

  /**  Postcode Format into 00000 - 0000 when input is entered as Masking not working */
  formatPostcode(e: any, formData: any) {
    let val = e.target.value;
    let control = formData?.get('postalCode');

    if (val[6] === undefined && val.length > 5) {
      val = val.replace('-', '');
      e.target.value = val;
      control.setValue(val);
    }

    if (val.length > 5) {
      val.length !== 10
        ? control.setErrors({
            postcodeminlength: true,
          })
        : '';

      e.target.value = val
        .replace(/\D/g, '')
        .replace(/(\d{1,9})(\d{1,3})?(\d{1,3})?/g, (_txt: any, f: any, s: any, t: any) => {
          if (_txt.length > 5) {
            return `${_txt.slice(0, 5)}-${_txt.slice(5, 9)}`;
          } else {
            return `${_txt.slice(0, 5)}`;
          }
        });
    }
  }

  /** Display Error Message for PO Box input in address value (building number) field when type of address is Home only */
  checkAddressValidation(_addressField: string, formData: any) {
    let addressType = formData?.get('type').value;
    let addressFieldValue = formData?.get(_addressField).value;

    if (addressType == 'Home') {
      addressFieldValue = addressFieldValue.toLowerCase();
      if (
        addressFieldValue.includes('po box') ||
        addressFieldValue.includes('p.o box') ||
        addressFieldValue.includes('p o box') ||
        addressFieldValue.includes('p/o box') ||
        addressFieldValue.includes('box po') ||
        addressFieldValue.includes('box p.o') ||
        addressFieldValue.includes('po. box') ||
        addressFieldValue.includes('p.o. box')
      ) {
        formData?.get(_addressField).setErrors({
          POBox: true,
        });
      } else {
        this.removePOBoxValidation(_addressField, formData);
      }
    } else {
      this.removePOBoxValidation(_addressField, formData);
    }
  }

  removePOBoxValidation(_addressField: string, form: any) {
    let control = form?.get(_addressField);

    if (control.hasError('POBox')) {
      const { POBox, ...errors } = control.errors;
      control.setErrors(errors);
      control.setValue(control.value);
      control.updateValueAndValidity();
      form.updateValueAndValidity();
    }
  }

  updateAddressValidation(formData: any) {
    this.checkAddressValidation('buildingNumber', formData);
    this.checkAddressValidation('streetName', formData);
  }

  /**
   * To detect form related changes.
   * Here its used only to check for changes in country dropdown value.
   */
  detectFormChanges() {
    this.form.get('country')?.valueChanges.subscribe((res) => {
      if (res !== 'US') {
        this.nonUSCountrySelected = true;
      } else if (res === 'US') {
        this.nonUSCountrySelected = false;
      }

      this.updateStateValue(!this.nonUSCountrySelected);
    });
  }

  /**
   * To update state value based on the country value
   * While changing a country, the state value gets cleared.
   * The state value gets reset with an initial value, once the country value has been changed to 'US'
   */
  updateStateValue(initial: boolean = false) {
    let defaultValue = this.form?.controls?.countrySubDivision?.value;
    let checkCountryValue = this.form?.controls?.country ? this.form?.controls?.country?.value === 'US' : true;

    if (initial) {
      defaultValue = this.countrySubDivisionOptions[0].value;
    }

    this.form.controls.countrySubDivision.setValue(checkCountryValue ? defaultValue : '');
    this.form.controls.countrySubDivision.setValidators(checkCountryValue ? [Validators.required] : []);
    this.form.controls.countrySubDivision.updateValueAndValidity();
  }

  /**
   * To setup initial value for the county dropdown
   * Default value is set to 'US'
   */
  setInitialCountryValue() {
    this.form.addControl('country', new FormControl(null, [Validators.required]));
    this.form.controls.country.setValue('US');
    this.form.controls.country.updateValueAndValidity();
  }

  getProfileData() {
    this.userProfileService.dataService.getUserProfile$.subscribe((res: any) => {
      this.profile$.next(res);

      let contactAddresses = this.profile$.value['postal-addresses'];

      contactAddresses.forEach((element) => {
        this.existingAddressTypes.push(this.identitySelfServiceCustom.updatedAddressType(element.type));
      });
    });
  }

  checkIfDisbaled(value: any) {
    if (this.profile$.value) {
      let typeIndex = this.existingAddressTypes.findIndex((item) => item === value);

      return typeIndex !== -1;
    } else {
      return false;
    }
  }
}
