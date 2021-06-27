import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import { ListsPresenterComponent } from './components/lists-presenter/lists-presenter.component';
import { ListViewerComponent } from './components/list-viewer/list-viewer.component';
import { ListsGuard } from 'src/app/core/guards/lists.guard';


const routes: Routes = [
  {path:'', pathMatch:'full' , component:ListsPresenterComponent,  canActivate: [ListsGuard]},
  {path:':id', component:ListViewerComponent},
  {path:':id/edit', component:ListEditComponent},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }