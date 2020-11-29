import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Cliente } from 'src/app/_models/cliente';
import { Ubigeo } from 'src/app/_models/ubigeo';
import { ClienteService } from 'src/app/_services/cliente.service';

@Component({
  selector: 'app-listadocliente',
  templateUrl: './listadocliente.component.html',
  styleUrls: ['./listadocliente.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ListadoclienteComponent implements OnInit {

  propietarios: SelectItem[] = [];
  model: any  = {};
  selectedRow: Cliente[] = [];
  clientes!: Cliente[];
  ubigeo!: Ubigeo[];
  cols!: any[];

  constructor(private clienteService: ClienteService
            , private spinner: NgxSpinnerService
            , private messageService: MessageService
            , private confirmationService: ConfirmationService
            , private router: Router ) { }

  ngOnInit(): void {

    this.cols =
    [
        {header: 'RAZÓN SOCIAL', field: 'razonsocial'  ,  width: '100px' },
        {header: 'TIPO DOCUMENTO', field: 'tipodocumento'  ,  width: '60px'  },
        {header: 'DOCUMENTO', field: 'documento' , width: '60px'  },
        {header: 'ACCIONES', field: 'id' , width: '60px' }
      ];

    this.clienteService.getAllClientes('').subscribe(resp => {

      this.clientes = resp;

      //   resp.forEach(x => {
      //     this.propietarios.push({ label: x.razon_social.toUpperCase() , value: x.id.toString() });
      //  });

        // if (localStorage.getItem('searchPro1') !== undefined){
        //       this.model.PropietarioId = localStorage.getItem('searchPro1');
        // } else {
        //       this.model.PropietarioId = 1;
        //       console.log('entre');
        // }
        // this.buscar();
    }, error => {

    }, () => {

      // this.clienteService.getAllClientesxPropietarios(this.model.PropietarioId).subscribe(resp => {
      //    this.clientes = resp;
      // });
    });


  }
  buscar(): void {
    this.spinner.show();
    this.clienteService.getAllClientes(this.model.criterio).subscribe(resp => {

      this.clientes = resp;
      this.spinner.hide();
    });
}
edit(id: number): void {
  this.router.navigate(['mantenimiento/editarcliente', id]);
}
delete(id: number): void {

  this.confirmationService.confirm({
    message: '¿Esta seguro que desea eliminar al cliente?',
    header: 'Confirmación',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Eliminar',
    accept: () => {
         this.spinner.show();

         this.clienteService.deleteCliente(id).subscribe((resp: any) => {
        }, (error: any) => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: error});
        }, () => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Se eliminó correctamente'});
          this.clienteService.getAllClientes('').subscribe(resp => {

            this.clientes = resp;
            this.spinner.hide();
          });
          this.spinner.hide();
            });
    },
    reject: () => {
        this.messageService.add({severity: 'info', summary: 'Rejected', detail: 'You have rejected'});
    }
});
}
agregarDireccion(id: number): void{

        // const dialogRef = this.dialog.open(DialogAgregarDireccion, {
        //   width: '650px',
        //   height: '500px',
        //   data: { codigo: id }
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   this.model.descripcionLarga = result.descripcionLarga;
        //   this.model.codigo = result.codigo;
        //   this.model.productoid = result.id;
        // });
  }

  verDirecciones(id: number): void{


    this.clienteService.getAllDirecciones(id).subscribe(resp => {
    this.ubigeo = resp;


    });
  }
  close(): void{

  }
  cancel(): void {

  }
  nuevo(): void{
    this.router.navigate(['mantenimiento/nuevocliente']);
  }
}
