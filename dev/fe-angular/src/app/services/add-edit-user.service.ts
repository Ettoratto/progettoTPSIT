import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddEditUserService {

  constructor(private httpClient: HttpClient) { }

  data: any;

  getUser(body: any): Observable<boolean> {
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

  editUser(body: any) {
    // Edit user
  }

  addUser(body: any) { 
    // Add user
  }

}
