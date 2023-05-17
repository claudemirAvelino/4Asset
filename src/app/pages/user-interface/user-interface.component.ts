import { Component, OnInit, OnDestroy } from '@angular/core';
import {UsersService} from "../../services/user.service";
import {User} from "../../../models/User";
import {UserFormComponent} from "../../components/user-form/user-form.component";
import { Subscription } from 'rxjs';
import {EventService} from "../../services/event.service";
import '../../../uikit.d.ts';

@Component({
  selector: 'user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit, OnDestroy{

  users: User[] = [];
  editingUser: User | null = null;
  subscription!: Subscription;
  userIdDeleting: number | null = null;

  constructor(private userService: UsersService, private userFormComponent: UserFormComponent) {
  }

  async ngOnInit() {
    this.loadUsers();

    EventService.get('modalClosed').subscribe((action) => {
      if (action === 'created') {
        this.editingUser = null;
        UIkit.modal('#register-popup').show()
      }
      if (action === 'edited') {
        this.editingUser = null;
        UIkit.modal('#edit-popup').show()
      }
      if (action === 'close') {
        this.editingUser = null;
      }
      this.loadUsers();
    })

    EventService.get('ConfirmPopup').subscribe((value) => {
      if (value)
        this.userService.delete(this.userIdDeleting).subscribe(() => {
          this.loadUsers();
        })
    })
  }

  loadUsers() {
    this.userService.read().subscribe((response) => {
      console.log('users', response.results)
      this.users = response.results;
    })
  }

  edit(user: User) {
    this.editingUser = user;
  }

  delete(userId: number) {
    this.userIdDeleting = userId;
    UIkit.modal('#delete-confirmation-popup').show();
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}
