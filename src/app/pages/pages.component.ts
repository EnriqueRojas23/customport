import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {
  jwtHelper =  new JwtHelperService();
  constructor(private authService: AuthService) { }

  ngOnInit(): void{
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.authService.menu =   JSON.parse(String(localStorage.getItem('menu')));
    }
  }
  loggedIn(): any {
    return this.authService.loggedIn();
  }

}
