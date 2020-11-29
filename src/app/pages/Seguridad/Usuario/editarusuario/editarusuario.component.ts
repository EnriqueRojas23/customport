import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { MustMatch } from 'src/app/pages/Helpers/must-match.validator';
import { UserService } from 'src/app/_services/user.service';

import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.scss'],
  providers: [ConfirmationService, MessageService]

})
export class EditarusuarioComponent implements OnInit {
  id!: number;
  model: any = {}  ;
  registerForm!: FormGroup;
  submitted = false;
  editForm!: FormGroup;
  dateOfBirth: Date = new Date(Date.now()) ;
  tipos: SelectItem[] = [
    {value: 1, label: 'Habilitado'},
    {value: 2, label: 'Bloqueado'},
    {value: 3, label: 'Eliminado'},
  ];


  constructor(private userService: UserService,
              private messageService: MessageService,
              private router: Router,
              private formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute) { }

  get f(): any { return this.editForm.controls; }


  ngOnInit(): void{
    this.editForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', Validators.required],
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: ['', [Validators.required, Validators.email]]


  }
);

    this.id  = this.activatedRoute.snapshot.params.uid;
    this.userService.getUser(this.id).subscribe(resp => {
    this.model = resp;
    this.model.dateOfBirth =
    moment(new Date(resp.dateOfBirth)); // S= moment().format(resp.dateOfBirth.toString());

    }, error => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: error});
    }, () => {
    });


  }
  onSubmit(): void {
    this.submitted = true;
    if (this.editForm.invalid) {
      console.log(this.editForm.invalid);
      return;

    }

    this.confirmationService.confirm({
      message: 'Esta seguro que desea editar al usuario?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
           this.spinner.show();

           this.userService.actualizar(this.model).subscribe(resp => {
          }, error => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: error});
          }, () => {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Se actualizó correctamente'});
            this.router.navigate(['seguridad/listausuarios']);

              });
      },
      reject: () => {
          this.messageService.add({severity: 'info', summary: 'Rejected', detail: 'You have rejected'});
      }
  });
  }
  actualizar(form: NgForm): void {

    // this.messageService.clear();

    // this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed'});


    // if (form.invalid) {
    //   return;
    // }

  }
  cancel(): void{
    this.router.navigate(['/seguridad/listausuarios']);
  }
  onReject(): void {
    this.messageService.clear('c');
  }
  onConfirm(): void {
      this.userService.registrar(this.registerForm.value).subscribe(resp => {
      }, error => {
         this.messageService.add({severity: 'error', summary: 'Error', detail: error});
      }, () => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Se registró correctamente'});
        this.router.navigate(['/seguridad/listausuarios']);
      });
  }
}
