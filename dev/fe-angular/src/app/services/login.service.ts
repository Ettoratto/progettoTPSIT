import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginSubject = new BehaviorSubject<boolean>(false);
  loginStatusChanged = this.loginSubject.asObservable();
  login: boolean = false;
  constructor() { }

  tryLogin() {
    this.loginSubject.next(true);
  }

  logOut(){

    this.loginSubject.next(false);
  }

  getLogin(): boolean {
    return this.login;
  }
}
