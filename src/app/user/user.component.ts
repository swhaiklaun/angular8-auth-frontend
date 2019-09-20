import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, startWith, delay, tap } from 'rxjs/operators';

import { User, Role } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements AfterViewInit, OnInit {
  users: User[];
  userForm: FormGroup;
  user: User = new User();
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    console.log('ngOnInit');
    this.user.id = '';
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });

    this.reloadData();
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    // this.loading = false;
    // this.reloadData();
  }

  isFormValid(): boolean {
    if (this.loading) {
      return this.userForm.valid;
    } else {
      return false;
    }
  }

  // convenience getter for easy access to form fields in html
  get f() { return this.userForm.controls; }

  reloadData() {
    this.loading = true;
    this.userService.getAll().pipe(
      startWith(null),
      delay(0)
    ).subscribe(users => {
        this.loading = false;
        this.users = users;
    });
  }

  editUser(u: User): void {
    this.userService.getById(u.id).subscribe(data => {
      this.user = data;
      this.user.password = '';
    });
  }

  deleteUser(u: User): void {
    this.userService.delete(u).subscribe(data => {
      console.log(data);
      this.reloadData();
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
        return;
    }

    this.loading = true;

    // test
    this.user.role = new Role();
    this.user.role.id = 'ck0oou39u002g0844uesg0ov4';
    this.user.status = 'Pending';

    // console.log(this.user);
    if (this.user.id === '') {
      this.userService.create(this.user)
        .pipe(
          delay(0)
        )
        .subscribe(
          data => {
            this.userForm.reset();
            this.submitted = false;
            this.reloadData();
          },
          error => {
            this.error = error;
            this.loading = false;
        });
    } else {
      this.userService.update(this.user)
        .pipe(
          delay(0)
        )
        .subscribe(
          data => {
            this.userForm.reset();
            this.submitted = false;
            this.reloadData();
          },
          error => {
            this.error = error;
            this.loading = false;
        });
    }
  }
}
