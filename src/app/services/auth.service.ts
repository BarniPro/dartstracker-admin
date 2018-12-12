import { Injectable } from '@angular/core';
import {UserModel} from '../models/user.model';
import User = UserModel.User;
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Rights} from './rights';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean;
  public user: User;
  redirectUrl: string;

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  async login(username: string, password: string): Promise<User> {
    try {
      const token = btoa(`${username}:${password}`);
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Basic ' + token);
      const user = await this.http.post<User>(`${this.baseUrl}/users/login`, username, httpOptions).toPromise();
      this.isLoggedIn = true;
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('role', user.role);
      return Promise.resolve(this.user);
    } catch (e) {
      console.log(e);
      return Promise.reject();
    }
  }

  logout() {
    httpOptions.headers = httpOptions.headers.set('Authorization', ``);
    this.isLoggedIn = false;
    this.user = null;
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('role');
  }

  hasRight(rightName: string): boolean {
    const right = Rights.find((r) => r.name === rightName);
    const role = window.localStorage.getItem('role');
    if (right && role) {
      switch (role) {
        case ('ROLE_OFFICIAL'):
          return right.official;
        case ('ROLE_ADMIN'):
          return right.admin;
        case ('ROLE_PLAYER'):
          return right.player;
      }
    }
    return false;
  }
}
