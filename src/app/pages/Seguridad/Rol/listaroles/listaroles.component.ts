import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Rol } from 'src/app/_models/rol';
import { RolService } from 'src/app/_services/rol.service';



@Component({
  selector: 'app-listaroles',
  templateUrl: './listaroles.component.html',
  styleUrls: ['./listaroles.component.scss'],
  providers: [ConfirmationService, MessageService]

})
export class ListarolesComponent implements OnInit {
  roles!: Rol[];
  cols!: any[];
  model: any = [];
  selectedRow: Rol[] = [];

  constructor(private rolService: RolService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  ngOnInit(): any {

    this.cols =
    [

        {header: 'Descripción', field: 'descripcion'  ,  width: '80px' },
        {header: 'Alias', field: 'nombres'  , width: '90px'   },
        {header: 'Activo', field: 'apellidos'  , width: '90px'   },
        {header: 'Público', field: 'dni'  ,  width: '100px'  },
        {header: 'Eventos', field: 'userid' , width: '60px' },

      ];


    this.rolService.getAll('').subscribe(list => {
    this.roles = list;


    });

  //  $("html,body").animate({ scrollTop: 100 }, "slow");
  }
  nuevo(): void{
     this.router.navigate(['/seguridad/nuevorol']);
   }
   buscar(): void {
    this.spinner.show();
    this.rolService.getAll(this.model.criterio).subscribe(list => {
      this.roles = list;
      this.spinner.hide();

      });
   }

  edit(id: number): void {
      this.router.navigate(['/seguridad/asignaropciones', id]);
 }
 ver(id: number): void {
  this.router.navigate(['/seguridad/asignaropciones', id]);
}
 delete(id: number): void {

   this.confirmationService.confirm({
    message: 'Esta seguro que desea eliminar el Rol?',
    header: 'Confirmación',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
         this.spinner.show();
         this.rolService.deleteRol(id).subscribe((resp: any) => {
            this.spinner.hide();
            this.messageService.add({severity: 'info', summary: 'Confirmación', detail: 'Se ha eliminado correctamente.'});
            this.rolService.getAll('').subscribe(list => {
              this.roles = list;
             });

        }, (error: any)  => {
            this.spinner.hide();
            this.messageService.add({severity: 'error', summary: 'No puede continuar',
            detail: 'El rol tiene páginas o usuarios relacionados'});
        });

    },
    reject: () => {
        this.messageService.add({severity: 'info', summary: 'Rejected', detail: 'You have rejected'});
    }
});
 }
}
