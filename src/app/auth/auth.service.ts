import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.prod';
import { throwError,Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: any;
  private loginUrl = environment.baseUrl + "/login";
  private apiUrl = environment.baseUrl;
  private accessToken: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

 login(credentials: { email: string, password: string }) {
  return this.http.post<{ token: string }>(this.loginUrl, credentials)
    .pipe(
      tap(response => {
      
        this.token = response.token;
        localStorage.setItem('access_token', response.token);
        this.isAdmin();
      }),
   
      catchError(error=>{
        if(error.status===401){
          return throwError('Incorrect email or password');
        }

        return throwError('An unknown error occurred');
      })
    );
}

registerUser(userData): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, userData).pipe(
    catchError(error => {
      if (error.status === 409) {
        // Handle 409 error code specifically if needed
        return throwError('Email is already registered.');
      }
      // Handle any other error types if needed
      return throwError(error.error.message || 'Server error');
    })
  );
}



  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  isAdmin() {
  if(this.jwtHelper.decodeToken().roleId === 1){
    return true;
  }else{
    return false;
  }
    
  }

  isLoggedIn() {
    if (!this.token) {
      const token = localStorage.getItem('access_token');

      if (token && !this.jwtHelper.isTokenExpired(token)) {
        this.token = token;
      }
    }

    return !!this.token;
  }
}
