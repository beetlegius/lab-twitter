import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Relationship } from '../models/relationship';

import { Auth } from './auth.service';

@Injectable()
export class RelationshipsService {

  constructor(private http: Http, private auth: Auth) {
    console.log('Relationships service initialized...');
  }

  all(){
    return this.http.get('/api/users/' + this.auth.userProfile.user_id + '/relationships').map(res => res.json());
  }

  create(relationship: Relationship){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/relationships', JSON.stringify(relationship), { headers: headers }).map(res => res.json());
  }

  delete(relationship: Relationship){
    return this.http.delete('/api/relationships/' + relationship._id).map(res => res.json());
  }
}
