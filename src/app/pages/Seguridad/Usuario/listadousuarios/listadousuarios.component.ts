import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/user';
import { UserService } from 'src/app/_services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RolService } from 'src/app/_services/rol.service';
import { Rol } from 'src/app/_models/rol';
import { RolUser } from 'src/app/_models/roluser';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';



@Component({
  selector: 'app-listadousuarios',
  templateUrl: './listadousuarios.component.html',
  styleUrls: ['./listadousuarios.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ListausuariosComponent implements OnInit {
  users!: User[];
  cols!: any[];
  model: any = [];
  EstadoId!: number;
  selectedRow: User[] = [];
  display = false;
  source!: Rol[];
  temp!: Rol[];
  target!: Rol[];
  auxsource: Rol[] = [];
  auxtarget: Rol[] = [];
  all = false;


  constructor(private router: Router,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private rolService: RolService,
              private confirmationService: ConfirmationService,
              private userService: UserService,
              private primengConfig: PrimeNGConfig) {
  }


  ngOnInit(): void {
    this.spinner.hide();

    this.cols =
    [

        {header: 'User', field: 'username'  ,  width: '80px' },
        {header: 'Nombres', field: 'nombres'  , width: '90px'   },
        {header: 'Apellidos', field: 'apellidos'  , width: '90px'   },
        {header: 'Dni', field: 'dni'  ,  width: '100px'  },
        {header: 'EMail', field: 'email' , width: '100px'  },
        {header: 'Fecha Registro', field: 'lastActive'  , width: '90px'  },
        {header: 'Eventos', field: 'userid' , width: '60px' },

      ];



    this.userService.getUsers('').subscribe(list => {

      this.users = list;

  });
}
buscar(): void{
  this.spinner.show();
  this.userService.getUsers(this.model.criterio).subscribe(list => {
    this.spinner.hide();
    this.users = list;
});
}

  // openDialog(id: any): void {

  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '650px',
  //     height: '400px',
  //     data: {id }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.animal = result;
  //   });
  // }
  // open(user: any): void {
  //   const modal =  this._modalService.open(NgbdModalConfirmAutofocus, { windowClass: 'danger-modal' });
  //   modal.componentInstance.model = user;

  //   modal.result.then((result) => {
  //     this.closeResult = `${result}`;

  //     if (this.closeResult === 'Ok') {
  //         user.EstadoId = 3;
  //         this.userService.actualizarEstado(user).subscribe(resp => {
  //           }, error => {
  //             this.alertify.error(error);
  //           }, () => {
  //             this.userService.getUsers().subscribe(list => {
  //               this.users = list;
  //               this.listData = new MatTableDataSource(this.users);
  //               this.listData.paginator = this.paginator;
  //               this.listData.sort = this.sort;

  //         });
  //       });
  //      }
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

  //     });
  // }
 edit(id: number): void {

  this.router.navigate(['seguridad/editarusuario', id]);
 }
 delete(id: any): void {


  this.confirmationService.confirm({
    message: '¿Esta seguro que desea eliminar al usuario?',
    header: 'Confirmación',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Eliminar',
    accept: () => {
         this.spinner.show();

         this.userService.delete(id).subscribe((resp: any) => {
        }, (error: any) => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: error});
        }, () => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Se eliminó correctamente'});
          this.buscar();
          this.spinner.hide();
            });
    },
    reject: () => {
        this.messageService.add({severity: 'info', summary: 'Rejected', detail: 'You have rejected'});
    }
});
 }
 ver(id: any): void {
  this.source = [];
  this.target = [];
  this.temp = [];
  this.model.userid = id;




  this.rolService.getRolesForUser(id).subscribe(list2 => {
    this.target = list2;


    this.rolService.getAll('').subscribe(list => {
      if (list2.length === 0) {
        this.source = list;
      }
      else {
      list.forEach(r => {

          if (this.target.find(D => D.alias !== r.alias) === undefined) {

          }
          else {
            this.temp.push(r);
            console.log(this.source);

            this.source = this.temp;
            // console.log(r);
          }

      });
    }

      // this.target =  list;

      // console.log(this.target);
    });



    });
  this.primengConfig.ripple = true;
  this.display = true;

 }
 nuevo(): void{
  this.router.navigate(['seguridad/nuevousuario']);
 }
 Save(): void {
  this.spinner.show();
  this.rolService.saveRoles(this.target, this.model.userid).subscribe((resp: any) => {
  }, (error: any) => {

      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Se eliminó correctamente'});
      this.buscar();
      this.spinner.hide();
  }, () => {
    this.spinner.hide();
    this.display = false;
  });

 }
 onNoClick(): void{
  this.display = false;
 }

}





