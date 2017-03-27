import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { AUTH_PROVIDERS } from 'angular2-jwt';


import { AppComponent }  from './app.component';
import { HomeComponent }  from './components/home/home.component';
import { ProfileComponent }  from './components/profile/profile.component';
import { TweetsBoxComponent }  from './components/tweets/box/box.component';
import { TweetsFormComponent }  from './components/tweets/form/form.component';

import { Auth } from './services/auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports:      [ BrowserModule, routing, HttpModule, FormsModule ],
  declarations: [ AppComponent, HomeComponent, ProfileComponent, TweetsBoxComponent, TweetsFormComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
    appRoutingProviders,
    AUTH_PROVIDERS,
    Auth,
    AuthGuard
  ]
})
export class AppModule { }
