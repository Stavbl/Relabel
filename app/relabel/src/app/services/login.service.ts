import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { User } from '../models/user';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

  private base_url: String = 'http://localhost:3000/users';

  constructor(private http: Http) { }

  login(username:string, password:string): Promise<User> { 
    return this.http.post(this.base_url + '/login',{username,password}).toPromise().then((res) => res.json() as User);
  }
  logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
