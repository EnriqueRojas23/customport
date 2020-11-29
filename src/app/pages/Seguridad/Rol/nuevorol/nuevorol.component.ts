import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { MustMatch } from 'src/app/pages/Helpers/must-match.validator';
import { RolService } from 'src/app/_services/rol.service';

@Component({
  selector: 'app-nuevorol',
  templateUrl: './nuevorol.component.html',
  styleUrls: ['./nuevorol.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class NuevorolComponent implements OnInit {
  model: any = {}  ;
  registerForm!: FormGroup;
  submitted = false;

  tipos: SelectItem[] = [
    {value: 1, label: 'Habilitado'},
    {value: 2, label: 'Bloqueado'},
    {value: 3, label: 'Eliminado'},
  ];



  constructor(private rolService: RolService,
              private messageService: MessageService,
              private formBuilder: FormBuilder,
              private router: Router ) {

   }
   get f(): any { return this.registerForm.controls; }
  ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        alias: ['', Validators.required],
        descripcion: ['', Validators.required],
    });
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    // this.messageService.add({key: 'c', sticky: false, severity: 'success', summary: '¿Desea registrar un nuevo usuario?', detail: ''});


    this.rolService.registerRol(this.model).subscribe( (resp: any) => {

    }, (error: any) => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: error});
    }, () => {
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Se registró correctamente'});
      this.router.navigate(['seguridad/listaroles']);
    });

}
cancel(): void {
  this.router.navigate(['/seguridad/listaroles']);
}
}
