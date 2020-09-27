import { ComponentRef, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { EmployeeFormPresentation } from '../employee-list-presentation/employee-form-presentation/employee-form.presentation';
import { Subject } from 'rxjs';
import { Employee } from '../../models/employee';
import { EMPLOYEE_DETAILS } from 'src/app/employee/token';

@Injectable()
export class EmployeeListPresenter {

  public addFormDetails: Subject<Employee>;
  public updateFormDetails: Subject<Employee>;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector) { }

  /**
   * createEmployeeForm()  */
  public createEmployeeForm(employeeDetails: Employee) {
    debugger
    let config: OverlayConfig;
    let overlayRef: OverlayRef;
    let ref: ComponentRef<EmployeeFormPresentation>;

   // this.viewContainerRef.clear();

    config = new OverlayConfig();

    config.positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    config.hasBackdrop = true;

    overlayRef = this.overlay.create(config);

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });

    ref = overlayRef.attach(new ComponentPortal(EmployeeFormPresentation, this.viewContainerRef,
      this.createInjector(employeeDetails, overlayRef))
    );
    ref.instance.addEmployee.subscribe((formData: Employee) => {
      if (formData) {
        this.addFormDetails.next(formData);
      }
    });
    ref.instance.updateEmployee.subscribe((formData: Employee) => {
      if (formData) {
        this.updateFormDetails.next(formData);
      }
    });

  }

  private createInjector(employeeDetails: Employee, overlayRef: OverlayRef): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(OverlayRef, overlayRef);
    injectorTokens.set(EMPLOYEE_DETAILS, employeeDetails);
    return new PortalInjector(this.injector, injectorTokens);
  }
}
