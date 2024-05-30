import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoDialogComponent } from '../user-info-dialog/user-info-dialog.component';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { subscribeOn } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-main-div',
  standalone: true,
  providers: [MatDialog],
  templateUrl: './main-div.component.html',
  styleUrl: './main-div.component.scss'
})
export class MainDivComponent {
  constructor(public dialog: MatDialog, private scrollStrategyOptions: ScrollStrategyOptions) {}

  openDialog(userEdit:boolean, firstName:string, lastName:string, cf:string, birth:string, phone:string, address:string, email:string, subscribtion:string, medicalCertExpiry:string): void {
      this.dialog.open(UserInfoDialogComponent, {
      scrollStrategy: this.scrollStrategyOptions.noop(),
      panelClass: 'custom-dialog-container',
      width: '60%',
      height: '70%',
      data: {userEdit, firstName, lastName, cf, birth, phone, address, email, subscribtion, medicalCertExpiry}
      
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
