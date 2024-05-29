import { Component, Injectable } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatDialogRef } from '@angular/material/dialog';
import { UserInfoDialogComponent } from '../user-info-dialog/user-info-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-log-out-dialog',
  standalone: true,
  imports: [],
  templateUrl: './log-out-dialog.component.html',
  styleUrl: './log-out-dialog.component.scss'
})
export class LogOutDialogComponent {

  constructor(private sidebarComponent: SidebarComponent, private dialogRef: DialogRef) {}

  logOut(){

    this.sidebarComponent.logOut();
    this.dialogRef.close();
  }

  cancel(){

    this.dialogRef.close();
  }
}
