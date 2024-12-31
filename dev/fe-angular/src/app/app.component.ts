import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ActiveUsersComponent } from './components/active-users/active-users.component';
import { MainDivComponent } from './components/main-div/main-div.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, 
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
SidebarComponent, ActiveUsersComponent, MainDivComponent, MatDialogModule, LoginComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fe-angular';
  isDarkTheme: boolean = false;

  login:boolean = false;

  private loginSubscription: Subscription | undefined;

  constructor(private loginService: LoginService) {}
  ngOnInit() {
      
      this.loginSubscription = this.loginService.loginStatusChanged.subscribe(status => {
      this.login = status;
    });
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  toggleTheme() {

    if(this.isDarkTheme) {
      this.setCustomProperty('--first', '#FFFCF2');
      this.setCustomProperty('--second', '#C9C6BE');
      this.setCustomProperty('--third', '#92908A');
      this.setCustomProperty('--fourth', '#5C5A56');
      this.setCustomProperty('--fifth', '#252422');
      this.setCustomProperty('--accent', '#EB5E28');
    }else{
      this.setCustomProperty('--first', '#252422');
      this.setCustomProperty('--second', '#5C5A56');
      this.setCustomProperty('--third', '#6A6863');
      this.setCustomProperty('--fourth', '#AEABA4');
      this.setCustomProperty('--fifth', '#EBE8DF');
      this.setCustomProperty('--accent', '#99D538');

    }
    this.isDarkTheme = !this.isDarkTheme;
  }



  setCustomProperty(propertyName: string, value: string): void {
    document.documentElement.style.setProperty(propertyName, value);
  }

}
