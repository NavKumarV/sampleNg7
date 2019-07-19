import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Contest} from '../contest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  header: any;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
   }

  userLogin(payload) {
    return this.http.post('http://localhost:8080/login', payload);
    // return this.http.post('url', payload, this.header);
  }

  userSignup(payload) {
    return this.http.post('http://localhost:8080/register', payload);
  }

  contestList():Observable<Contest[]>{
     console.log("entered the contestlist in service")
    return this.http.get<Contest[]>('http://localhost:8080/home');
  }

  uploadPhoto(uploadData) {
    return this.http.post('http://localhost:8080/upload', uploadData, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
