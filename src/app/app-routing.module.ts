import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserInterfaceComponent} from "./pages/user-interface/user-interface.component";
import {UserFormComponent} from "./components/user-form/user-form.component";
import {PopupComponent} from "./components/popup/popup.component";

const routes: Routes = [
  {
    path: '',
    component: UserInterfaceComponent
  },
  {
    path: 'form',
    component: PopupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
