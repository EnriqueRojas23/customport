import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SidebarService  {
        menu: any[] ;
    constructor(private http: HttpClient,private router: Router) {
      this.menu = JSON.parse(String(localStorage.getItem('menu')));
    }
}
