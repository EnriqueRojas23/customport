import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../_models/rol';
import { TreeviewItem } from 'ngx-treeview';
import { RolUser } from '../_models/roluser';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
     'Content-Type' : 'application/json'
  }),

};


@Injectable({
  providedIn: 'root'
})
export class RolService {
  baseUrl = environment.baseUrl + '/api/roles/';
  constructor(private http: HttpClient, ) { }

  getAll(criterio: string): Observable<Rol[]> {
    if (criterio === undefined) { criterio = ''; }
    return this.http.get<Rol[]>(this.baseUrl + '?criterio=' + criterio, httpOptions);
 }

 getPaginas(RolId: any): Observable<TreeviewItem[]> {
  return this.http.get<TreeviewItem[]>(this.baseUrl + 'obtenermenu?idRol=' + RolId  , httpOptions);
 }

 savePaginas(model: any, idrol: number): any{
     const body = JSON.stringify(model);
     return this.http.post(this.baseUrl + 'addoption?idrol=' + idrol, body, httpOptions);
  }
  getRolesForUser(UserId: any): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.baseUrl + 'getallroles?UserId=' + UserId,  httpOptions);
 }
 saveRoles(model: any, UserId: any): any{
  const body = JSON.stringify(model);
  return this.http.post(this.baseUrl + 'addroluser?UserId=' + UserId, body, httpOptions);
}
registerRol(model: any): any{
  const body = JSON.stringify(model);
  return this.http.post(this.baseUrl + 'register', body, httpOptions);
}
deleteRol(RolId: any): any{

  return this.http.delete(this.baseUrl + 'deleteRol?rolId=' + RolId, httpOptions).pipe(
        map((response: any) => {

      })
  );
}




}
