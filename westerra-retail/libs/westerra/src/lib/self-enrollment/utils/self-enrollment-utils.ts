import { Routes } from '@angular/router';
import { EnrollmentHandlerComponent } from '../components/enrollment-handler/enrollment-handler.component';
import { EnrollmentWrapperComponent } from '../components/enrollment-wrapper/enrollment-wrapper.component';

export const customEnrollmentRoutes: Routes = [
  {
    path: '',
    // component: EnrollmentWrapperComponent,
    children: [
      {
        path: 'enroll',
        component: EnrollmentHandlerComponent,
      },
      { path: '**', redirectTo: 'enroll', pathMatch: 'full' },
    ],
  },
  {
    path: '?uuid=:enrollmentId',
    children: [
      {
        path: 'enroll?uuid=:enrollmentId',
        component: EnrollmentHandlerComponent,
      },
      { path: '**', redirectTo: 'enroll', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
