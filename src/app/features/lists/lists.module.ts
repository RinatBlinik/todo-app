import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsPresenterComponent } from './components/lists-presenter/lists-presenter.component';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import { ListsRoutingModule } from './lists-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorsPresenterComponent } from './components/errors-presenter/errors-presenter.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListBoxComponent } from './components/list-box/list-box.component';
import { ListViewerComponent } from './components/list-viewer/list-viewer.component';
import { GeneralErrorComponent } from 'src/app/shared/components/general-error/general-error.component';

@NgModule({
  declarations: [
    ListsPresenterComponent,
    ListEditComponent,
    ErrorsPresenterComponent,
    ListBoxComponent,
    ListViewerComponent
  ],
  imports: [
    CommonModule,
    ListsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ListsModule { }
