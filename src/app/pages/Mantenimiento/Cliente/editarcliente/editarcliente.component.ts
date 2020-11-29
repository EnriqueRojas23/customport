import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, SelectItem } from 'primeng/api';
import { ClienteService } from 'src/app/_services/cliente.service';
import { GeneralService } from 'src/app/_services/general.service';

@Component({
  selector: 'app-editarcliente',
  templateUrl: './editarcliente.component.html',
  styleUrls: ['./editarcliente.component.scss'],
  providers: [MessageService]
})
export class EditarclienteComponent implements OnInit {
  registerForm!: FormGroup;
  lista_tiposdocumentos: SelectItem[] = [];
  submitted = false;
  model: any = {}  ;
  id!: number;
  constructor(private generalService: GeneralService,
              private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private formBuilder: FormBuilder
               ) { }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      razonsocial: ['', Validators.required],
      ruc: ['', Validators.required],
      tipodocumentoid: ['', Validators.required],
    });

    this.generalService.GetAllValorTabla(15).subscribe(resp => {
      console.log(resp);
      resp.forEach(list => {
      this.lista_tiposdocumentos.push ({ label: list.valorPrincipal , value : list.id});
    });
  });
    this.id  = this.activatedRoute.snapshot.params.uid;
    this.clienteService.get(this.id).subscribe(resp => {
      this.model = resp;
    });

  }
  onReject(): void {
    this.messageService.clear('c');
  }
  onConfirm(): void {
      this.spinner.show();
      this.model = this.registerForm.value;
      this.model.id = this.id;

      this.clienteService.actualizarCliente(this.model).subscribe((resp: any) => {
      }, (error: any) => {
         this.messageService.add({severity: 'error', summary: 'Error', detail: error});
      }, () => {
        this.spinner.hide();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Se actualizó correctamente'});
        this.router.navigate(['/mantenimiento/listadoclientes']);
      });
  }
  cancel(): void {

  }
  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.messageService.add({key: 'c', sticky: false, severity: 'success', summary: '¿Desea actualizar este cliente?', detail: ''});

}
    get f(): any { return this.registerForm.controls; }
  }


