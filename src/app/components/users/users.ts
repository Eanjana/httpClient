import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {

  private userService = inject(UserService);

  users: any[] = [];
  message = '';


  //for highlighting add,update,patch background

  highlightId: number | null = null;
  highlightType: 'add' | 'update' | 'patch' | null = null;



  loadUsers() {
    this.userService.getUsers().subscribe({
      next: data => {
        this.users = data as any[];
        this.message = 'Users loaded from API!';
      },
      error: err => this.message = err.message
    });
  }

  addUser() {
    const newUser = {
      id: this.users.length + 1,
      name: 'Dustin',
      email: 'dustin@gmail.com'
    };

    this.users.push(newUser);   // adding to ui for display
    this.highlightId = newUser.id;
    this.highlightType = 'add';
    this.message = 'New User added locally to screen!';
  }

  updateUser() {
    if (this.users.length > 0) {
      this.users[0].name = 'Steve';
      this.highlightId = this.users[0].id;
      this.highlightType = 'update';
      this.message = '1st User name updated in UI! [ Leanne Graham changed to Steve ]';
    }
  }

  patchUser() {
    if (this.users.length > 0) {
      this.users[3].email = 'patricia@gmail.com ';
      this.highlightId = this.users[3].id
      this.highlightType = 'patch';
      this.message = '4th User patricia email changed! [julianne.OConner@kory.org email changed to patricia@gmail.com]';
    }
  }

  deleteUser() {
    if (this.users.length > 0) {
      this.users.shift(); // remove first user
      this.message = 'First user deleted from UI!';
    }
  }
}
