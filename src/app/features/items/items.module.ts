import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveItemsComponent } from './components/active-items/active-items.component';
import { ItemsRoutingModule } from './items-routng.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ActiveItemsComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    SharedModule
  ]
})
export class ItemsModule { }
