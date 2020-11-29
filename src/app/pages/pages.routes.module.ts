import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { EditarclienteComponent } from './Mantenimiento/Cliente/editarcliente/editarcliente.component';
import { ListadoclienteComponent } from './Mantenimiento/Cliente/listadocliente/listadocliente.component';
import { NuevoclienteComponent } from './Mantenimiento/Cliente/nuevocliente/nuevocliente.component';
import { ListadoserviciosComponent } from './Seguimiento/OrdenServicio/listadoservicios/listadoservicios.component';
import { AsignaropcionesComponent } from './Seguridad/Rol/asignaropciones/asignaropciones.component';
import { ListarolesComponent } from './Seguridad/Rol/listaroles/listaroles.component';
import { NuevorolComponent } from './Seguridad/Rol/nuevorol/nuevorol.component';
import { EditarusuarioComponent } from './Seguridad/Usuario/editarusuario/editarusuario.component';
import { ListausuariosComponent } from './Seguridad/Usuario/listadousuarios/listadousuarios.component';
import { NuevousuarioComponent } from './Seguridad/Usuario/nuevousuario/nuevousuario.component';
import { WelcomeComponent } from './welcome/welcome.component';




const pagesRoutes: Routes = [

  {path : 'welcome', component : WelcomeComponent},
  {path : 'seguridad/listausuarios', canActivate: [AuthGuard] , component : ListausuariosComponent},
  {path : 'seguridad/nuevousuario', component : NuevousuarioComponent},
  {path : 'seguridad/editarusuario/:uid',  component : EditarusuarioComponent},
  {path : 'seguridad/listaroles', canActivate: [AuthGuard] , component : ListarolesComponent},
  {path : 'seguridad/nuevorol' , component : NuevorolComponent},
  {path : 'seguridad/asignaropciones/:uid', component : AsignaropcionesComponent},

  {path : 'mantenimiento/listadoclientes', canActivate: [AuthGuard], component : ListadoclienteComponent},
  {path : 'mantenimiento/nuevocliente', component : NuevoclienteComponent},
  {path : 'mantenimiento/editarcliente/:uid', component : EditarclienteComponent},


  {path : 'seguimiento/listadoservicios', component : ListadoserviciosComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(pagesRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
