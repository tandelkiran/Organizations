import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this._baseUrl = environment.baseUrl;
  }

  public getEmployeeList(): Observable<Employee[]> {
    const url: string = `${this._baseUrl}/employees`;
    return this.httpClient.get<Employee[]>(url);
  }

  public addEmployee(employeeDetail): Observable<Employee> {
    const url: string = `${this._baseUrl}/employees`
    return this.httpClient.post<Employee>(url, employeeDetail);
  }

  public updateEmployee(id:number,employeeDetail:Employee): Observable<Employee> {
    const url:string=`${this._baseUrl}/employees`;
    return this.httpClient.put<Employee>(`${url}/${id}`,employeeDetail);
  }

  public getEmployee(id: number): Observable<Employee> {
    const url: string = `${this._baseUrl}/employees/${id}`
    return this.httpClient.get<Employee>(url);
  }

  public removeEmployee(id: number): Observable<Employee> {
    const url: string = `${this._baseUrl}/employees/${id}`;
    return this.httpClient.delete<Employee>(url);
  }
}
