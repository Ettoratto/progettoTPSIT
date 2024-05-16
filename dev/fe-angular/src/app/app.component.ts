import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ActiveUsersComponent } from './components/active-users/active-users.component';

import { TutorialsService } from './services/tutorials.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, HttpClientModule, SidebarComponent, ActiveUsersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fe-angular';

  tutorials: any;

  constructor(private tutorialsService: TutorialsService) {}

  ngOnInit() {
    this.tutorialsService.getTutorials().subscribe((data: any) => {
      this.tutorials = data;
    });

  }

}
