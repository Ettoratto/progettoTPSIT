import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginSubject = new BehaviorSubject<boolean>(false);
  loginStatusChanged = this.loginSubject.asObservable();
  login: boolean = false;

  constructor(private httpClient: HttpClient) { }

  tryLogin(data: any) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.httpClient.post("http://localhost:8080/admins/login", data, httpOptions);
  }

  logOut(){

    this.loginSubject.next(false);
  }

  getLogin(): boolean {
    return this.login;
  }
}
