import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxMaskModule } from 'ngx-mask'
//import { UserInterfaceComponent } from './pages/user-interface/user-interface.component';
import { HeaderComponent } from './components/header/header.component';
import { UserInterfaceModule } from "./pages/user-interface/user-interface.module";

@NgModule({
  declarations: [
    AppComponent,
//    UserInterfaceComponent,
    HeaderComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    UserInterfaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
