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
import { ThisReceiver } from '@angular/compiler';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  medical_certificate_date: string;
  date_of_birth: string;
  codiceFiscale: string;
  subscription: string;
  checked: boolean;
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
  
  constructor(public dialog: MatDialog, private scrollStrategyOptions: ScrollStrategyOptions, private userData: UserDataService) {}

  users: User[] = [];

  searchQuery: string = '';

  options: string[] = [];
  
  filteredOptions: Observable<string[]> | undefined;
  searchControl = new FormControl();

  displayInfo: boolean = false;
  

  ngOnInit() {

    this.getUsers().subscribe(() => {
      this.initializeOptions();
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

      this.users = [];
      this.ngOnInit();
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

  checkUserSubscription(userDate: string){
    const currentDate = new Date();
    const userDateAr = userDate.split('/');
    const finalUserDate =  new Date(parseInt(userDateAr[2]), parseInt(userDateAr[1]), parseInt(userDateAr[0]));
    return (finalUserDate < currentDate);
  }
}
