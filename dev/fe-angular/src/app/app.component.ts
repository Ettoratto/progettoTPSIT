import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

import { TutorialsService } from './services/tutorials.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, HttpClientModule, SidebarComponent],
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
