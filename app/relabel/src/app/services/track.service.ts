import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Track } from '../models/track';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TrackService {

  private base_url: String = 'http://localhost:3000/tracks';

  constructor(private http: Http,  defaultOptions: RequestOptions) { }

  getTracksByPref(id:string, options?: RequestOptionsArgs): Promise<Track[]> { 
    return this.http.post(this.base_url + '/getTracksByPref',{id}, this.addJwt(options)).toPromise().then((res) => res.json() as Track[]);
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
