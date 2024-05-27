import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private appComponent: AppComponent, private loginService: LoginService) { }

  toggleTheme() {
    this.appComponent.toggleTheme();
  }

  logOut() {
    this.loginService.logOut();
  }

}