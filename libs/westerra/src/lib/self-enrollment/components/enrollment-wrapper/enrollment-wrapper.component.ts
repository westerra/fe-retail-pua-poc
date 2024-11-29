import { Component, OnInit } from '@angular/core';
import { FocusHandlerService } from '@backbase/shared/util/app-core';
import { LayoutService } from '@backbase/ui-ang/layout';
// import { FocusHandlerService } from 'libs/shared/util/app-core/src/lib/focus-handler.service';

@Component({
  selector: 'bb-enrollment-wrapper',
  templateUrl: './enrollment-wrapper.component.html',
  styleUrls: ['./enrollment-wrapper.component.scss'],
})
export class EnrollmentWrapperComponent  {
  constructor(
    public readonly focusHandler: FocusHandlerService,
    public readonly layoutService: LayoutService,
  ) {}


}
