import { Component } from '@angular/core';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, JsonPipe, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor (private loginService: LoginService) {}

  submitLoginForm(){
    this.loginService.tryLogin();
  }
}
