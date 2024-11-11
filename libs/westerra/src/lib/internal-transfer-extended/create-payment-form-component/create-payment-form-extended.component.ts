import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CreatePaymentFormComponent,
  FetchPaymentOptionsListenerFn,
  Frequencies,
  INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
  InitiatePaymentJourneyCommunicationService,
  InitiatePaymentNavigationService,
  InitiatePaymentOptions,
  PaymentFormFieldConfig,
  PaymentFormGroup,
  PaymentTypeConfig,
  ScheduleEndType,
  ӨCreatePaymentConfigSetupService,
  ӨCreatePaymentFieldsSetupService,
  ӨCreatePaymentService,
  ӨPaymentOptionsService,
  ӨPaymentOrderHttpService,
  ӨStateService,
} from '@backbase/initiate-payment-journey-ang';
import { PayordPaymentError } from '@backbase/internal-payments-shared-feature-forms';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  catchError,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import {
  A2ALimitErrorKeys,
  CounterPartyFields,
  getConfig,
  HiddenFields,
  InitiatePaymentHeaderStates,
  P2PLimitErrorKeys,
  PaymentHooks,
  PaymentMode,
  PaymentState,
  PaymentTemplateFields,
  RemittanceInfoFields,
  removeScheduleFromConfig,
  ScheduleFields,
  setFormDetailsFromResponse,
  setFormDetailsFromService,
  setFrequencyOptionsPerConfig,
  toPostPaymentTemplate,
  toPostValidateRequest,
  triggerPaymentHook,
  A2A_INVALID_DATE_ERROR_KEY,
  PaymentBaseFields,
  isEditFormDirty,
  registerFormControl,
  PaymentOption,
  PaymentTemplatesData,
} from '@backbase/internal-payments-shared-feature-forms';

import { PaymentTemplate } from '@backbase/payment-template-http-ang';
import { commonI18n } from '../constants/initiate-payment.i18n';
import {
  mapPaymentOptionRequest,
  normalisePaymentTemplate,
  normalizePaymentType,
} from '../helpers/payment-options-mappers';

import { focusErrorElement } from '@backbase/internal-payments-shared-ui';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import {
  creditCardAccountsRecurringScheduledTransferErrorMessage,
  defaultCalendarMonths,
  immediateTransferBlockedCreditAccounts,
  immediateTransferBlockedMessageForCreditCard,
  loanAccountsRecurringScheduledTransferErrorMessage,
  mortgageAccountProductExternalTypeIds,
  mulesoftErrorStatement,
} from '../../services/constants';
import { BB_PAYORD_PAYMENT_ERROR_MESSAGES_TOKEN, ErrorState } from '../../services/api/api.models';
import { AppSsoStateService } from '../../services/api/app-sso-state.service';

@Component({
  selector: 'bb-create-payment-form-extended',
  templateUrl: './create-payment-form-extended.component.html',
  providers: [ӨPaymentOptionsService, ӨCreatePaymentService, ӨCreatePaymentFieldsSetupService],
})

