import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'employee-list-container',
  templateUrl: './employee-list.container.html',
  styleUrls: ['./employee-list.container.scss'],
  providers: [EmployeeService]
})
export class EmployeeListContainer implements OnInit {

  public employeeList$: Observable<Employee[]>;
  public getEmployee$: Observable<Employee>;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeList$ = this.employeeService.getEmployeeList();
  }

  addEmployee(employeeDetails: Employee) {
    this.employeeService.addEmployee(employeeDetails).subscribe((data) => {
      if (data) {
        alert('Added');
        this.getEmployees();
      }
    });
  }

  updateEmployee(employeeDetails: Employee) {
    let id = employeeDetails.id;
    this.employeeService.updateEmployee(id, employeeDetails).subscribe(() => {
      alert('Updated');
      this.getEmployees();
    });
  }

  getSingleEmployee(id: number) {
    this.getEmployee$ = this.employeeService.getEmployee(id);
  }

  removeEmployee(id: number) {
    this.employeeService.removeEmployee(id).subscribe(() => {
      alert('Deleted');
      this.getEmployees();
    });
  }

}
