import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Tweet } from '../models/tweet';

@Injectable()
export class TweetsService {

  constructor(private http: Http) {
    console.log('Tweets service initialized...');
  }

  all(){
    // Example
    // return this.http.get('https://jsonplaceholder.typicode.com/comments').map(res => res.json());
    return this.http.get('/api/tweets').map(res => res.json());
  }

  find(id: number){
    return this.http.get('/api/tweets/' + id).map(res => res.json());
  }

  create(tweet: Tweet){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/tweets', JSON.stringify(tweet), { headers: headers }).map(res => res.json());
  }

  delete(tweet: Tweet){
    return this.http.delete('/api/tweets/' + tweet._id).map(res => res.json());
  }
}
