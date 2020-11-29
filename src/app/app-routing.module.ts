import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [

  {path : 'login', component : LoginComponent},
  {
       path: '',
       component: PagesComponent,
       canActivate: [AuthGuard],
       loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
   },
   {
    path: '*',
    component: PagesComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash : true , onSameUrlNavigation: 'reload'  }) ;
