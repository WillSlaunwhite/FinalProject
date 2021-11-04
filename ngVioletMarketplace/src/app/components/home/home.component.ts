import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Token } from 'src/app/models/token';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', ]
})
export class HomeComponent implements OnInit {
  tokens: Token[] = [];
  constructor(private tokenService: TokenService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) { }



  ngOnInit(): void {
    console.log(this.tokens.length);

    this.getTokens();

    console.log(this.tokens.length);

  }

  getTokens(): void {
    this.tokenService.getAllTokens().subscribe(
      tokenList => {
        console.log(tokenList.length);

        this.tokens = tokenList;
      },
      failed => {
        console.error('homeComponent.getTokens(): Error getting Token List');
        console.log(failed);
      }
    );
  }



  // getUser(username:string): Observable<User>{
  //   return this.http.get<User>(`${this.url}/${username}`).pipe(
  //     catchError((err:any) =>{
  //       console.error(err);
  //       return throwError('tokenService.getUser(): Error retreiving user');

  //     })
  //   );
  // }





  // ngOnInit(): void {
  //   if (!this.selected && this.route.snapshot.paramMap.get('id')) {
  //     this.todoService.show(this.route.snapshot.params['id']).subscribe(
  //       (success) => {
  //         this.reloadTodos();
  //         this.selected = success;
  //       },
  //       (fail) => {
  //         console.error('TodoListComponent.ngOnInit(): error initializing todo by id');
  //         console.error(fail);
  //         this.router.navigateByUrl('notfound');
  //       }
  //     );
  //   } else {
  //     this.reloadTodos();
  //   }
  // }

}
