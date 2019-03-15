import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material-design.module';
import { MsalModule } from "@azure/msal-angular";
import {OAuthSettings} from './auth/oauth';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    BrowserAnimationsModule,
    MsalModule.forRoot({
      clientID: OAuthSettings.appId,
      authority:
        "https://login.microsoftonline.com/livebournemouthac.onmicrosoft.com/"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
