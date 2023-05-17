import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UsersService} from "../../services/user.service";
import '../../../uikit.d.ts'

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService) {

  }

  save() {
    let user = this.formGroup.value;
    user.birthDate = this.formatDate(user.birthDate)
    this.userService.create(user).subscribe(() => {
      let modal2 = UIkit.modal('#register-popup')
      modal2.show();
    })
  }

  ngOnInit(): void {
    this._createForm();
  }

  private _createForm() {
    this.formGroup = this.fb.group({
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
}
