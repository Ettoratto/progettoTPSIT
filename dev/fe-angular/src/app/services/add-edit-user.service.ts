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
      this.httpClient.post<any>("http://localhost:4200/api/users/login", body, httpOptions).subscribe({
        next: response => {
          this.data = response;
          if (this.data === "true") 
          observer.complete();
        },
        error: error => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  editUser(body: any): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return new Observable<boolean>(observer => {
      this.httpClient.post<any>("http://localhost:4200/api/users/login", body, httpOptions).subscribe({
        next: response => {
          this.data = response;
          if (this.data.valid === "true") {
            
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

  addUser(body: any): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return new Observable<boolean>(observer => {
      this.httpClient.post<any>("http://localhost:4200/api/users/register", body, httpOptions).subscribe({
        next: response => {
          this.data = response;
          if(this.data.response == "Customer saved"){
            observer.next(true);
            observer.complete();
          }else{
            observer.next(false);
            observer.complete();
          }
        },
        error: error => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

}
