import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmitenteModel } from '../Interface/emitente-model';
import { Observable } from 'rxjs';
import { ApiEmitente } from '../Interface/api-emitente';

@Injectable({
  providedIn: 'root',
})
export class DataEmitenteService {
  private readonly APIuser = environment.APIuser;
  constructor(private http: HttpClient) {}

  postEmitente(data: EmitenteModel): Observable<any> {
    return this.http.post<EmitenteModel>(`${this.APIuser}emitente`, data);
  }

  getEmitentes(): Observable<ApiEmitente> {
    return this.http.get<ApiEmitente>(`${this.APIuser}emitente`);
  }
}
