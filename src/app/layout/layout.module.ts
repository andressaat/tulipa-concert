import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { AppMaterialModule } from '../app-material/app-material.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    AppMaterialModule
  ]
})
export class LayoutModule { }
