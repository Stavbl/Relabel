import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/user';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {

    
    constructor(private http: Http) { }
 
    login(username: string, password: string) {
        return this.http.post('http://localhost:3000/users/login', { username: username, password: password })
           .map((response: Response) => {
               return <User> response.json();
                // login successful if there's a jwt token in the response
                // this.user =<User> response.json();
                // this.user.username = response.json().username;
                // console.log(this.user);
                // console.log(response.json().username);
                // if (this.user && this.user.token) {
                //     // store user details and jwt token in local storage to keep user logged in between page refreshes
                //     localStorage.setItem('currentUser', JSON.stringify(this.user));
                //     console.log(this.user);
                // }
 
                // return this.user;
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}