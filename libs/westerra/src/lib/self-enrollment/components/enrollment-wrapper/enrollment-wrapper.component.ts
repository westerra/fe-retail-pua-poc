import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@backbase/ui-ang/layout';
import { FocusHandlerService } from 'libs/shared/util/app-core/src/lib/focus-handler.service';

@Component({
  selector: 'bb-enrollment-wrapper',
  templateUrl: './enrollment-wrapper.component.html',
  styleUrls: ['./enrollment-wrapper.component.scss'],
})
export class EnrollmentWrapperComponent implements OnInit {
  constructor(
    public readonly focusHandler: FocusHandlerService,
    public readonly layoutService: LayoutService,
  ) {}

  ngOnInit(): void {}
}
