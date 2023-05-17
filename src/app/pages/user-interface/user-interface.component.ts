import { Component, OnInit, OnDestroy } from '@angular/core';
import {UsersService} from "../../services/user.service";
import {User} from "../../../models/User";
import {UserFormComponent} from "../../components/user-form/user-form.component";
import { Subscription } from 'rxjs';
import {EventService} from "../../services/event.service";

@Component({
  selector: 'user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit, OnDestroy{

  users: User[] = [];
  editingUser: User | null = null;
  subscription!: Subscription;

  constructor(private userService: UsersService, private userFormComponent: UserFormComponent) {
  }

  async ngOnInit() {
    this.loadUsers();

    EventService.get('modalClosed').subscribe((value) => {
      console.log('value', value)
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

  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}
