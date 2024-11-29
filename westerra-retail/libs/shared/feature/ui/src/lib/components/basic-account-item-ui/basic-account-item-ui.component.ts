import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bb-basic-account-item-ui',
  templateUrl: './basic-account-item-ui.component.html',
})
export class BasicAccountItemUiComponent implements OnInit {
  @Input() account: any = null;
  ngOnInit(): void {}
}
