import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { error } from "console";
import { environment } from "../../../environments/environment";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  firstName: any;
  email: any;
  password: any;
  confirmPassword: any;
  selectedRole: any;
  usersData: any;

  usersForm: FormGroup = new FormGroup({
    usersFirstName: new FormControl("", [Validators.required]),
    usersEmail: new FormControl("", [Validators.required]),
    usersRole: new FormControl("", [Validators.required]),
    usersPassword: new FormControl("", [Validators.required]),
    usersConfirmPassword: new FormControl("", [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private formModule: FormsModule,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.usersForm = new FormGroup(
      {
        usersFirstName: new FormControl("", [Validators.required]),
        usersEmail: new FormControl("", [Validators.required]),
        usersRole: new FormControl("", [Validators.required]),
        usersPassword: new FormControl("", [Validators.required]),
        usersConfirmPassword: new FormControl("", [Validators.required]),
      },
      {
        validators: this.checkPasswords,
      }
    );
  }
  onFormSubmit() {
    if (this.usersForm.invalid) {
      this.toastr.error("Something went wrong");
      return;
    }

    const usersData = {
      firstName: this.firstName,
      email: this.email,
      password: this.password,
      roleId: this.selectedRole,
    };

    // this.registerUser(usersData).subscribe(
    //   (response) => {
    //     if (response["success"]) {
    //       this.toastr.success("Successfully Added");
    //     }
    //   },
    //   (error) => {
    //     this.toastr.error(error);
    //     console.log(error);
    //   }
    // );

    this.authService.registerUser(usersData).subscribe(
      (response) => {
        if (response.success) {
          this.toastr.success(response.message);
          this.usersForm.reset();
        } else {
          this.toastr.error("please fill with correct informations");
        }
      },
      (error) => {
        console.error(error);
        if (error === "Email is already registered.") {
          this.toastr.error(error);
        } else {
          this.toastr.error("Something went wrong");
        }
      }
    );
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get("usersPassword").value;
    const confirmPass = group.get("usersConfirmPassword").value;

    return pass === confirmPass ? null : { notSame: true };
  }

  registerUser(usersData: any): Observable<any> {
    const url = environment.baseUrl + "/register";
    return this.http.post(url, usersData);
  }
}
