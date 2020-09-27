import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListContainer } from './employee-list-container/employee-list.container';
import { EmployeeListPresentation } from './employee-list-container/employee-list-presentation/employee-list.presentation';
import { EmployeeFormPresentation } from './employee-list-container/employee-list-presentation/employee-form-presentation/employee-form.presentation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EmployeeListContainer, EmployeeListPresentation, EmployeeFormPresentation],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    OverlayModule,
    PortalModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [EmployeeFormPresentation]
})
export class EmployeeModule { }
