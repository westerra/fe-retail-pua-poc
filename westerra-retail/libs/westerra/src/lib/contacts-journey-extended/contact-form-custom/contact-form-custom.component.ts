import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContactFormComponent } from '@backbase/internal-contact-manager-journey-ui';

@Component({
  selector: 'bb-contact-form-custom',
  templateUrl: './contact-form-custom.component.html',
})
export class ContactFormCustomComponent extends ContactFormComponent implements OnInit {
  public emailSample = 'E.g. sarawilliams@backbase.com';
  public editMode = false;

  constructor(private formBuilder: NonNullableFormBuilder, private activatedRoute: ActivatedRoute) {
    super(formBuilder);
  }

  ngOnInit() {
    super.ngOnInit();

    this.fetchQueryParams();
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   // super.ngOnChanges(changes);
  // }

  fetchQueryParams() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      /** To setup edit mode */
      this.editMode = +params.get('id') !== 0;
    });
  }
}
