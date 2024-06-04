import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from '../../app.component';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { LogOutDialogComponent } from '../log-out-dialog/log-out-dialog.component';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActionHistoryService } from '../../services/action-history.service'; // Import the service

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  username: string = "";
  private subscription: Subscription | undefined;
  private actionSubscription: Subscription | undefined;
  accessTime: string = "";
  isDarkTheme: boolean = false;
  actions: string[] = ["ciao", "ciao2"];

  constructor(
    private appComponent: AppComponent,
    private loginService: LoginService,
    private dialog: MatDialog,
    private scrollStrategyOptions: ScrollStrategyOptions,
    private actionHistoryService: ActionHistoryService
  ) {}

  ngOnInit() {
    this.subscription = this.loginService.username$.subscribe((username: any) => {
      this.username = username;
      if(this.username != "") {
        const now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');

        this.accessTime = `${hours}:${minutes}`;
      }
    });

    this.actionSubscription = this.actionHistoryService.actionHistory$.subscribe(actions => {
      this.actions = actions;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.actionSubscription) {
      this.actionSubscription.unsubscribe();
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.appComponent.toggleTheme();
  }

  logOut() {
    this.loginService.logOut();
  }

  logOutDialog(){
    this.dialog.open(LogOutDialogComponent, {
      scrollStrategy: this.scrollStrategyOptions.noop(),
      panelClass: 'custom-dialog-container',
      width: '25%',
      height: '20%'
    });
  }
}
