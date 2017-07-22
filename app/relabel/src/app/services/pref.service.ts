import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Pref } from "../models/pref";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PrefService {

  private base_url: String = 'https://relabel--service.herokuapp.com/users';

  constructor(private http: Http,  defaultOptions: RequestOptions) { }

  getPrefById(id:string, options?: RequestOptionsArgs): Promise<Pref[]> { 
    return this.http.post(this.base_url +'/getPrefById',{id}, this.addJwt(options)).toPromise().then((res) => res.json() as Pref[]);
  }
  setPrefById(id:string, params:Pref[], options?: RequestOptionsArgs): Promise<Pref[]> { 
    return this.http.post(this.base_url + '/setPref',{id:id,update:JSON.stringify(params)}, this.addJwt(options)).toPromise().then((res) => res.json() as Pref[]);
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
