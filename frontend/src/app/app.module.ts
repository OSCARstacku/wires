import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignComponent } from './components/sign/sign.component';
import { MessagesComponent } from './components/messages/messages.component';
import { BodyComponent } from './components/body/body.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ModalsComponent } from './components/modals/modals.component';


@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    MessagesComponent,
    BodyComponent,
    NavBarComponent,
    PageNotFoundComponent,
    ModalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
