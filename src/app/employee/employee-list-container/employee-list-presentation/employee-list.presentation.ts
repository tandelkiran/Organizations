import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../../models/employee';
import { EmployeeListPresenter } from '../employee-list-presenter/employee-list.presenter';

@Component({
  selector: 'employee-list-presentation',
  templateUrl: './employee-list.presentation.html',
  styleUrls: ['./employee-list.presentation.scss'],
  viewProviders: [EmployeeListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListPresentation implements OnInit {

  // @Input() employeeList: Employee[];
  @Input() public set employeeList(employeeList: Employee[]) {
    if (employeeList) {
      this.employees = employeeList;
      this.filteredEmployeeList = employeeList;
      this.filteredEmployeeList.sort((a: Employee, b: Employee) => a > b ? 1 : -1);
    }
  }
  public get employeeList(): Employee[] {
    return this.employees;
  }
  @Input() public set getEmployee(employee: Employee) {
    if (employee) {
      this._getSingleEmployee = employee;
      this.loadEmployeeForm(this._getSingleEmployee)
    }
  }
  public get getEmployee(): Employee {
    return this._getSingleEmployee;
  }
  @Output() addEmployee: EventEmitter<Employee>;
  @Output() updateEmployee: EventEmitter<Employee>;
  @Output() sendId: EventEmitter<number>;
  @Output() employeeId: EventEmitter<number>;

  public filteredEmployeeList: Employee[];

  public fieldName: string;
  public reverse: boolean;

  private _getSingleEmployee: Employee;
  private employees: Employee[];

  constructor(private employeeListPresenter: EmployeeListPresenter) {
    this.addEmployee = new EventEmitter();
    this.updateEmployee = new EventEmitter();

    this.sendId = new EventEmitter();
    this.employeeId = new EventEmitter();

    this.fieldName = 'id';
    this.reverse = true;
  }

  ngOnInit() {
  }

  public loadEmployeeForm(employeeForm: Employee) {
    this.employeeListPresenter.addFormDetails = new Subject<Employee>();
    this.employeeListPresenter.updateFormDetails = new Subject<Employee>();

    //let flag: number = 0;
    this.employeeListPresenter.createEmployeeForm(employeeForm);

    this.employeeListPresenter.addFormDetails.subscribe((employeeData: Employee) => {
      // if (flag === 0) {
      //   flag = 1;
      this.addEmployee.emit(employeeData);
      //}
    });
    this.employeeListPresenter.updateFormDetails.subscribe((employeeData: Employee) => {
      //if (flag === 0) {
      //flag = 1;
      this.updateEmployee.emit(employeeData);
      //}
    });

  }
  public getEmployeeById(id: number) {
    this.sendId.emit(id);
  }

  public removeEmployee(id: number) {
    let confirmation = confirm('Are you sure want delete ?');
    if (confirmation) {
      this.employeeId.emit(id);
    }
    else {
      return;
    }
  }

  public sorting(columnName:string) {
    this.fieldName=columnName;
    this.reverse = !this.reverse;
  }

}
