import { Component, Inject, Injectable } from '@angular/core';
import { MainDivComponent } from '../main-div/main-div.component';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../services/user-data.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditUserService } from '../../services/add-edit-user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-user-info-dialog',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-info-dialog.component.html',
  styleUrl: './user-info-dialog.component.scss'
})
export class UserInfoDialogComponent {

  constructor (@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<UserInfoDialogComponent>, private mainDiv: MainDivComponent, private fb: FormBuilder,  private _snackBar: MatSnackBar, private addEditUserService: AddEditUserService) {}

  userForm!: FormGroup;
  inputs: any;
  body: any;

  sexOptions = ['M', 'F', 'A'];
  subscriptionOptions = [1, 3, 6, 12];

  ngOnInit() {
    this.userForm = this.fb.group({
      nome: [''],
      cognome: [''],
      dataNascita: [''],
      telefono: [''],
      indirizzo: [''],
      email: [''],
      dataAbbonamento: [''],
      sesso: [''],
      scadenzaCertificato: [''],
      codiceFiscale: ['', Validators.required]
    });

    this.dialogRef.backdropClick().subscribe(() => {
      this.closeSnackBar();
    });

    if(this.data.userEdit)
      this.fillInputs();
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, "Chiudi");
  } 

  closeSnackBar() {
    this._snackBar.dismiss();
  }

  submitUserForm() {
    
    if(!this.checkCodiceFiscale()) 
      this.openSnackBar("Codice fiscale non valido");
    else{
      if(this.data.userEdit)
        this.editUser();
      else
        this.addUser()
    }
  }

  editUser(){

    this.createBody();
    this.addEditUserService.editUser(this.data.user.codiceFiscale, this.body).subscribe({
      next: success => {
        if (success) {
          this.openSnackBar("Utente aggiornato!");
          this.mainDiv.closeDialog();
        } else 
          this.openSnackBar("Errore durante la modifica");
      },
      error: error => {
        this.openSnackBar("Errore durante la modifica");
      }
    });
    this.mainDiv.closeDialog();
  }

  addUser(){

    this.createBody();
    console.log(this.body);
    this.addEditUserService.addUser(this.body).subscribe({
      next: success => {
        if (success) {
          this.openSnackBar("Utente registrato!");
          this.mainDiv.closeDialog();
        } else 
          this.openSnackBar("Utente già registrato");
      },
      error: error => {
        this.openSnackBar("Errore durante la registrazione");
      }
    });
  }

  createBody() {
    this.body = {
      first_name: this.userForm.get('nome')?.value,
      last_name: this.userForm.get('cognome')?.value,
      codiceFiscale: this.userForm.get('codiceFiscale')?.value,
      date_of_birth: this.userForm.get('dataNascita')?.value,
      phone: this.userForm.get('telefono')?.value,
      address: this.userForm.get('indirizzo')?.value,
      email: this.userForm.get('email')?.value,
      sex: this.userForm.get('sesso')?.value,
      subscription: this.userForm.get('dataAbbonamento')?.value,
      medical_certificate_date: this.userForm.get('scadenzaCertificato')?.value
    };
  }

  fillInputs() {
    let dateValue: string;
    
    console.log(this.data.user);
    this.userForm.get('nome')?.setValue(this.data.user.first_name);
    this.userForm.get('cognome')?.setValue(this.data.user.last_name);
    this.userForm.get('codiceFiscale')?.setValue(this.data.user.codiceFiscale);

    if(this.data.user.date_of_birth != ""){
      dateValue = this.setDateValue(this.data.user.date_of_birth);
      this.userForm.get('dataNascita')?.setValue(dateValue);
    }
    
    this.userForm.get('telefono')?.setValue(this.data.user.phone);
    this.userForm.get('indirizzo')?.setValue(this.data.user.address);
    this.userForm.get('email')?.setValue(this.data.user.email);
    
    
    const selectedSex = this.sexOptions.find(option => option === String(this.data.user.sex));
    this.userForm.get('sesso')?.setValue(selectedSex);

    if(this.data.user.subscription != ""){
      dateValue = this.setDateValue(this.data.user.subscription);
      this.userForm.get('dataAbbonamento')?.setValue(dateValue);
    }

    if(this.data.user.medical_certificate_date != ""){
      dateValue = this.setDateValue(this.data.user.medical_certificate_date);
      this.userForm.get('scadenzaCertificato')?.setValue(dateValue);
    }
  }

  setDateValue(dateString: string) {

    const [day, month, year] = dateString.split('/').map(part => parseInt(part, 10));
    const formattedDate = new Date(year, month - 1, day + 1).toISOString().split('T')[0];

    return formattedDate;
  }

  /* getSubscriptionDate() {

    const subscription:string = this.userForm.get('dataAbbonamento')?.value;
    const currentDate = new Date();

    const newDate = new Date(currentDate);
    const newMonth = currentDate.getMonth() + parseInt(subscription);

    newDate.setMonth(newMonth);

    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear().toString();

    return `${day}/${month}/${year}`;
  } */

  checkCodiceFiscale(): boolean {

    const regex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
    let codiceFiscale = this.userForm.get('codiceFiscale')?.value;
    return regex.test(codiceFiscale);
  }

  cancel() {
    
    this.mainDiv.closeDialog();
  }
}
