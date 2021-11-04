import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/user';

  login(username: string, password: string) {
    // Make credentials
    const credentials = this.generateBasicAuthCredentials(username, password);
    // Send credentials as Authorization header (this is spring security convention for basic auth)
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest',
      }),
    };
    // still in login()
    // create request to authenticate credentials
    return this.http.get(this.baseUrl + 'authenticate', httpOptions).pipe(
      tap((res) => {
        localStorage.setItem('credentials', credentials);
        localStorage.setItem('username', username);
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('AuthService.login(): Error logging in.');
      })
    );
  }

  getUser(username: string | null): Observable<User> {
    return this.http.get<User>(`${this.url}/${username}`).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('auth.getUser(): Error retreiving user');
      })
    );
  }

  getHttpOptions() {
    let credentials = this.getCredentials();
    let options = {
      headers: {
        'X-Requestd-With': 'XMLHttpRequest',
        Authorization: `Basic ${credentials}`,
      },
    };
    return options;
  }

  register(user: User) {
    // create request to register a new account
    localStorage.setItem('username', user.username);
    return this.http.post(this.baseUrl + 'register', user).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('AuthService.register(): error registering user.');
      })
    );
  }

  logout() {
    localStorage.removeItem('credentials');
    localStorage.removeItem('username');
  }

  isUserLoggedIn() {
    if (localStorage.getItem('credentials')) {
      return true;
    }
    return false;
  }

  generateBasicAuthCredentials(username: string, password: string) {
    return btoa(`${username}:${password}`);
  }

  getCredentials() {
    return localStorage.getItem('credentials');
  }

  getUsername() {
    return localStorage.getItem('username');
  }
}
