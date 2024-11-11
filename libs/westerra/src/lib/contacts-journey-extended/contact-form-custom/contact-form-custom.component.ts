import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContactFormComponent } from '@backbase/contact-manager-journey-ui';

@Component({
  selector: 'bb-contact-form-custom',
  templateUrl: './contact-form-custom.component.html',
})
export class ContactFormCustomComponent extends ContactFormComponent implements OnInit, OnChanges {
  public emailSample = 'E.g. sarawilliams@backbase.com';
  public editMode = false;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    super(formBuilder);
  }

  ngOnInit() {
    super.ngOnInit();

    this.fetchQueryParams();
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  fetchQueryParams() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      /** To setup edit mode */
      this.editMode = +params.get('id') !== 0;
    });
  }
}
