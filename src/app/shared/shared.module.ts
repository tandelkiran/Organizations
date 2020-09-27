import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderPipe } from './pipes/order.pipe';



@NgModule({
  declarations: [OrderPipe],
  imports: [
    CommonModule
  ],
  exports: [OrderPipe]
})
export class SharedModule { }
