import { Component, OnInit } from '@angular/core';
import { UpdateUsersService } from '../../services/update-users.service'; // Adjust the import path as necessary

@Component({
  selector: 'app-active-users',
  standalone: true,
  imports: [],
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss']
})
export class ActiveUsersComponent implements OnInit {

  activeUsers: number = 0;

  constructor(private updateUsersService: UpdateUsersService) { }

  ngOnInit(): void {
    this.updateUsersService.users$.subscribe(users => {
      this.activeUsers = users;
    });
  }
}
