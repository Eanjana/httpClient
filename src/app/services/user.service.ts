import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private postUrl = 'https://jsonplaceholder.typicode.com/posts';

  getUsers() {
    return this.http.get(this.apiUrl).pipe(
      catchError(err => {
        console.error('Error fetching users', err);
        return throwError(() => new Error('Failed to load users'));
      })
    );
  }

  getPosts() {
    return this.http.get(this.postUrl);
  }

  createUser(userData: any) {
    return this.http.post(this.apiUrl, userData);
  }

  updateUser(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  patchUser(id: number, data: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
