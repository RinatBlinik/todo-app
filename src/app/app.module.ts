import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CounterComponent } from './components/counter/counter.component';
import { SharedModule } from './shared/shared.module';
import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './core/services/config.service';
import { map } from 'rxjs/operators';

export function initialize(http: HttpClient,config: ConfigService) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
       http.get<ConfigService>('./assets/data/config.json')
         .pipe(
           map((x: ConfigService) => {
             config.appName = x.appName;
             config.developerName = x.developerName;
             config.baseUrl = x.baseUrl;
             resolve(true);
           })
         ).subscribe();
    });
  };
}
  @NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      NavBarComponent,
      CounterComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      SharedModule
    ],
    providers: [{
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [
        HttpClient,
        ConfigService
      ],
      multi: true
    }],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
