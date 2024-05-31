import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<any> {
  
    return new Observable<any[]>(observer => {
      this.httpClient.get<any[]>("http://localhost:4200/api/users/list").subscribe({
        next: response => {
          observer.next(response);
          observer.complete();
        },
        error: error => {
          observer.error(error);
          observer.complete();
        }
      });
    });
  }
}
