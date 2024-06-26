import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginSubject = new BehaviorSubject<boolean>(false);
  loginStatusChanged = this.loginSubject.asObservable();
  login: boolean = false;
  data: any;

  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  setUsername(username: string) {
    this.usernameSubject.next(username);
  }

  getUsername() {
    return this.usernameSubject.value;
  }


  tryLogin(body: any): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return new Observable<boolean>(observer => {
      this.httpClient.post<any>("http://localhost:4200/api/admins/login", body, httpOptions).subscribe({
        next: response => {
          this.data = response;
          if (this.data.valid === "true") {
            this.loginSubject.next(true);
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        },
        error: error => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  logOut() {
    this.loginSubject.next(false);  
  }

  getLogin(): boolean {
    return this.login;
  }
}
