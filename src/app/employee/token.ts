import { InjectionToken } from '@angular/core';

// creating an injector token for passing data to overlay
export const EMPLOYEE_DETAILS: InjectionToken<{}> = new InjectionToken<{}>('EMPLOYEE_DETAILS');
// export const EMPLOYEE_DETAILS: InjectionToken<{}> = new InjectionToken<{}>('EMPLOYEE_DETAILS');
// export const PROJECT_NAME: InjectionToken<{}> = new InjectionToken<{}>('PROJECT_NAME');
// export const CLIENT_NAME: InjectionToken<{}> = new InjectionToken<{}>('CLIENT_NAME');
