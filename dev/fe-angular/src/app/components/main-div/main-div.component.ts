import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoDialogComponent } from '../user-info-dialog/user-info-dialog.component';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';

@Component({
  selector: 'app-main-div',
  standalone: true,
  providers: [MatDialog],
  templateUrl: './main-div.component.html',
  styleUrl: './main-div.component.scss'
})
export class MainDivComponent {
  constructor(public dialog: MatDialog, private scrollStrategyOptions: ScrollStrategyOptions) {}

  openDialog(firstName:string, lastName:string, cf:string, birth:string, phone:string, address:string, medicalCertExpiry:string): void {
    const dialogRef = this.dialog.open(UserInfoDialogComponent, {
      scrollStrategy: this.scrollStrategyOptions.noop(),
      panelClass: 'custom-dialog-container',
      width: '60%',
      height: '70%',
      data: {firstName, lastName, cf, birth, phone, address, medicalCertExpiry}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
