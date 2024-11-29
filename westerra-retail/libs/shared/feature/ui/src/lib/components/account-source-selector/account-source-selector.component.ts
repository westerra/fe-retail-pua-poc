import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'bb-account-source-selector',
  templateUrl: './account-source-selector.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccountSourceSelectorComponent),
      multi: true,
    },
  ],
})

// extends DropdownSingleSelectComponent
export class AccountSourceSelectorComponent implements OnInit, ControlValueAccessor {
  @Input() id: string = 'account-selector-component';

  @Input() selectedAccount: any = null;

  @Input() accountsList: Array<any> = [];

  @Input() label: string | null = null;

  @Input() placeholder: string = ' Select an account ';

  onChange: (_: any) => {};

  ngOnInit(): void {}

  /*
     Default ControlValueAccessor methods used
    */
  writeValue(obj: any): void {
    this.selectedAccount = obj;
  }
  registerOnChange(fn: (_: any) => {}) {
    this.onChange = fn;
  }
  changeSelectedOption(option: any) {
    this.selectedAccount = option;
    this.onChange(option);
  }

  registerOnTouched(fn: any): void {}
}
