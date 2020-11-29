import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
declare const App: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spa';

  constructor(private primengConfig: PrimeNGConfig) {
    this.primengConfig.ripple = true;
    App.init();
  }
}
