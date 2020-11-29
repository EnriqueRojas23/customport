import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes.module';
import {ButtonModule} from 'primeng/button';

import { HttpClientModule } from '@angular/common/http';



import { NgxSpinnerModule } from 'ngx-spinner';
import { TreeviewModule } from 'ngx-treeview';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputMaskModule} from 'primeng/inputmask';
import {DialogModule} from 'primeng/dialog';



import { ListausuariosComponent } from './Seguridad/Usuario/listadousuarios/listadousuarios.component';
import { NuevousuarioComponent } from './Seguridad/Usuario/nuevousuario/nuevousuario.component';
import { EditarusuarioComponent } from './Seguridad/Usuario/editarusuario/editarusuario.component';
import { DropdownModule } from 'primeng/dropdown';
import { AsignaropcionesComponent } from './Seguridad/Rol/asignaropciones/asignaropciones.component';
import { ListarolesComponent } from './Seguridad/Rol/listaroles/listaroles.component';
import { NuevorolComponent } from './Seguridad/Rol/nuevorol/nuevorol.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {PickListModule} from 'primeng/picklist';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ListadoclienteComponent } from './Mantenimiento/Cliente/listadocliente/listadocliente.component';
import { NuevoclienteComponent } from './Mantenimiento/Cliente/nuevocliente/nuevocliente.component';
import { CalendarModule } from 'primeng/calendar';
import { EditarclienteComponent } from './Mantenimiento/Cliente/editarcliente/editarcliente.component';
import { ListadoserviciosComponent } from './Seguimiento/OrdenServicio/listadoservicios/listadoservicios.component';

@NgModule({
  declarations: [
    WelcomeComponent,
    ListausuariosComponent,
    NuevousuarioComponent,
    EditarusuarioComponent,
    AsignaropcionesComponent,
    ListarolesComponent,
    NuevorolComponent,
    ListadoclienteComponent,
    NuevoclienteComponent,
    EditarclienteComponent,
    ListadoserviciosComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    PAGES_ROUTES,
    HttpClientModule,
    ToastModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ProgressBarModule,
    NgxSpinnerModule,
    MultiSelectModule,
    InputMaskModule,
    DropdownModule,
    TreeviewModule.forRoot(),
    DialogModule,
    PickListModule,
    ConfirmDialogModule,
    CalendarModule
   ],
  exports: [],
  providers: [

  ],
  bootstrap: [],
  entryComponents: [


    ]
})
export class PagesModule {}

