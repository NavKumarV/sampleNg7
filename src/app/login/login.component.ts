import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../service/rest-api.service';
import { Router, NavigationExtras } from '@angular/router';

enum ViewType {
  SELECT_LOGIN_TYPE= 'select-login-type',
  ADMIN_TYPE= 'admin-login-type',
  USER_TYPE= 'user-login-type',
}

enum ActionType {
  LOGIN= 'login',
  SIGNUP= 'signup',
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  viewType = ViewType;
  actionType = ActionType;
  showView = '';
  showAction = '';

  userLoginForm: FormGroup;
  userSignupForm: FormGroup;
  adminLoginForm: FormGroup;
  adminSignupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private restApiService: RestApiService,
    private router: Router
  ) {

    this.showView = this.viewType.SELECT_LOGIN_TYPE;
    this.showAction = this.actionType.LOGIN;
  }

  ngOnInit() {
    this.userLoginForm = this.formBuilder.group({
      email: ['', Validators.required],
      pwd: ['', Validators.required]
    });

    this.userSignupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      pwd: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }

  showUserLogin() {
    this.showView = this.viewType.USER_TYPE;
  }

  showAdminLogin() {
    this.showView = this.viewType.ADMIN_TYPE;
  }

  showLogin() {
    this.showAction = this.actionType.LOGIN;
  }

  showSignup() {
    this.showAction = this.actionType.SIGNUP;
  }

  loginUser() {
    console.log(this.userLoginForm.value);
    this.restApiService.userLogin(this.userLoginForm.value).subscribe(res => {
      console.log(res);
      const navData: NavigationExtras = { state: res };
      this.router.navigate(['/user'], navData);
    });
  }

  signupUser() {
    console.log(this.userSignupForm.value);
    this.restApiService.userSignup(this.userLoginForm.value).subscribe(res => {
      console.log(res);

    });
  }

  loginAdmin() {
    console.log(this.adminLoginForm.value);
    this.restApiService.userLogin(this.userLoginForm.value).subscribe(res => {
      console.log(res);
      const navData: NavigationExtras = { state: res };
      this.router.navigate(['/user'], navData);
    });
  }

}
