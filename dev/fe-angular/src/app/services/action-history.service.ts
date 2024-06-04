import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionHistoryService {
  private actionHistorySubject = new BehaviorSubject<string[]>([]);
  actionHistory$ = this.actionHistorySubject.asObservable();

  constructor() { }

  addAction(action: string) {

    let time = new Date().toLocaleTimeString();
    action = `${time.slice(0, 5)} - ${action}`;

    const currentActions = this.actionHistorySubject.value;
    this.actionHistorySubject.next([...currentActions, action]);
  }

  getActionHistory() {
    return this.actionHistorySubject.value;
  }
}
