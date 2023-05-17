import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UsersService} from "../../services/user.service";
import '../../../uikit.d.ts'
import {User} from "../../../models/User";
import { Subject, BehaviorSubject } from "rxjs";
import { finalize } from 'rxjs/operators';
import { EventService } from "../../services/event.service";

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {
  @Input() user: User | null = null;
  formGroup!: FormGroup;
  finallyAction: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(private fb: FormBuilder, private userService: UsersService) {

  }

  close() {
    EventService.get('modalClosed').emit('close');
  }

  save() {
    let user = this.formGroup.value;
    user.birthDate = this.formatDate(user.birthDate)

    if (this.user){
      let userId = user.id;
      delete user.id;
      this.userService.update(user, userId).subscribe(() => {
        EventService.get('modalClosed').emit('edited');
      })
    } else {
      delete user.id;
      this.userService.create(user).subscribe(() => {
        EventService.get('modalClosed').emit('created');
      })
    }
  }

  ngOnInit(): void {
    this._createForm();

    if (this.user) {
      this.formGroup.patchValue({
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        birthDate: this.formatBrazilianDate(this.user.birthDate),
      })
    }
  }

  private _createForm() {
    this.formGroup = this.fb.group({
      id: [''],
      name: ['', Validators.compose([
        Validators.required,
      ])],
      phone: ['',
        Validators.compose([
          Validators.required,
        ])],
      email: ['',
        Validators.compose([
          Validators.required,
          Validators.min(1)
        ])],
      birthDate: ['',
        Validators.compose([
          Validators.required,
          Validators.min(1)
        ])],
    });
  }

  formatDate(date: string) {
    let dateSplited = date.split('/');
    let day = dateSplited[0];
    let month = dateSplited[1];
    let year = dateSplited[2];

    let formatedDate = year + '-' + month + '-' + day;

    let isoDate = new Date(formatedDate).toISOString();

    return isoDate;
  }

  formatBrazilianDate(isoDate: string) {
    const date = new Date(isoDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
