import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ActiveUsersComponent } from './components/active-users/active-users.component';
import { MainDivComponent } from './components/main-div/main-div.component';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, HttpClientModule, SidebarComponent, ActiveUsersComponent, MainDivComponent, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fe-angular';

  tutorials: any;

  constructor() {}

  isDarkTheme: boolean = false;
  toggleTheme() {

    if(this.isDarkTheme) {
      this.setCustomProperty('--first', '#FFFCF2');
      this.setCustomProperty('--second', '#C9C6BE');
      this.setCustomProperty('--third', '#92908A');
      this.setCustomProperty('--fourth', '#5C5A56');
      this.setCustomProperty('--fifth', '#252422');
      this.setCustomProperty('--accent', '#EB5E28');
    }else{
      this.setCustomProperty('--first', '#14110F');
      this.setCustomProperty('--second', '#34312D');
      this.setCustomProperty('--third', '#7E7F83');
      this.setCustomProperty('--fourth', '#B9B9BC');
      this.setCustomProperty('--fifth', '#FFFCF2');
      this.setCustomProperty('--accent', '#D9C5B2');

    }
    this.isDarkTheme = !this.isDarkTheme;
  }

  setCustomProperty(propertyName: string, value: string): void {
    document.documentElement.style.setProperty(propertyName, value);
  }

}
