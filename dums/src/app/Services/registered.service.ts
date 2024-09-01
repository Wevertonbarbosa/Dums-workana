import { HttpClient} from '@angular/common/http';
import { NewUser } from './../Interface/new-user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisteredService {
  private readonly APIuser = environment.APIuser;

  constructor(private http: HttpClient) {}

  postData(data: NewUser): Observable<NewUser> {
    return this.http.post<NewUser>(`${this.APIuser}usuario/novo`, data);
  }
}
