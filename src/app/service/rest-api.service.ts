import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  header: any;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
   }

  userLogin(payload) {
    return this.http.post('url', payload);
    // return this.http.post('url', payload, this.header);
  }

  userSignup(payload) {
    return this.http.post('url', payload);
  }

}
