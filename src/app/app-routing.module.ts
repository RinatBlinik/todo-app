import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './shared/components/error/error.component';

const routes: Routes = [
  {path:'home' , component:HomeComponent},
  {path:'lists' , loadChildren: () => import('./features/lists/lists.module').then(m => m.ListsModule)},
  {path:'items' , loadChildren: () => import('./features/items/items.module').then(m => m.ItemsModule)},
  {path:'', pathMatch:'full' , redirectTo: 'home'},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
