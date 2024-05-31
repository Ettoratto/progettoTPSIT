import { Component, Inject, Injectable } from '@angular/core';
import { MainDivComponent } from '../main-div/main-div.component';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../services/user-data.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditUserService } from '../../services/add-edit-user.service';

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

  ngOnInit() {
    this.userForm = this.fb.group({
      nome: [''],
      cognome: [''],
      dataNascita: [''],
      telefono: [''],
      indirizzo: [''],
      email: [''],
      tipoAbbonamento: [''],
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
        this.addUser();
    }
  }

  editUser() {

    this.createBody();
    this.addEditUserService.editUser(this.body);
    this.mainDiv.closeDialog();
  }

  addUser() {

    this.createBody();
    this.addEditUserService.addUser(this.body).subscribe({
      next: success => {
        if (success) {
          this.openSnackBar("Utente registrato con successo!");
          this.mainDiv.closeDialog();
        } else 
          this.openSnackBar("");
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
      codice_fiscale: this.userForm.get('codiceFiscale')?.value,
      date_of_birth: this.userForm.get('dataNascita')?.value,
      phone: this.userForm.get('telefono')?.value,
      address: this.userForm.get('indirizzo')?.value,
      email: this.userForm.get('email')?.value,
      subscribtion: this.userForm.get('tipoAbbonamento')?.value,
      medical_certificate_date: this.userForm.get('scadenzaCertificato')?.value
    };
  }

  fillInputs() {

    this.addEditUserService.getUser(this.data.codiceFiscale).subscribe((response:any) => {
      this.userForm.get('nome')?.setValue(response.firstName);
      this.userForm.get('cognome')?.setValue(response.lastName);
      this.userForm.get('codiceFiscale')?.setValue(response.codiceFiscale);
      this.userForm.get('dataNascita')?.setValue(response.birth);
      this.userForm.get('telefono')?.setValue(response.phone);
      this.userForm.get('indirizzo')?.setValue(response.address);
      this.userForm.get('email')?.setValue(response.email);
      this.userForm.get('tipoAbbonamento')?.setValue(response.subscribtion);
      this.userForm.get('scadenzaCertificato')?.setValue(response.medicalCertExpiry);
    });
  }

  findUserCF() {

    this.userForm.get('codiceFiscale')?.setValue(this.data.codiceFiscale);
    this.inputs = this.addEditUserService.getUser(this.data.codiceFiscale).subscribe(response => {
      return response;
    });
    return false;
  }

  checkCodiceFiscale(): boolean {

    const regex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
    let codiceFiscale = this.userForm.get('codiceFiscale')?.value;
    return regex.test(codiceFiscale);
  }

  cancel() {
    
    this.mainDiv.closeDialog();
  }
}
