import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialsService {

  constructor(private httpClient: HttpClient) { }

  getTutorials() : Observable<any> {
      return this.httpClient.get('http://localhost:4200/api/tutorials/list');
  }
}
