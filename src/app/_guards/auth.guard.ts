import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../_services/auth.service';


@Injectable({
  providedIn: 'root',

})

export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService,
              ) {
  }
  canActivate(next: ActivatedRouteSnapshot): boolean {

    console.log(this.authService.loggedIn());

    if (this.authService.loggedIn()) {
      if (next.url.length > 0)
      {

         const menu =  localStorage.getItem('menu');

         if (menu === null ? '' : menu.includes(next.url[1].path)) {
          return true;
        }
         // this.messageService.add({severity: 'error', summary: 'Error', detail: 'No tiene acceso a este módulo'});
         alert('No tiene acceso a este módulo');
         return false;
      }
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
