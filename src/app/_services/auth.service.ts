import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
baseUrl = environment.baseUrl + '/api/auth/';
jwtHelper = new JwtHelperService();
decodedToken: any;
menu: any[] | undefined;

constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(
    map((response: any) => {
      const user = response;
      if (user) {

        localStorage.clear();


        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);



        const stringMenu = JSON.stringify(user.menu);

        // this.menu =   JSON.parse(JSON.stringify(user.menu));

        localStorage.setItem('menu', stringMenu);


        localStorage.removeItem('Name');
        localStorage.removeItem('RememberMe');
        if (model.recuerdame) {
             localStorage.setItem('Name', model.username);
             localStorage.setItem('RememberMe', JSON.stringify(model.recuerdame));
          }
      }
    })
  );
 }
 loggedIn() {
   const token = localStorage.getItem('token');
   console.log(!this.jwtHelper.isTokenExpired(token === null ? undefined : token));

   return !this.jwtHelper.isTokenExpired(token === null ? undefined : token);
 }

}
