import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private readonly APIuser = environment.APIuser;
  constructor(private http: HttpClient) {}

  getCep(cep: any): Observable<any> {
    return this.http.get<any>(`${this.APIuser}cep/${cep}`);
  }
}
