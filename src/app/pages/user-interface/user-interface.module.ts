import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserInterfaceComponent} from "./user-interface.component";
import { NgxMaskModule } from 'ngx-mask'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserFormComponent} from "../../components/user-form/user-form.component";
import {PopupComponent} from "../../components/popup/popup.component";
import { ConfirmPopupComponent } from "../../components/confirm-popup/confirm-popup.component";


@NgModule({
  exports: [
    UserInterfaceComponent,
    UserFormComponent,
    PopupComponent,
    ConfirmPopupComponent
  ],
  declarations: [
    UserInterfaceComponent,
    UserFormComponent,
    PopupComponent,
    ConfirmPopupComponent
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserFormComponent
  ]
})
export class UserInterfaceModule { }