// extends CreatePaymentFormComponent
export class CreatePaymentFormExtendedComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @ViewChild('outlet', { read: ViewContainerRef, static: true }) outletRef: ViewContainerRef;
  @ViewChild('content', { read: TemplateRef, static: true }) contentRef: TemplateRef<any>;
  @ViewChild('alertContainer') alertContainer?: ElementRef;

  private buttonFlag = 0;
  private readonly paymentOrderHttpService;
  private readonly paymentOptionsService;
  private readonly createPaymentService;
  private readonly navigationService;
  private readonly stateService;
  private readonly cdRef;
  private readonly createPaymentSetup;
  private readonly fieldSetupService;
  private readonly formEl;
  private readonly communicator;
  readonly paymentErrors: PayordPaymentError;
  private readonly destroyed$;
  private paymentTypes;
  private paymentTemplate;
  private shouldResetPaymentOptions;
  private formValue;
  header: string | undefined;
  readonly paymentTemplateSearch: FormControl;
  readonly fetchOptions$: Subject<FormGroup>;
  readonly submitting$: BehaviorSubject<boolean>;
  paymentState$: Observable<PaymentState> = new BehaviorSubject(PaymentState.INITIAL).asObservable();
  readonly paymentTemplates$: Observable<PaymentTemplatesData>;
  readonly loadingTemplates$: BehaviorSubject<boolean>;
  readonly fetchingPaymentOptions$: BehaviorSubject<boolean>;
  readonly paymentOptions$: Observable<PaymentOption[]>;
  readonly paymentOptionsError$: Observable<boolean>;
  readonly selectedPaymentConfig$: Observable<PaymentTypeConfig | undefined>;
  readonly selectedPaymentOption$: Observable<PaymentOption | undefined>;
  readonly fetchPaymentOptionsListener$: Observable<FetchPaymentOptionsListenerFn | undefined>;
  readonly baseFields$: Observable<Array<PaymentFormFieldConfig | PaymentFormGroup>>;
  private editedPaymentDetails;
  options: InitiatePaymentOptions;
  configs: PaymentTypeConfig[];
  templateSelectorName?: string;
  isPaymentCopyControl?: AbstractControl;
  templateNameControl: AbstractControl | null;
  private paymentIdControl?;
  errors: {
    key: string;
    message: string;
  }[];
  isEditPaymentConfirmationDialogOpen: boolean;
  enablePaymentTemplateSelector: boolean;
  editPaymentHasNoChanges: boolean;
  isErrorTitleDisplayed: boolean;
  shouldApplyTemplate: boolean;
  genericError?: string;
  searchValue?: string;
  showApiError: boolean;
  paymentMode: typeof PaymentMode;
  private moneyToMemberLinkActive = false;
  private addToContactButtonActive = false;
  public content = {
    button: `<div class='btn-container' id="add-contact-btn"><a id="add-contact-btn-link" href='javascript:void(0);' (click)="externalButtonClick('button', $event)"><button bbbutton type='button' class='btn-primary btn btn-md'>Add Contact</button></a></div>`,
    link: `<h4 id="m2m-link"><u><a id="m2m-anchor-link" href='javascript:void(0);' (click)="externalButtonClick('link', $event)">Transfer to Westerra Member</a></u></h4>`,
  };

  public mortgageAccountExternalTypeIds = mortgageAccountProductExternalTypeIds;
  public calendarMonths = defaultCalendarMonths;
  public counterParty: any = null;
  public initiator: any = null;
  public mortgageGracePeriod = new Date(new Date().setDate(17));
  public counterParty$ = new BehaviorSubject(null);
  public initiator$ = new BehaviorSubject(null);
  public paymentStartDate: any = null;
  public paymentStartDate$ = new BehaviorSubject(null);
  public timeoutInterval: any = null;

  public immediateTransferBlockedCreditCards = immediateTransferBlockedCreditAccounts;
  public initialScheduleFormField: scheduleFormFieldInterface | any = {
    endDate: new Date().toISOString(),
    endType: ScheduleEndType.NEVER,
    frequency: Frequencies.ONCE,
    repeat: 2,
    startDate: new Date().toISOString(),
  };
  public scheduleData$ = new BehaviorSubject(this.initialScheduleFormField);
  public isScheduleDataUpdated: boolean = false;
  public showGeneralError = false;
  public customErrorAlertModifier = 'error';
  public customErrorAlertTitle = 'Error';
  public customErrorAlertMessage = '';
  public customApiErrorMessage = '';
  public showCustomApiError = false;
  public link = '';
  public linkText = '';
  public makePaymentFormSaved: FormGroup | any = this.appSsoStateService.getMakePaymentFormValue();

  constructor(
    paymentOrderHttpService: ӨPaymentOrderHttpService,
    paymentOptionsService: ӨPaymentOptionsService,
    createPaymentService: ӨCreatePaymentService,
    navigationService: InitiatePaymentNavigationService,
    stateService: ӨStateService,
    cdRef: ChangeDetectorRef,
    createPaymentSetup: ӨCreatePaymentConfigSetupService,
    fieldSetupService: ӨCreatePaymentFieldsSetupService,
    formEl: ElementRef,
    @Optional()
    @Inject(INITIATE_PAYMENT_JOURNEY_COMMUNICATOR)
    communicator: InitiatePaymentJourneyCommunicationService,
    @Optional()
    @Inject(BB_PAYORD_PAYMENT_ERROR_MESSAGES_TOKEN)
    paymentErrors: PayordPaymentError,
    private route: ActivatedRoute,
    private _cdRef: ChangeDetectorRef,
    private _router: Router,
    private appSsoStateService: AppSsoStateService,
  ) {
    this.paymentOrderHttpService = paymentOrderHttpService;
    this.paymentOptionsService = paymentOptionsService;
    this.createPaymentService = createPaymentService;
    this.navigationService = navigationService;
    this.stateService = stateService;
    this.cdRef = cdRef;
    this.createPaymentSetup = createPaymentSetup;
    this.fieldSetupService = fieldSetupService;
    this.formEl = formEl;
    this.communicator = communicator;
    this.paymentErrors = paymentErrors;
    this.destroyed$ = new Subject();
    this.paymentTemplate = null;
    this.shouldResetPaymentOptions = false;
    this.formValue = this.stateService.formInstance?.value;
    this.paymentTemplateSearch = new FormControl();
    this.fetchOptions$ = new Subject();
    this.submitting$ = new BehaviorSubject(false);

    // this.paymentState$ = this.stateService.paymentState$;
    this.paymentState$ = this.stateService.paymentState$
      ? this.stateService.paymentState$
      : new BehaviorSubject(PaymentState.INITIAL).asObservable();

    this.paymentTemplates$ = this.paymentOrderHttpService.paymentTemplates$;
    this.loadingTemplates$ = this.paymentOrderHttpService.loading$;
    this.fetchingPaymentOptions$ = new BehaviorSubject(false);
    this.paymentOptions$ = this.fieldSetupService.paymentOptions$;
    this.paymentOptionsError$ = this.fieldSetupService.paymentOptionsError$;
    this.selectedPaymentConfig$ = this.createPaymentService.selectedPaymentConfig$;
    this.selectedPaymentOption$ = this.createPaymentService.selectedPaymentOption$;
    this.fetchPaymentOptionsListener$ = this.createPaymentSetup.fetchPaymentOptionsListener$;
    this.baseFields$ = this.createPaymentSetup.baseFields$.pipe(
      map((baseFields) => {
        this.fieldSetupService.injectData(baseFields);
        return baseFields;
      }),
    );
    this.options = {};
    this.configs = [];
    this.templateNameControl = this.stateService.formInstance?.get('templateName');
    this.errors = [];
    this.isEditPaymentConfirmationDialogOpen = false;
    this.enablePaymentTemplateSelector = true;
    this.editPaymentHasNoChanges = false;
    this.isErrorTitleDisplayed = true;
    this.shouldApplyTemplate = false;
    this.showApiError = false;
    this.paymentMode = PaymentMode;
  }

  ngOnInit() {
    this.makePaymentFormSaved = this.appSsoStateService.getMakePaymentFormValue();
    window.scroll(0, 0);
    this.appSsoStateService.errorStatePaymentOrder$.subscribe((data: ErrorState) => {
      if (data.error) {
        let paymentScheduleContainer: any = document.getElementsByTagName('bb-payment-schedule-details')[0];
        let paymentReviewData = paymentScheduleContainer?.['__ngContext__']?.[8]?.['$implicit'];
        let initiatorData = paymentReviewData?.initiator;
        let scheduleData = paymentReviewData?.schedule;

        if (
          scheduleData?.frequency?.toLowerCase() !== 'once' &&
          initiatorData?.productKindName?.toLowerCase() === 'loan' &&
          this.checkForMulesoftRelatedErrors(data)
        ) {
          this.showCustomApiError = true;
          this.customApiErrorMessage = loanAccountsRecurringScheduledTransferErrorMessage;
          this.link = '';
        } else if (
          scheduleData?.frequency?.toLowerCase() !== 'once' &&
          initiatorData?.productKindName?.toLowerCase() === 'credit card' &&
          this.checkForMulesoftRelatedErrors(data)
        ) {
          this.showCustomApiError = true;
          this.customApiErrorMessage = creditCardAccountsRecurringScheduledTransferErrorMessage;
          this.link = '';
        } else {
          this.showCustomApiError = true;
          this.customApiErrorMessage = data?.error?.message;
          this.link = data?.error?.link!;
          this.linkText = data?.error?.linkText!;
        }

        this.cdRef.detectChanges();

        setTimeout(() => {
          this.showApiError = false;
          this.customApiErrorMessage = '';
          this.appSsoStateService.clearState();
        }, 10000);
      }
    });
    // this._router.events
    //   .pipe(
    //     filter((event) => event instanceof NavigationEnd),
    //     map(() => this.route.snapshot),
    //     map((route: ActivatedRouteSnapshot) => {
    //       while (route.firstChild) {
    //         route = route.firstChild;
    //       }
    //       return route;
    //     }),
    //   )
    //   .subscribe((route: ActivatedRouteSnapshot) => {
    //     let snapshot: any = route;
    //     let routerState: any = snapshot._routerState.url;
    //     console.log('routerState 111 : ', routerState);

    //     this.addM2Mbutton();
    //     this.addContactsBtn();
    //     // if (
    //     //   routerState === '/transfers/make-a-transfer/review' ||
    //     //   routerState === '/transfers/money-to-member/review'
    //     // ) {
    //     //   let scheduleData = res.controls.schedule?.value;
    //     //   if (scheduleData?.frequency !== undefined && scheduleData?.frequency !== 'ONCE') {
    //     //     let scheduleDataFields: any = document.getElementsByTagName('bb-payment-schedule-details');
    //     //     for (let i = 0; i < scheduleDataFields.length; i++) {
    //     //       console.log('scheduleDataFields : ', scheduleDataFields[i]);
    //     //       scheduleDataFields[i].style.display = 'none';
    //     //     }
    //     //   }
    //     // }
    //   });

    combineLatest<any[]>([
      this.createPaymentSetup.configs$,
      this.createPaymentSetup.options$,
      this.stateService.paymentEditState$,
    ])
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe(([configs, options, editedPaymentDetails]) => {
        this.options = options;
        this.editedPaymentDetails = editedPaymentDetails;
        this.isErrorTitleDisplayed = options.isErrorTitleDisplayed ?? this.isErrorTitleDisplayed;
        this.enablePaymentTemplateSelector =
          options.enablePaymentTemplateSelector ?? this.enablePaymentTemplateSelector;

        this.addM2Mbutton();
        this.addContactsBtn();

        if (configs.length === 1) {
          // TODO: find a better solution for this
          this.setArrangementBusFunctions(configs[0].options?.closedPaymentBusFns, configs[0].businessFunction);
          this.onSelectConfig(configs[0]);
        }
        const { isOneOffToRecurrentAllowed, isRecurrentToOneOffAllowed } = options;
        this.configs = configs.map((config) => {
          let _config = options.isTemplateMode ? removeScheduleFromConfig(config) : config;
          if (editedPaymentDetails && this.options.paymentMode === this.paymentMode.EDIT_PAYMENT) {
            _config = setFrequencyOptionsPerConfig(config, !!editedPaymentDetails.schedule, {
              isOneOffToRecurrentAllowed,
              isRecurrentToOneOffAllowed,
            });
          }
          this.fieldSetupService.injectData(_config.fields, _config.options);
          return _config;
        });
        this.setupPaymentTypes(this.configs);
        this.header = this.createPaymentSetup.getHeader(InitiatePaymentHeaderStates.FORM);
      });

    this.listen();
    if (this.stateService.currentState !== PaymentState.EDIT) {
      this.fieldSetupService.clearPaymentOptions();
      this.shouldResetPaymentOptions = true;
    }
    this.createPaymentService
      .getPaymentOptionsRequest(this.configs)
      .pipe(
        tap(
          (options: any) => {
            if (!this.shouldResetPaymentOptions && !options?.length) {
              this.fieldSetupService.setPaymentOptionsError(true);
            }
            this.shouldResetPaymentOptions = false;
            this.onPaymentTypeChange(options);
          },
          catchError(() => {
            this.fieldSetupService.setPaymentOptionsError(true);
            return of([]);
          }),
        ),
        takeUntil(this.destroyed$),
      )
      .subscribe();
    this.loadingTemplates$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.cdRef.detectChanges();
    });
    triggerPaymentHook(this.createPaymentSetup.hooks, PaymentHooks.onInit);
  }

  ngAfterViewInit() {
    this.stateService.paymentTemplateState$.pipe(takeUntil(this.destroyed$)).subscribe((template) => {
      if (template) {
        this.onSelectPaymentTemplate(template);
      }
    });
    if (this.editedPaymentDetails) {
      this.setEditFormValues(this.editedPaymentDetails);
      this.stateService.setEditPayment(undefined); // This is to prevent overwrite manual edits on return from review screen
    }
  }

  ngAfterContentInit() {
    this.renderView();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    triggerPaymentHook(this.createPaymentSetup.hooks, PaymentHooks.onDestroy);
  }

  setArrangementBusFunctions(closedFunctions, businessFunction) {
    if (closedFunctions?.length && businessFunction) {
      // TODO: temporary solution, need to find better way do not mutate object
      const setOfBusFun = new Set([...closedFunctions, businessFunction]);
      closedFunctions = Array.from(setOfBusFun);
      this.paymentOrderHttpService.arrangementBusFunctions = closedFunctions.toString();
    }
  }

  setEditFormValues(payment) {
    const form = this.stateService.formInstance;
    const counterparty = form.get(PaymentBaseFields.counterparty);
    registerFormControl(counterparty, CounterPartyFields.schemeName, [], [], 'BBAN');
    registerFormControl(form, 'paymentOrderId', [], [], payment.id);
    this.isPaymentCopyControl = registerFormControl(form, HiddenFields.isPaymentCopy);
    this.isPaymentCopyControl.patchValue(this.options.paymentMode === this.paymentMode.COPY_PAYMENT);
    const editForm = setFormDetailsFromService(form, payment);
    this.stateService.initialEditFormValue = editForm.value;
    this.setForm(editForm);
  }

  setupPaymentTypes(configs) {
    this.paymentTypes = configs.map((config) => config.paymentType).join(',');
    this.paymentOrderHttpService.paymentType = this.paymentTypes;
  }

  renderView() {
    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);
  }

  setTemplateValues(form, paymentTemplate) {
    this.setFormValues(normalisePaymentTemplate(paymentTemplate), form);
    this.clearTemplate();
  }

  prepareForTemplateApply() {
    const formGroup = new FormGroup({});
    this.formValue = null;
    this.fieldSetupService.setPaymentOptions([]);
    this.templateNameControl = registerFormControl(formGroup, 'templateName');
    this.stateService.saveForm(formGroup);
  }

  getPaymentConfig(paymentType) {
    if (paymentType) {
      return this.configs.filter((paymentConfig) => paymentType === paymentConfig.paymentType)[0];
    }
    return;
  }

  setFormValues({ details, name, id }, form?: any) {
    const _form = form || this.stateService.formInstance;
    const templateForm = setFormDetailsFromResponse(_form, details, {
      name,
      id,
    });
    this.templateSelectorName = name;
    this.templateNameControl?.setValue(name);
    this.setForm(templateForm);
    _form.markAllAsTouched();
  }

  listen() {
    this.fetchOptions$
      .pipe(
        filter(
          (form) =>
            JSON.stringify(this.createPaymentService.getCriticalFieldValues(this.formValue)) !==
            JSON.stringify(this.createPaymentService.getCriticalFieldValues(form.getRawValue())),
        ),
        switchMap((form) => {
          this.formValue = form.getRawValue();
          return this.fetchPaymentOptions(form);
        }),
        takeUntil(this.destroyed$),
      )
      .subscribe();
  }

  setForm(formInstance) {
    this.stateService.setPaymentState(PaymentState.EDIT);
    this.stateService.saveForm(formInstance);
    this.renderView();
    this.cdRef.detectChanges();
  }

  /**
   * Callback triggered when the payment type changes
   */
  onPaymentTypeChange(paymentOptions = []) {
    if (paymentOptions && paymentOptions.length) {
      this.fieldSetupService.setPaymentOptionsError(false);
    }
    this.fieldSetupService.setPaymentOptions(paymentOptions);
    this.fetchingPaymentOptions$.next(false);
  }

  validatePayment(form) {
    this.paymentOrderHttpService
      .validatePayment(toPostValidateRequest(form.getRawValue()))
      .pipe(
        take(1),
        catchError(({ error }) => {
          this.submitting$.next(false);
          this.errors = error.errors;
          const limitBreachError = this.getLimitBreachError(this.errors);
          const A2ADateError = this.getA2ADateError(this.errors);
          if (limitBreachError || A2ADateError) {
            this.showApiError = false;
            limitBreachError && this.handleLimitBreachError(limitBreachError);
            A2ADateError && this.handleA2ADateError(A2ADateError);
          } else {
            this.genericError = error.message;
            this.showApiError = true;
            this.scrollIntoAlertView();
          }
          return EMPTY;
        }),
      )
      .subscribe((response) => {
        this.stateService.saveValidationWarnings(response?.warnings);
        const control = form.get('isIntraLegalEntity') || registerFormControl(form, 'isIntraLegalEntity');
        this.paymentIdControl = this.paymentIdControl || registerFormControl(form, HiddenFields.id);
        this.templateNameControl = this.templateNameControl || registerFormControl(form, 'templateName');
        control.setValue(response?.isIntraLegalEntityPaymentOrder);
        this.paymentIdControl.setValue(response.id);
        this.templateNameControl.setValue(this.templateSelectorName);
        this.submitting$.next(false);
        this.navigationService.review();
        this.stateService.canApprove = response?.canApprove;
      });
  }
  handleLimitBreachError(error) {
    const validationMsg = this.getValidationMsgFromConfig(RemittanceInfoFields.amountCurrencyGroup, error?.key);
    if (validationMsg?.message) {
      validationMsg.message = validationMsg.message.replace('#amount#', error?.context?.limit || '');
      const amountGroup = this.stateService.formInstance
        .get(PaymentBaseFields.remittanceInfo)
        ?.get(RemittanceInfoFields.amountCurrencyGroup);
      amountGroup?.setErrors({ [error?.key]: true });
      amountGroup?.get(RemittanceInfoFields.amount)?.setErrors({ invalid: true });
      focusErrorElement(this.formEl?.nativeElement, 'small.bb-input-validation-message');
    }
  }
  scrollIntoAlertView() {
    this.alertContainer?.nativeElement.scrollIntoView(false, {
      behavior: 'smooth',
      block: 'start',
    });
  }
  getLimitBreachError(errors) {
    if (!Array.isArray(errors) || !errors.length) {
      return;
    }
    const _isLimitError = errors.find(
      (error) =>
        this.doesKeyExistInObject(error.key, A2ALimitErrorKeys) ||
        this.doesKeyExistInObject(error.key, P2PLimitErrorKeys),
    );
    const _isValidationMsgSet = Boolean(
      this.getValidationMsgFromConfig(RemittanceInfoFields.amountCurrencyGroup, _isLimitError?.key),
    );
    return _isValidationMsgSet ? _isLimitError : undefined;
  }
  getA2ADateError(errors) {
    if (!Array.isArray(errors) || !errors.length) {
      return;
    }
    const _isDateError = errors.find((error) => error.key === A2A_INVALID_DATE_ERROR_KEY);
    const _isValidationMsgSet = Boolean(
      this.getValidationMsgFromConfig(ScheduleFields.startDate, A2A_INVALID_DATE_ERROR_KEY),
    );
    return _isValidationMsgSet ? _isDateError : undefined;
  }
  handleA2ADateError(error) {
    this.stateService.formInstance
      .get(PaymentBaseFields.schedule)
      ?.get(ScheduleFields.startDate)
      ?.setErrors({ [error.key]: true });
  }
  doesKeyExistInObject(key, obj = {}) {
    if (!key) {
      return false;
    }
    return Object.values(obj).includes(key);
  }
  getValidationMsgFromConfig(fieldName, key = '') {
    return getConfig(fieldName, this.configs[0])?.options?.validationMessages?.find(
      (validationMessage) => validationMessage.name === key,
    );
  }
  saveTemplate(form) {
    if (this.options.paymentMode === PaymentMode.EDIT_TEMPLATE) {
      this.editPaymentTemplate(form);
    } else {
      this.createPaymentTemplate(form);
    }
  }
  editPaymentTemplate(form) {
    const templateName = form.get(PaymentTemplateFields.templateName)?.value;
    const paymentTemplateId = form.get(PaymentTemplateFields.paymentTemplateId)?.value;
    if (paymentTemplateId) {
      this.paymentOrderHttpService
        .editPaymentTemplate(paymentTemplateId, toPostPaymentTemplate(form.getRawValue()))
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: this.saveTemplateSuccessCallback.bind(this, templateName),
          error: this.saveTemplateErrorCallback.bind(this),
        });
    }
  }
  createPaymentTemplate(form) {
    const templateName = form.get(PaymentTemplateFields.templateName)?.value;
    this.paymentOrderHttpService
      .postPaymentTemplate(toPostPaymentTemplate(form.getRawValue()))
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: this.saveTemplateSuccessCallback.bind(this, templateName),
        error: this.saveTemplateErrorCallback.bind(this),
      });
  }
  saveTemplateSuccessCallback(templateName) {
    this.paymentOrderHttpService.showNotification(true, {
      header: commonI18n.templateSaveSuccess(templateName),
      headerContext: { name: templateName },
    });
    this.submitting$.next(false);
    if (this.options.isModalView) {
      this.communicator?.closeEvent();
    } else {
      // TODO: Do we still need to handle events if the form is not inside the modal? Maybe move this logic to the service
      this.stateService.resetForm();
      this.renderView();
    }
  }
  saveTemplateErrorCallback(response) {
    const { error } = response;
    this.genericError = error.message || commonI18n.templateSaveFailed;
    this.showApiError = true;
    this.scrollIntoAlertView();
    this.submitting$.next(false);
  }
  onHooksDone(form, success = true) {
    if (success) {
      if (this.options.isTemplateMode) {
        this.saveTemplate(form);
      } else {
        this.validatePayment(form);
      }
    } else {
      this.submitting$.next(false);
    }
  }
  isEditFormNotChanged(form) {
    return !isEditFormDirty(form.value, this.stateService.initialEditFormValue);
  }
  clearTemplate() {
    this.paymentTemplate = null;
    this.stateService.setPaymentTemplate(undefined);
  }
  onSelectPaymentTemplate(paymentTemplateData: PaymentTemplate | any) {
    const config = this.getPaymentConfig(normalizePaymentType(paymentTemplateData));
    if (this.configs.length > 1 && config) {
      this.prepareForTemplateApply();
      this.paymentTemplate = normalisePaymentTemplate(paymentTemplateData);
      this.shouldApplyTemplate = true;
      this.stateService.setPaymentState(PaymentState.EDIT);
      this.onSelectConfig(config);
      this.renderView();
    } else {
      this.setFormValues(paymentTemplateData);
      this.clearTemplate();
    }
  }
  clearTemplateName(): void {
    this.templateSelectorName = '';
    if (this.templateNameControl) {
      this.templateNameControl.setValue('');
    }
  }
  onLoadingMoreTemplates(page: number): void {
    this.paymentOrderHttpService.loadMore(page);
  }
  search(text: string): void {
    this.paymentOrderHttpService.search(text);
  }
  onSelectConfig(config?: PaymentTypeConfig): void {
    this.createPaymentService.selectPaymentConfig(config);
  }
  onPaymentOptionSelect(paymentOption?: PaymentOption): void {
    this.createPaymentService.selectPaymentOption(paymentOption);
  }
  onApplyTemplate(form: FormGroup): void {
    this.shouldApplyTemplate = false;
    if (this.paymentTemplate) {
      this.setTemplateValues(form, this.paymentTemplate);
    } else {
      this.stateService.paymentTemplateState$.pipe(takeUntil(this.destroyed$)).subscribe((template) => {
        if (template) {
          this.setTemplateValues(form, template);
        }
      });
    }
  }
  /**
   * Fetches the payment options for provided payment details
   */
  fetchPaymentOptions(form) {
    this.fetchingPaymentOptions$.next(true);
    return this.paymentOptionsService.fetchPaymentOptions(mapPaymentOptionRequest(form.getRawValue()));
  }
  discardPayment(): void {
    this.communicator?.closeEvent();
  }
  discardEditPaymentChanges(): void {
    this.communicator?.closeEvent();
  }
  cancelEditPaymentConfirmationDialog(): void {
    this.isEditPaymentConfirmationDialogOpen = false;
  }
  onSubmit(form: FormGroup): void {
    const configVal = this.createPaymentService.selectedPaymentConfigValue;
    if (configVal) {
      this.createPaymentService.resetRedundantFields(configVal, form);
    }
    this.stateService.saveForm(form);
    this.appSsoStateService.setMakePaymentFormValue(form);
    this.submitting$.next(true);

    if (this.createPaymentSetup.hooks?.[PaymentHooks.onSave]) {
      triggerPaymentHook(this.createPaymentSetup.hooks, PaymentHooks.onSave, this.onHooksDone.bind(this, form), form);
    } else {
      this.onHooksDone(form);
    }
  }
  onClear(): void {
    this.fieldSetupService.clearPaymentOptions();
    this.stateService.setPaymentState(PaymentState.INITIAL);
    this.stateService.resetForm(this.options?.ɵkeepOnResetFields);
    this.clearTemplateName();
    this.formValue = null;
    this.searchValue = '';
    this.showApiError = false;
    this.renderView();
  }
  onEditCancel(form: FormGroup): void {
    if (this.isEditFormNotChanged(form)) {
      this.communicator?.closeEvent();
    } else {
      this.isEditPaymentConfirmationDialogOpen = true;
    }
  }
  onEditSubmit(form: FormGroup): void {
    if (this.isEditFormNotChanged(form)) {
      this.editPaymentHasNoChanges = true;
      this.scrollIntoAlertView();
    } else {
      this.editPaymentHasNoChanges = false;
      this.onSubmit(form);
    }
  }

  getForm(paymentState) {
    if (paymentState === PaymentState?.EDIT) {
      this.updateMakePaymentForm();
      // this.stateService.setPaymentState(PaymentState?.INITIAL);
    }
    if (paymentState === PaymentState?.REVIEW) {
      this.stateService.resetForm();
      this.stateService.setPaymentState(PaymentState?.INITIAL);
    }

    this.setCurrencySymbol();

    this.addM2Mbutton();
    this.addContactsBtn();

    this.updatePaymentDueAlert();

    return this.stateService.form$;
  }

  addM2Mbutton() {
    let header = document.querySelector('bb-payord-group:nth-child(2)');

    let snapshot: any = this.route.snapshot;
    let routerState: any = snapshot._routerState.url;
    if (
      routerState.includes('/transfers/make-a-transfer/form') &&
      this.moneyToMemberLinkActive === false &&
      header !== null
    ) {
      header?.insertAdjacentHTML('afterend', this.content.link);
      document.getElementById('m2m-anchor-link').addEventListener('click', () => {
        this.externalButtonClick('link');
      });
      this.moneyToMemberLinkActive = true;
      this.addToContactButtonActive = false;
    }
  }
  addContactsBtn() {
    let button = document.querySelector('bb-payord-contact-selector > div.form-group');

    let snapshot: any = this.route.snapshot;
    let routerState: any = snapshot._routerState.url;

    if (
      routerState.includes('/transfers/money-to-member/form') &&
      this.addToContactButtonActive === false &&
      button !== null
    ) {
      button?.insertAdjacentHTML('afterend', this.content.button);
      document.getElementById('add-contact-btn-link').addEventListener('click', () => {
        this.externalButtonClick('button');
      });
      this.addToContactButtonActive = true;
      this.moneyToMemberLinkActive = false;
    }
  }

  getMinimumPaymentDate(paymentDueDate: any): string {
    let updatedDate = '';
    let month = new Date(paymentDueDate).getUTCMonth();
    let day = new Date(paymentDueDate).getUTCDate();
    let year = new Date(paymentDueDate).getUTCFullYear();

    updatedDate = `${this.calendarMonths[month]} ${day}, ${year}`;
    return updatedDate;
  }

  updatePaymentDueAlert() {
    // Updating the Alert Container based on custom conditions
    let payordForm: any = document.getElementsByTagName('bb-payord-form')?.[0];
    let payordFormGroup = payordForm?.['__ngContext__']?.[34];

    this.counterParty$ = new BehaviorSubject(payordFormGroup?.value?.counterparty?.accountData?.defaultRecord);
    this.initiator$ = new BehaviorSubject(payordFormGroup?.value?.initiator?.accountData?.defaultRecord);
    this.paymentStartDate$ = new BehaviorSubject(payordFormGroup?.value?.schedule?.startDate);

    if (this.initiator !== this.initiator$.getValue()) {
      this.initiator = this.initiator$.getValue();
      this.updateScheduleData();
    }

    if (this.counterParty !== this.counterParty$.getValue()) {
      this.counterParty = this.counterParty$.getValue();
      this.setDueDateAlert();
    }

    if (this.paymentStartDate !== this.paymentStartDate$.getValue()) {
      this.paymentStartDate = this.paymentStartDate$.getValue();
      this.setDueDateAlert();
    }

    this.checkIfTransferAllowed();
  }

  updatePaymentDueAlertForCreditCardAccounts() {
    let bbPayAlert = document.getElementsByTagName('bb-payord-alert');

    let creditCardGracePeriod = new Date(
      new Date(this.counterParty?.minimumPaymentDueDate).setDate(
        new Date(this.counterParty?.minimumPaymentDueDate).getUTCDate() + 9,
      ),
    );

    bbPayAlert[0].innerHTML = '';
    let dateToCheck =
      this.paymentStartDate === null || this.paymentStartDate === undefined ? new Date() : this.paymentStartDate;

    if (new Date(dateToCheck) > new Date(creditCardGracePeriod)) {
      bbPayAlert[0].innerHTML = this.updateDueAlertMessage(this.counterParty?.minimumPaymentDueDate);
    } else {
      bbPayAlert[0].innerHTML = '';
    }
  }

  updatePaymentDueAlertForLoanAccounts() {
    let bbPayAlert = document.getElementsByTagName('bb-payord-alert');
    let isCounterPartyMortgage = this.mortgageAccountExternalTypeIds.includes(
      this.counterParty?.product?.externalTypeId,
    );
    let loanGracePeriod = new Date(
      new Date(this.counterParty?.minimumPaymentDueDate).setDate(
        new Date(this.counterParty?.minimumPaymentDueDate).getUTCDate() + 10,
      ),
    );

    bbPayAlert[0].innerHTML = '';
    let dateToCheck =
      this.paymentStartDate === null || this.paymentStartDate === undefined ? new Date() : this.paymentStartDate;

    if (!isCounterPartyMortgage && new Date(dateToCheck) > new Date(loanGracePeriod)) {
      bbPayAlert[0].innerHTML = this.updateDueAlertMessage(this.counterParty?.minimumPaymentDueDate);
    } else {
      bbPayAlert[0].innerHTML = '';
    }
  }

  updateDueAlertMessage(dueDate: any): string {
    let message = `<div role="alert" ng-reflect-ng-class="col-md-12" class="col-md-12"><bb-alert-ui ng-reflect-title="The due date has passed. This " ng-reflect-modifier="warning"><ngb-alert role="alert" class="alert show alert-warning fade" style="display:block;" ng-reflect-type="warning" aria-describedby="bb_element_26" aria-labelledby="bb_element_25"><div class="alert-body"><bb-icon-ui class="alert-icon" ng-reflect-name="warning" ng-reflect-color="warning" data-role="alert-icon"><i role="img" class="bb-icon bb-icon-warning bb-icon--md bb-icon--warning" ng-reflect-ng-class="bb-icon-warning,bb-icon--md,bb" aria-hidden="true"></i></bb-icon-ui><div class="alert-content"><strong role="heading" aria-level="2" class="alert-heading" id="bb_element_25" data-role="alert-title">The due date has passed. This payment will incur a late fee.</strong><div id="bb_element_26" data-role="alert-content"><p class="bb-block bb-block--no-margin">The due date was ${this.getMinimumPaymentDate(
      dueDate,
    )}. Late payments will decrease your credit score.</p></div><!--bindings={
      "ng-reflect-ng-if": "true"
    }--><!--bindings={
      "ng-reflect-ng-if-else": "[object Object]"
    }--></div></div><!--bindings={}--></ngb-alert><!--bindings={
      "ng-reflect-ng-if": "true"
    }--><!--container--></bb-alert-ui><!--bindings={
      "ng-reflect-ng-if": "warning"
    }--></div>`;

    return message;
  }

  updateSuccessMessage() {
    // To be used in the Create Payment and Review Component
    let reviewPaymentContainer: any = document.getElementsByTagName('bb-adapted-review-container')?.[0];
    let successTextSpan: any = document.querySelectorAll('span.bb-text-support.ng-star-inserted')?.[0];

    if (reviewPaymentContainer && successTextSpan) {
      let reviewPaymentData: any = reviewPaymentContainer?.['__ngContext__']?.[8]?.['$implicit'];
      let scheduleData: any = reviewPaymentData?.schedule;
      let isFutureDated = new Date(scheduleData?.startDate);
      let customMessage = successTextSpan?.innerText?.replace('USD', '$');
      if (isFutureDated > new Date()) {
        customMessage = customMessage.replace('You’ve just transfered', "You've just scheduled a transfer of ");
        customMessage = customMessage.replace('USD', '$');
      }
      successTextSpan.innerText = customMessage;
    }
  }

  checkIfTransferAllowed() {
    let submitButton = document.querySelectorAll(' bb-load-button-ui > button')?.[0];

    if (
      this.initiator &&
      this.counterParty &&
      this.immediateTransferBlockedCreditCards.includes(this.initiator?.product?.externalTypeId) &&
      this.counterParty?.productKindName?.toLowerCase() === 'loan'
      // && (this.initiator?.productKindName === 'Current Account')
    ) {
      submitButton?.setAttribute('disabled', '');
      this.customErrorAlertMessage = immediateTransferBlockedMessageForCreditCard;
      this.showGeneralError = true;
    } else {
      submitButton?.removeAttribute('disabled');
      this.customErrorAlertMessage = '';
      this.showGeneralError = false;
    }
  }

  updateScheduleData(): any {
    // To be used in the Create Payment and Review Component
    let payordForm: any = document.getElementsByTagName('bb-payord-form')?.[0];
    let payordFormGroup = payordForm?.['__ngContext__']?.[34];

    let resetButton = document.querySelectorAll(
      'button.bb-button-bar__button.bb-button-bar__button--across.btn-link.btn.btn-md',
    )?.[0] as HTMLElement;

    if (resetButton) {
      resetButton.onclick = () => {
        payordFormGroup.controls.schedule.patchValue({
          endDate: new Date().toISOString(),
          endType: ScheduleEndType.NEVER,
          frequency: Frequencies.ONCE,
          repeat: 2,
          startDate: new Date().toISOString(),
        });
        payordFormGroup.controls.schedule.updateValueAndValidity();
        this.scheduleData$.next(null);
        this.isScheduleDataUpdated = false;
        this.customErrorAlertMessage = '';
        this.showGeneralError = false;
      };
    }

    let payordGroupList = document.querySelectorAll('bb-payord-group');
    let schedulePayordGroup: any = payordGroupList?.[payordGroupList.length - 1];

    let reviewPaymentContainer: any = document.getElementsByTagName('bb-adapted-review-container')?.[0];

    if (reviewPaymentContainer && this.isScheduleDataUpdated) {
      this.scheduleData$.next({
        endDate: new Date().toISOString(),
        endType: ScheduleEndType.NEVER,
        frequency: Frequencies.ONCE,
        repeat: 2,
        startDate: new Date().toISOString(),
      });
    }

    if (schedulePayordGroup) {
      if (
        this.initiator &&
        (this.initiator?.productKindName?.toLowerCase() === 'credit card' ||
          this.initiator?.productKindName?.toLowerCase() === 'loan')
      ) {
        schedulePayordGroup.style.display = 'none';
        let scheduleDataSubject = new BehaviorSubject(payordFormGroup.value.schedule);

        if (this.scheduleData$ !== scheduleDataSubject && !this.isScheduleDataUpdated) {
          this.isScheduleDataUpdated = true;
          this.scheduleData$ = scheduleDataSubject;
          payordFormGroup.controls.schedule.patchValue({
            endDate: new Date().toISOString(),
            endType: ScheduleEndType.NEVER,
            frequency: Frequencies.ONCE,
            repeat: 2,
            startDate: new Date().toISOString(),
          });
          payordFormGroup.controls.schedule.controls.endDate.setValidators([]);
          payordFormGroup.controls.schedule.controls.endDate.updateValueAndValidity();
          payordFormGroup.controls.schedule.updateValueAndValidity();
        }
      } else {
        schedulePayordGroup.style = '';
        payordFormGroup.controls.schedule.patchValue(this.scheduleData$.getValue());
        payordFormGroup.controls.schedule.updateValueAndValidity();
        if (payordFormGroup.value.schedule.endType === ScheduleEndType.ON) {
          payordFormGroup.controls.schedule.controls.endDate.setValidators([Validators.required]);
          payordFormGroup.controls.schedule.controls.endDate.updateValueAndValidity();
        }
        this.scheduleData$ = new BehaviorSubject(null);
        this.isScheduleDataUpdated = false;
      }
    }
  }

  setDueDateAlert() {
    if (this.counterParty) {
      if (this.counterParty?.productKindName?.toLowerCase() === 'credit card') {
        this.updatePaymentDueAlertForCreditCardAccounts();
      } else if (this.counterParty?.productKindName?.toLowerCase() === 'loan') {
        this.updatePaymentDueAlertForLoanAccounts();
      } else {
        let bbPayAlert = document.getElementsByTagName('bb-payord-alert')?.[0];
        if (bbPayAlert) {
          bbPayAlert.innerHTML = '';
        }
      }
    }
  }

  externalButtonClick(linkClick, event?: any) {
    event?.preventDefault();
    if (linkClick.trim() === 'link') {
      this._router.navigateByUrl('/transfers/money-to-member');
    } else {
      this._router.navigateByUrl('/self-service/manage-contacts');
    }
  }

  checkForMulesoftRelatedErrors(errorData: ErrorState | any) {
    return errorData?.error?.description?.includes(mulesoftErrorStatement) ||
      errorData?.error?.message?.includes('400 : ')
      ? true
      : false;
  }

  updateMakePaymentForm() {
    let payordForm: any = document.getElementsByTagName('bb-payord-form')?.[0];
    let payordFormGroup = payordForm?.['__ngContext__']?.[34];

    this.makePaymentFormSaved = this.appSsoStateService.getMakePaymentFormValue();

    if (this.makePaymentFormSaved && payordFormGroup) {
      this.scheduleData$.next(this.makePaymentFormSaved?.controls?.schedule?.value);
      payordFormGroup?.controls?.schedule.patchValue(this.scheduleData$.getValue());
      payordFormGroup?.controls?.schedule.updateValueAndValidity();
      if (payordFormGroup?.value?.schedule?.endType === ScheduleEndType.ON) {
        payordFormGroup?.controls?.schedule?.controls?.endDate.setValidators([Validators.required]);
        payordFormGroup?.controls?.schedule?.controls?.endDate.updateValueAndValidity();
      }
      this.scheduleData$ = new BehaviorSubject(null);
      this.isScheduleDataUpdated = false;
    }
  }

  setCurrencySymbol() {
    let currencySpan1 = document.querySelector(
      'bb-payord-compact-amount-ui > section > div > bb-amount-input-ui > div.bb-amount-input__field.bb-amount-input__field--large > span.bb-amount-input__symbol',
    );

    let currencySpan2 = document.querySelector(
      'div.bb-amount-input__field--large.bb-form-field.bb-form-field--md > div > bb-amount-input-ui > div.bb-amount-input__field.bb-amount-input__field--large > span.bb-amount-input__symbol',
    );

    currencySpan1 && currencySpan1.innerHTML !== `<span class="sr-only">Currency</span> $`
      ? (currencySpan1.innerHTML = `<span class="sr-only">Currency</span> $`)
      : '';

    currencySpan2 && currencySpan2.innerHTML !== `<span class="sr-only">Currency</span> $`
      ? (currencySpan2.innerHTML = `<span class="sr-only">Currency</span> $`)
      : '';
  }

  // private stateService0;
  // private buttonFlag = 0;
  // getForm(paymentState) {
  //   this.stateService0 = ӨStateService;
  //   if (paymentState === paymentState.REVIEW) {
  //     this.stateService0.resetForm();
  //     this.stateService0.setPaymentState(paymentState.INITIAL);
  //   }
  //   const westerraLink = document.createElement('h4');
  //   westerraLink.id = 'm2m-link';
  //   westerraLink.innerHTML = '<u><a href="#/transfers/money-to-member">Transfer to Westerra Member</a></u>';
  //   const formSelected = document.getElementsByClassName('dynamic-form')[0];
  //   if (formSelected && this.buttonFlag == 0) {
  //     const secondChild = formSelected.children[2];
  //     if (secondChild) {
  //       formSelected.insertBefore(westerraLink, secondChild);
  //       this.buttonFlag = 1;
  //     }
  //   }
  //   return this.stateService0.form$;
  // }
}

export interface scheduleFormFieldInterface {
  endDate: string;
  endType: string;
  frequency: string;
  repeat: number;
  startDate: string;
}
