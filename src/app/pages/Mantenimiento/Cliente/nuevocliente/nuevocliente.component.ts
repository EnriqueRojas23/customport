import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, SelectItem } from 'primeng/api';
import { ClienteService } from 'src/app/_services/cliente.service';
import { GeneralService } from 'src/app/_services/general.service';


@Component({
  selector: 'app-nuevocliente',
  templateUrl: './nuevocliente.component.html',
  styleUrls: ['./nuevocliente.component.scss'],
  providers: [MessageService]
})
export class NuevoclienteComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  model: any = [];
  lista_tiposdocumentos: SelectItem[] = [];
  constructor(    private formBuilder: FormBuilder,
                  private clienteService: ClienteService,
                  private spinner: NgxSpinnerService,
                  private generalService: GeneralService,
                  private messageService: MessageService,
                  private router: Router) { }

  ngOnInit(): void {
    this.generalService.GetAllValorTabla(15).subscribe(resp => {
        console.log(resp);
        resp.forEach(list => {
        this.lista_tiposdocumentos.push ({ label: list.valorPrincipal , value : list.id});
      });
    });


    this.registerForm = this.formBuilder.group({
      razonsocial: ['', Validators.required],
      ruc: ['', Validators.required],
      tipodocumentoid: ['', Validators.required],
    });
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.messageService.add({key: 'c', sticky: false, severity: 'success', summary: '¿Desea registrar un nuevo cliente?', detail: ''});

}

onReject(): void {
  this.messageService.clear('c');
}
onConfirm(): void {
    this.spinner.show();
    this.clienteService.registrarCliente(this.registerForm.value).subscribe(resp => {
    }, error => {
       this.messageService.add({severity: 'error', summary: 'Error', detail: error});
    }, () => {
      this.spinner.hide();
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Se registró correctamente'});
      this.router.navigate(['/mantenimiento/listadoclientes']);
    });
}
cancel(): void {

}
  get f(): any { return this.registerForm.controls; }
}
