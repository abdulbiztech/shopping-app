// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}?email=${email}&password=${password}`);
  }
  getUserByEmailAndPassword(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`);
  }
}
