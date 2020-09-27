import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { FormGroup } from '@angular/forms';
import { EmployeeFormPresenter } from '../employee-form-presenter/employee-form.presenter.';
import { Employee } from 'src/app/employee/models/employee';
import { EMPLOYEE_DETAILS } from 'src/app/employee/token';

@Component({
  selector: 'employee-form-presentation',
  templateUrl: './employee-form.presentation.html',
  styleUrls: ['./employee-form.presentation.scss'],
  viewProviders: [EmployeeFormPresenter]
})
export class EmployeeFormPresentation implements OnInit {

  @Output() addEmployee: EventEmitter<Employee>;
  @Output() updateEmployee: EventEmitter<Employee>;
  employeeForm: FormGroup;
  actionLable: string;

  constructor(@Inject(EMPLOYEE_DETAILS) public employee: Employee,
    public overlayRef: OverlayRef,
    private employeeFormPresenter: EmployeeFormPresenter) {
    this.addEmployee = new EventEmitter<Employee>();
    this.updateEmployee = new EventEmitter<Employee>();
    this.employeeForm = this.employeeFormPresenter.buildEmployeeForm();
    this.actionLable = "Add";
    if (this.employee != null) {
      this.actionLable = 'Update';
      this.employeeForm.patchValue(this.employee);
      //this.projectForm.patchValue({ projectStartDate: new Date(this.project.projectStartDate), projectEndDate: new Date(this.project.projectEndDate) })
    }
  }

  ngOnInit() {
  }

  public onSubmit() {
    if (this.employeeForm.controls.id.value !== null) {
      debugger
      this.updateEmployee.emit(this.employeeForm.value);
    }
    else {
      this.addEmployee.emit(this.employeeForm.value);
    }
  }

}
