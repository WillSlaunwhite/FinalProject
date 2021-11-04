import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Token } from '../models/token';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private http: HttpClient, private auth: AuthService) { }
  private baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/tokens';

  // index(): Observable<Token[]> {
  //   return this.http.get<Token[]>(this.url, this.getHttpOptions()).pipe(
  //     catchError((err: any) => {
  //       console.log(err);
  //       return throwError('tokenService.index(): Error retrieving Token list');
  //     })
  //   );
  // }

  getAllTokens(): Observable<Token[]> {
    return this.http.get<Token[]>(this.baseUrl + "api/home/tokens").pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('tokenService.index(): Error retrieving Token list');
      })
    );
  }

  getAllUserTokens(): Observable<Token[]> {
    return this.http.get<Token[]>(this.url + "/myTokens", this.auth.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('tokenService.index(): Error retrieving Token list');
      })
    );
  }

  create(token: Token): Observable<Token> {
    token.offered = false;
    return this.http.post<Token>(this.url, token, this.auth.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('tokenService.create(): Error creating Token');
      })
    );
  }

  show(id: number): Observable<Token> {
    return this.http.get<Token>(`${this.url}/id/${id}`).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('tokenService.show(): Error navigating to Token');
      })
    );
  }

  destroy(id: number) {
    return this.http.delete(`${this.url}/${id}`, this.auth.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('tokenService.delete(): Error deleting Token');
      })
    );
  }
}
