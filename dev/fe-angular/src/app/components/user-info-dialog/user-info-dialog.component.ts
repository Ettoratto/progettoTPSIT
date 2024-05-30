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

    if(!this.checkCodiceFiscale()) {
      this.openSnackBar("Codice fiscale non valido");
    }else{
      this.createBody();
      this.addEditUserService.editUser(this.body);
    }
    
    this.mainDiv.closeDialog();
  }

  addUser() {
  }

  createBody() {
    this.body = {
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      codiceFiscale: this.userForm.get('codiceFiscale')?.value,
      birth: this.userForm.get('birth')?.value,
      phone: this.userForm.get('phone')?.value,
      address: this.userForm.get('address')?.value,
      email: this.userForm.get('email')?.value,
      subscribtion: this.userForm.get('subscribtion')?.value,
      medicalCertExpiry: this.userForm.get('medicalCertExpiry')?.value
    };
  }

  fillInputs() {

    if(this.checkUser()){

      
    }
  }

  checkUser() {

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
