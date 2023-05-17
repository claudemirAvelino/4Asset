import { Component } from '@angular/core';
import { EventService } from "../../services/event.service";

@Component({
  selector: 'confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent {
  confirm() {
    EventService.get('ConfirmPopup').emit(true);
  }
}
