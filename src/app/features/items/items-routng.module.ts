import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { ActiveItemsComponent } from './components/active-items/active-items.component';


const routes: Routes = [
  {path:'', pathMatch:'full' , component:ActiveItemsComponent},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }