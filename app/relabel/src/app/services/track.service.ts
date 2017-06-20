import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Track } from '../models/track';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TrackService {

  private base_url: String = 'http://localhost:3000/tracks';

  constructor(private http: Http) { }

  getTracksByPref(id:string): Promise<Track[]> { 
    return this.http.post(this.base_url + '/getTracksByPref',{id}).toPromise().then((res) => res.json() as Track[]);
  }
}
