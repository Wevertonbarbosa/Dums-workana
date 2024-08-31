import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewUser } from './../Interface/new-user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisteredService {
  // private readonly APIuser = '/api/usuario/novo';

  constructor(private http: HttpClient) {}

  postData(data: NewUser): Observable<NewUser> {
    return this.http.post<NewUser>('/api/usuario/novo', data);
  }
}
