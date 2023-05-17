import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/user.service";
import {User} from "../../../models/User";

@Component({
  selector: 'user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UsersService) {
  }

  async ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.read().subscribe((response) => {
      console.log('users', response.results)
      this.users = response.results;
    })
  }

  edit(user: User) {

  }

  delete(userId: number) {

  }
}
