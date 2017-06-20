import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Pref } from "../models/pref";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PrefService {

  private base_url: String = 'http://localhost:3000/users';

  constructor(private http: Http) { }

  getPrefById(id:string): Promise<Pref[]> { 
    return this.http.post(this.base_url + '/getPrefById',{id}).toPromise().then((res) => res.json() as Pref[]);
  }
  setPrefById(id:string, params:Pref[]): Promise<Pref[]> { 
    return this.http.post(this.base_url + '/setPref',{id:id,update:JSON.stringify(params)}).toPromise().then((res) => res.json() as Pref[]);
  }
}
