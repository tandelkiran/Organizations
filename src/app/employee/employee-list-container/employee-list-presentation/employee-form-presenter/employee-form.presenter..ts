import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class EmployeeFormPresenter {

  employeeForm: FormGroup;
  constructor(private formBiulder: FormBuilder) { }

  public buildEmployeeForm() {
    return this.employeeForm = this.formBiulder.group(
      {
        id:[null],
        employeeName: [''],
        address: [''],
        mobile: [''],
        dob: [''],
        gender: [''],
        email: ['']
      }
    );
  }
}
