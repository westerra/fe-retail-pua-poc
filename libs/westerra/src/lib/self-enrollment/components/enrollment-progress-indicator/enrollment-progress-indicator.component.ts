import { Component, Input, OnInit } from '@angular/core';

interface IDisplayStep {
  description: string | number | any;
  status: string;
}

@Component({
  selector: 'bb-enrollment-progress-indicator',
  templateUrl: './enrollment-progress-indicator.component.html',
  styleUrls: ['./enrollment-progress-indicator.component.scss'],
})
export class EnrollmentProgressIndicatorComponent implements OnInit {

  @Input() steps: IDisplayStep[];
  constructor() {}

  ngOnInit(): void {}
}
