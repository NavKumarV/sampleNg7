import { Component, OnInit, OnDestroy } from '@angular/core';
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

export class LoginComponent implements OnInit, OnDestroy {

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
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.userSignupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
    });

    this.adminLoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
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
    // Remove below res mockdata
    const res = {
      status: true,
      userDetails: {
        id: '000',
        name: 'abcd',
      }
    };

    // Uncomment below code
    // this.restApiService.userLogin(this.userLoginForm.value).subscribe((res: any) => {
    //   console.log(res);
      // if (res.status) {

      localStorage.setItem('user-data', JSON.stringify(res));
      const navData: NavigationExtras = { state: res };
      this.router.navigate(['/user'], navData);

      // } else {
      //   alert('Invalid user credentials check Login components.ts');
      // }
    // })
  }

  signupUser() {
    console.log(this.userSignupForm.value);
    this.restApiService.userSignup(this.userSignupForm.value).subscribe((res: any) => {
      console.log(res);

    });
  }

  loginAdmin() {
    // Remove below res mockdata
    const res = {
      status: true,
      userDetails: {
        id: '000',
        name: 'Admin',
      }
    };

    // Uncomment below code
    // console.log(this.adminLoginForm.value);
    // this.restApiService.userLogin(this.userLoginForm.value).subscribe((res: any) => {
      // console.log(res);
      // if (res.status) {

      localStorage.setItem('admin-data', JSON.stringify(res));
      const navData: NavigationExtras = { state: res };
      this.router.navigate(['/admin'], navData);

      // } else {
      //   alert('Invalid admin credentials check Login components.ts');
      // }
    // });
  }

  goToLoginType() {
    this.showView = this.viewType.SELECT_LOGIN_TYPE;
    this.showAction = this.actionType.LOGIN;
  }

  ngOnDestroy() {
    this.goToLoginType();
  }

}
