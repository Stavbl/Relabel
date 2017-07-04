import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Pref } from "../models/pref";
import 'rxjs/add/operator/toPromise';
import { Playlist } from "app/models/playlist";

@Injectable()
export class PlaylistService {

  private base_url: String = 'http://localhost:3000/users';

  constructor(private http: Http,  defaultOptions: RequestOptions) { }

  getPlaylistsById(id:string, options?: RequestOptionsArgs): Promise<Playlist[]> { 
    return this.http.post(this.base_url + '/getPlaylistsById',{id}, this.addJwt(options)).toPromise().then((res) => res.json() as Playlist[]);
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