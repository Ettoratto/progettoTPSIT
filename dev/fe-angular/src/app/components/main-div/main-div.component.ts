import { Component, Injectable, OnInit, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoDialogComponent } from '../user-info-dialog/user-info-dialog.component';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { CommonModule, NgIf } from '@angular/common';
import { UserDataService } from '../../services/user-data.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith, tap } from 'rxjs';
import { FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateUsersService } from '../../services/update-users.service';
import { ActionHistoryService } from '../../services/action-history.service';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  sex: string;
  email: string;
  medical_certificate_date: string;
  date_of_birth: string;
  codiceFiscale: string;
  subscription: string;
  checked: boolean;
  alreadyAdded: boolean;
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-main-div',
  standalone: true,
  providers: [MatDialog],
  imports: [CommonModule, NgIf, MatAutocompleteModule, FormsModule, ReactiveFormsModule],
  templateUrl: './main-div.component.html',
  styleUrl: './main-div.component.scss'
})
export class MainDivComponent implements OnInit{
  
  constructor(private actionHistory: ActionHistoryService, private updateUsers:UpdateUsersService, public dialog: MatDialog, private scrollStrategyOptions: ScrollStrategyOptions, private userData: UserDataService) {}

  users: User[] = [];
  userInfo!: User;
  tmpUsers: User[] = [];

  searchQuery: string = '';

  options: string[] = [];
  
  filteredOptions: Observable<string[]> | undefined;
  searchControl = new FormControl();

  displayInfo: boolean = false;
  

  ngOnInit():any {

    this.getUsers().subscribe(() => {
      this.initializeOptions();
      this.setChecks(this.tmpUsers);
    });
    
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  
  filteredUsers() {

    return this.users.filter(user => {
      const fullNameAndCF = `${user.first_name} ${user.last_name} ${user.codiceFiscale}`.toLowerCase();
      return fullNameAndCF.includes(this.searchQuery.trim().toLowerCase());  
    });
  }

  initializeOptions() {
  
    this.options = this.users.map(user => `${user.first_name} ${user.last_name}`);
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    this.users.forEach((user: User) => {
      this.options.push(user.first_name + " " + user.last_name);
    });

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getUsers(): Observable<User[]> {
    return this.userData.getUsers().pipe(
      tap(users => {
        users.forEach((user: User) => {
          user = this.checkForUndefined(user);
          this.addUser(user);
        });
      })
    );
  }

  checkForUndefined(user: User) {

    if (user.first_name === undefined) {
      user.first_name = "N/A";
    }
    if (user.last_name === undefined) {
      user.last_name = "N/A";
    }
    if (user.phone === undefined) {
      user.phone = "N/A";
    }
    if (user.address === undefined) {
      user.address = "N/A";
    }
    if (user.medical_certificate_date === undefined) {
      user.medical_certificate_date = "N/A";
    } else {
      let wrongMedicalDate = String(user.medical_certificate_date).split('-');
      if (wrongMedicalDate[0] === undefined || wrongMedicalDate[1] === undefined || wrongMedicalDate[2] === undefined) {
        user.medical_certificate_date = "N/A";
      } else {
        user.medical_certificate_date = `${wrongMedicalDate[2]}/${wrongMedicalDate[1]}/${wrongMedicalDate[0]}`;
      }
    }
    
    let wrongDate = String(user.date_of_birth).split('-');
    if (wrongDate[0] === undefined || wrongDate[1] === undefined || wrongDate[2] === undefined) {
      user.date_of_birth = "N/A";
    } else {
      user.date_of_birth = `${wrongDate[2]}/${wrongDate[1]}/${wrongDate[0]}`;
    }
    
    if (user.codiceFiscale === undefined) {
      user.codiceFiscale = "N/A";
    }
    
    if (user.subscription === undefined) {
      user.subscription = "N/A";
    } else {
      let wrongSubscriptionDate = String(user.subscription).split('-');
      if (wrongSubscriptionDate[0] === undefined || wrongSubscriptionDate[1] === undefined || wrongSubscriptionDate[2] === undefined) {
        user.subscription = "N/A";
      } else {
        user.subscription = `${wrongSubscriptionDate[2]}/${wrongSubscriptionDate[1]}/${wrongSubscriptionDate[0]}`;
      }
    }
    
    return user;
  
  }

  addUser(newUser: any) {
    this.users.push(newUser);
  }

  openDialog(userEdit:boolean, user:any): void {
      const dialogRef = this.dialog.open(UserInfoDialogComponent, {
      scrollStrategy: this.scrollStrategyOptions.noop(),
      panelClass: 'custom-dialog-container',
      width: '60%',
      height: '70%',
      data: {userEdit, user}
      
    });

    dialogRef.afterClosed().subscribe(() => {

      setTimeout(() => {
        this.tmpUsers = this.users;
        this.users = [];
        this.ngOnInit();
      }, 500); 
    })
  }

  setChecks(users: User[]) {
    
    console.log(users);
    users.forEach((user: User) => {
      this.users.forEach((newUser: User) => {
        if (user.id === newUser.id) {
          newUser.alreadyAdded = user.alreadyAdded;
        }
      });
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  toggleCheckBox(user: User) {

    user.checked = !user.checked;
  }

  updateUsersCount() {
    this.users.forEach((user: User) => {
      if (user.checked && !user.alreadyAdded) {
        this.updateUsers.updateUsers();
        user.alreadyAdded = true;
        this.actionHistory.addAction(`Segnato utente: ${user.first_name} ${user.last_name}`);
      }
    });
  }

  displayUserInfo(user: User){
    this.userInfo = user;
    this.displayInfo = true;
  }

  hideUserInfo() {
    this.displayInfo = false;
  }

  checkUserSubscription(userDate: string): boolean {
    const currentDate = new Date();

    const currentDay = currentDate.getDate().toString().padStart(2, '0');
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const currentYear = currentDate.getFullYear().toString();

    const userDateParts = userDate.split('/');
    const userDay = userDateParts[0].padStart(2, '0');
    const userMonth = userDateParts[1].padStart(2, '0');
    const userYear = userDateParts[2];
    
    const parsedCurrentDate = new Date(parseInt(currentYear), parseInt(currentMonth) - 1, parseInt(currentDay));
    const parsedUserDate = new Date(parseInt(userYear), parseInt(userMonth) - 1, parseInt(userDay));

    
    return parsedUserDate > parsedCurrentDate;
}


}
