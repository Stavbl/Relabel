import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { User } from '../models/user';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
// https://relabel--service.herokuapp.com/
  private base_url: String = 'http://localhost:3000/users';
  currentUser = new EventEmitter<User>();

  constructor(private http: Http) { }

  login(username:string, password:string, options?: RequestOptionsArgs): Promise<User> { 
    return this.http.post(this.base_url + '/login',{username,password}, this.addJwt(options)).toPromise().then((res) => res.json() as User);
  }
  logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUser.emit(null);
    }
    private addJwt(options?: RequestOptionsArgs): RequestOptionsArgs {
        // ensure request options and headers are not null
        options = options || new RequestOptions();
        options.headers = options.headers || new Headers();

        // add authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            options.headers.append('Authorization', 'Bearer ' + currentUser.token);
        }

        return options;
    }
}
