import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
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
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
        this.loading = false;
        this.users = users;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    if (this.userForm.invalid) {
        return;
    }

    this.loading = true;

    // test
    this.user.role = 'Developer';
    this.user.status = 'Pending';

    this.userService.save(this.user)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
            // this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
      }
    );
  }
}
