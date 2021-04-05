import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { ProductsComponent } from './components/products/products.component';
import { AppMaterialModule } from '@app/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [ProductsFormComponent, ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ]
})
export class ProductsModule { }
