import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnrollmentStepModel } from '../../utils/enrollment-models';

const STEPSSELF = [
    { stepIndex: 1, isComplete: false },
    { stepIndex: 2, isComplete: false },
    { stepIndex: 3, isComplete: false },
];
const STEPSAUTO = [
    { stepIndex: 1, isComplete: false },
    { stepIndex: 2, isComplete: false },
    { stepIndex: 3, isComplete: false },
];

@Injectable()
export class EnrollmentChallengeHandlerService {
    steps$: BehaviorSubject<EnrollmentStepModel[]>;
    currentStep$: BehaviorSubject<EnrollmentStepModel> = new BehaviorSubject<EnrollmentStepModel>(null);

    constructor(protected readonly route: ActivatedRoute) {
        this.route.queryParams.subscribe((params: Params) => {
            if (params.uuid) {
                console.log('auto');
                this.steps$ = new BehaviorSubject<EnrollmentStepModel[]>(STEPSAUTO);
            } else {
                this.steps$ = new BehaviorSubject<EnrollmentStepModel[]>(STEPSSELF);
            }
        });

        this.currentStep$.next(this.steps$.value[0]);
    }

    setCurrentStep(step: EnrollmentStepModel): void {
        this.currentStep$.next(step);
    }

    getCurrentStep(): Observable<EnrollmentStepModel> {
        return this.currentStep$.asObservable();
    }

    getSteps(): Observable<EnrollmentStepModel[]> {
        return this.steps$.asObservable();
    }

    moveToNextStep(): void {
        const index = this.currentStep$.value.stepIndex;

        if (index < this.steps$.value.length) {
            this.currentStep$.next(this.steps$.value[index]);
        }
    }

    isLastStep(): boolean {
        return this.currentStep$.value.stepIndex === this.steps$.value.length;
    }
}
