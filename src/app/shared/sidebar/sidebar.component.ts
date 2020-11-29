import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { SidebarService } from 'src/app/_services/sidebar.service';
declare const App: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements  AfterViewInit   {
  constructor(public authService: AuthService, public sidebar: SidebarService, private router: Router) {
 }
  async ngAfterViewInit() {

    App.init();
  }
  activeRouteMenu(routename: string): string {
    if (this.router.url.includes(routename) === true) {
           return 'Active';
    }
    else {
        return '';
    }
 }
  activeRoute(routename: string): boolean {
    return this.router.url.indexOf(routename) > -1;
  }
}

async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
