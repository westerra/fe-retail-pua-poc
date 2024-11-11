/* eslint-disable import/no-extraneous-dependencies */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MaskableAttribute } from '@backbase/arrangement-manager-http-ang';
import { getValue, isDefined } from '@backbase/internal-at-shared-util-ang';
import {
  AccountInfoProperty,
  AccountInfoPropertyType,
  getAccountNumberAttribute,
} from '@backbase/internal-at-shared-ui-ang';
import { AccountArrangementItem, AccountMaskableAttribute } from '@backbase/internal-at-shared-data-access-ang';
import { AccountInfoPropertyGroup } from '@backbase/accounts-transactions-journey-ang';

@Component({
  selector: 'bb-account-info-container-extended',
  templateUrl: './account-info-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountInfoContainerComponent implements OnChanges {
  /**
   * Account data
   */
  @Input() account: AccountArrangementItem | undefined;
  /**
   * Account info properties configuration
   */
  @Input() propertiesConfiguration: AccountInfoPropertyGroup[] = [];
  /**
   * Currency displaying mode
   */
  @Input() currencyFormat: 'code' | 'symbol' = 'symbol';
  /**
   * Date format
   */
  @Input() dateFormat = 'longDate';
  /**
   * Attributes configuration
   */
  @Input() attributesConfiguration: AccountMaskableAttribute[] = [];
  /**
   * Mask attribute event emitter
   */
  @Output() mask: EventEmitter<AccountMaskableAttribute> = new EventEmitter<AccountMaskableAttribute>();

  /**
   * Sanitized properties configuration
   */
  propertyGroups: AccountInfoPropertyGroup[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.account || changes.propertiesConfiguration) {
      this.propertyGroups = this.getDefinedPropertyGroups();
      this.checkIfMortgageAccount();
    }
  }

  isPropertyMaskable(property: AccountInfoProperty): boolean {
    const attributeName = this.getMaskableAttributeName(property);
    const isProprtyCanBeMasked = (this.account?.unmaskableAttributes ?? []).includes(attributeName);
    const isExternalAccount = this.account?.financialInstitutionId !== undefined;
    return isProprtyCanBeMasked && !isExternalAccount;
  }

  isPropertyMasked(property: AccountInfoProperty): boolean {
    const attribute = this.getMaskableAttribute(property);
    return attribute.masked ?? true;
  }

  onPropertyMasked(property: AccountInfoProperty, isMasked: boolean): void {
    const attribute = this.getMaskableAttribute(property);
    this.mask.emit({ ...attribute, masked: isMasked });
  }

  private getMaskableAttribute(property: AccountInfoProperty): AccountMaskableAttribute {
    const attributeName = this.getMaskableAttributeName(property);
    return this.attributesConfiguration.find((item) => item.attributeName === attributeName) || { attributeName };
  }

  private getMaskableAttributeName(
    property: AccountInfoProperty,
    defaultType: MaskableAttribute = 'IBAN',
  ): MaskableAttribute {
    return property.type === AccountInfoPropertyType.ACCOUNT_NUMBER
      ? getAccountNumberAttribute(property.numberType)
      : defaultType;
  }

  private getDefinedPropertyGroups(): AccountInfoPropertyGroup[] {
    return this.propertiesConfiguration
      .map((group) => {
        const properties = group.properties.filter((property) => this.hasValue(property));
        return { ...group, properties };
      })
      .filter((group) => group.properties.length > 0);
  }

  private hasValue(property: AccountInfoProperty): boolean {
    const value = getValue(this.account, property.key ?? '');
    return Array.isArray(value) ? value.length > 0 : isDefined(value);
  }

  checkIfMortgageAccount() {
    if (this.account?.product?.productKind?.kindUri?.toLowerCase() === 'loan') {
      let productTypeName = this.account?.productTypeName?.toLowerCase();
      if (
        productTypeName?.includes('loc') ||
        productTypeName?.includes('overdraft') ||
        productTypeName?.includes('line of credit')
      ) {
        return;
      } else {
        this.propertyGroups[0].properties = this.propertyGroups[0].properties.filter(
          (item: any) => item.label !== 'Available Credit',
        );
      }
    }
  }
}
