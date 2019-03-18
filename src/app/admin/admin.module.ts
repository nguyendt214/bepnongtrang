import { SharedModule } from './../share.module';
import { AdminRoutingModule } from './admin.routing';
import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { AdminComponent } from './admin.component';

@NgModule({
    declarations: [ProductComponent, AdminComponent],
    imports: [
      AdminRoutingModule,
      SharedModule
    ]
})
export class AdminModule { }
