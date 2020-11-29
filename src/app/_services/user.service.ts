import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../user';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl + '/api/users/';
  constructor(private http: HttpClient) { }

  registrar(model: any): Observable<any> {
    console.log(model);
    return this.http.post(this.baseUrl + 'register', model, httpOptions)
    .pipe(
      map((response: any) => {
         const user = response;
      }
    ));
  }

  actualizar(model: any): Observable<any> {
    return this.http.post(this.baseUrl + 'update', model, httpOptions)
    .pipe(
      map((response: any) => {
        const user = response;
      })
    );
  }

  delete(id: number): any{
    return this.http.delete(this.baseUrl + 'Delete?userid=' + id, httpOptions)
    .pipe(
      map((response: any) => {
        const user = response;
      })
    );
  }


  actualizarEstado(model: any): Observable<any> {
    return this.http.post(this.baseUrl + 'updateestado', model, httpOptions)
    .pipe(
      map((response: any) => {
        const user = response;
      })
    );
  }

  getUsers(criterio: string): Observable<User[]> {
     if (criterio === undefined) { criterio = ''; }
     return this.http.get<User[]>(this.baseUrl + '?criterio=' + criterio , httpOptions);
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + id, httpOptions);
 }


}
