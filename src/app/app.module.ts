import { Injector, NgModule,Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterseptor } from './auth.interseptor';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { SharedModule } from './shared/shared.modal';
import { RouterModule } from '@angular/router';
import { ModalModule } from './modal/modal.module';
import { FormsModule } from '@angular/forms';

const INTERSEPTOR_PROVIDER:Provider={
  provide:HTTP_INTERCEPTORS,
  useClass:AuthInterseptor,
  multi:true
}

@NgModule({
  declarations: [
    AppComponent,
     
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    ModalModule,
    FormsModule
  ],
 
  providers: [INTERSEPTOR_PROVIDER,
  {provide:NZ_I18N,useValue:en_US}],
  bootstrap: [AppComponent]
})
export class AppModule { }
