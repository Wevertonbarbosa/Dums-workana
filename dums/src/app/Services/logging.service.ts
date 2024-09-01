import { ModelLogin } from './../Interface/model-login';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private readonly APIuser = environment.APIuser;
  constructor(private http: HttpClient) {}

  postLogin(data: ModelLogin): Observable<any> {
    return this.http.post<ModelLogin>(`${this.APIuser}usuario/login`, data);
  }
}
