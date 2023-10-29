import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { OutletService } from '../../services/outlet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  errorMessage = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private outlet:OutletService,
    private authService:AuthService,
    private toastr: ToastrService


    ) {}

  ngOnInit() {

  }
 

  login(){
    if (this.loginForm.invalid) {
    this.toastr.error("Please enter valid email/password");
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      () => {
        if (this.authService.isAdmin()) {
          this.toastr.success("Success");
          this.router.navigate(['/stall']);
        } else {
          this.toastr.error("Email or Password is incorrect")
          this.router.navigate(['/login']);
        }
      },
      (error) => {
      this.toastr.error(error);
        this.errorMessage = error;
        this.loginForm.reset();
      }
    );


  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
