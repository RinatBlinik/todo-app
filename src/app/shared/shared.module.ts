import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { NavigationPresenterComponent } from './components/navigation-presenter/navigation-presenter.component';
import { ItemPresenterComponent } from './components/item-presenter/item-presenter.component';
import { GeneralErrorComponent } from './components/general-error/general-error.component';



@NgModule({
  declarations: [
    ErrorComponent,
    NavigationPresenterComponent,
    ItemPresenterComponent,
    GeneralErrorComponent
  ],
  exports: [
    ErrorComponent,
    NavigationPresenterComponent,
    ItemPresenterComponent,
    GeneralErrorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }