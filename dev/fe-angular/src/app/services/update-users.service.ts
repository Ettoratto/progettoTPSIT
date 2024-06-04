import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateUsersService {

  private usersSubject = new BehaviorSubject<number>(0);
  users$ = this.usersSubject.asObservable();

  constructor() { }

  updateUsers() {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next(currentUsers + 1);
  }
}

