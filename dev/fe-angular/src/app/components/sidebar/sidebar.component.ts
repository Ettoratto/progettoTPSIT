import { Component, Injectable, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { LogOutDialogComponent } from '../log-out-dialog/log-out-dialog.component';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent{

  constructor(private appComponent: AppComponent, private loginService: LoginService, private dialog: MatDialog, private scrollStrategyOptions: ScrollStrategyOptions) { }

  username: string = "";
  private subscription: Subscription | undefined;
  accessTime: string = "";
  isDarkTheme: boolean = false;



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
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
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