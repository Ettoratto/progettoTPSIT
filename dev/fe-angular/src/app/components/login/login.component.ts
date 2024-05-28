import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, JsonPipe, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  data: any;
  username!: string;
  password!: string;

  constructor(private fb: FormBuilder, private loginService: LoginService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, "Chiudi");
  } 

  closeSnackBar() {
    this._snackBar.dismiss();
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      const usernameControl = this.loginForm.get('username');
      const passwordControl = this.loginForm.get('password');

      if (usernameControl && passwordControl) {
        const username = usernameControl.value;
        const password = passwordControl.value;

        console.log('Username:', username);
        console.log('Password:', password);

        const body = `{"username": "${username}","password": "${password}"}`;

        this.loginService.tryLogin(body).subscribe(response => {
          this.data = response;
          if (this.data.valid)
            this.closeSnackBar();
          else
            this.openSnackBar("Username o password errati");
        });
      }
    }else
      this.openSnackBar("Inserire username e password");
  }




}
