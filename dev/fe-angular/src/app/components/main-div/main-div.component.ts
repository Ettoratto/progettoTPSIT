import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoDialogComponent } from '../user-info-dialog/user-info-dialog.component';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { CommonModule, NgIf } from '@angular/common';
import { UserDataService } from '../../services/user-data.service';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  medical_certificate_date: string;
  date_of_birth: string;
  codice_fiscale: string;
  checked: boolean;
}

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-main-div',
  standalone: true,
  providers: [MatDialog],
  imports: [CommonModule, NgIf],
  templateUrl: './main-div.component.html',
  styleUrl: './main-div.component.scss'
})
export class MainDivComponent implements OnInit {
  
  constructor(public dialog: MatDialog, private scrollStrategyOptions: ScrollStrategyOptions, private userData: UserDataService) {}

  users: User[] = [];

  displayInfo: boolean = false;

  ngOnInit() {

    this.getUsers();
  }

  getUsers() {
    this.userData.getUsers().subscribe({
      next: users => {
        users.forEach((user:User) => {
          this.addUser(user);
        });
      }
    });
  }

  addUser(user: User) {
    this.users.push(user);
  }

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

  toggleCheckBox(user: User) {
    user.checked = !user.checked;
  }

  displayUserInfo(user: User){

    this.displayInfo = !this.displayInfo;
  }
}
