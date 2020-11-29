import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Departamento, Distrito, Provincia, Ubigeo } from '../_models/ubigeo';
import { ValorTabla } from '../_models/valortabla';
import { Estado } from '../_models/estado';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  }),
};


@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  baseUrl = environment.baseUrl + '/api/general/';

constructor(private http: HttpClient) { }

  GetAllValorTabla(tablaid: number): Observable<ValorTabla[]> {
     return this.http.get<ValorTabla[]>(this.baseUrl + 'GetAllValorTabla?TablaId=' + tablaid, httpOptions);
  }
  getEstados(TablaId: number): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.baseUrl + '?TablaId=' + TablaId, httpOptions);
  }


}
