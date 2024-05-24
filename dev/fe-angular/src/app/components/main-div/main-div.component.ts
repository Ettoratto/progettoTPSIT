import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {DialogContentComponent} from '../dialog-content/dialog-content.component';
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      scrollStrategy: this.scrollStrategyOptions.noop(),
      width: '250px',
      data: { /* any data you want to pass to the dialog */ }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log(result); // handle the result here if needed
    });
  }
}
