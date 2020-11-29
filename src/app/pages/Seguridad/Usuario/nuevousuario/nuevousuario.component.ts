import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { ConfirmationService, Message, MessageService, SelectItem} from 'primeng/api';
import { MustMatch } from 'src/app/pages/Helpers/must-match.validator';
import { ClienteService } from 'src/app/_services/cliente.service';
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'app-nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['./nuevousuario.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class NuevousuarioComponent implements OnInit {

  msgs1: Message[] | undefined;


  model: any = {}  ;
  registerForm!: FormGroup;
  submitted = false;
  jwtHelper = new JwtHelperService();
  decodedToken: any = {};
  clientes: SelectItem[] = [];

  constructor(private userService: UserService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private clienteService: ClienteService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router ) {  }

  // registrar(): void{
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.registerForm.invalid) {
  //       return;
  //   }
  //   // this.messageService.add({severity: 'success', summary: 'Success', detail: 'Se registró correctamente'});

  //   // display form values on success
  //  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));


  //   this.userService.registrar(this.model).subscribe(resp => {
  //   }, error => {
  //      this.messageService.add({severity: 'error', summary: 'Error', detail: error});
  //   }, () => {
  //     this.messageService.add({severity: 'success', summary: 'Success', detail: 'Se registró correctamente'});
  //     this.router.navigate(['/seguridad/listausuarios']);
  //   });
  // }
  get f(): any { return this.registerForm.controls; }

  ngOnInit(): void {
    this.msgs1 = [];


    const user  = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(String(user));


    // this.clienteService.getAllClientes('').subscribe(list => {
    //   list.forEach(element => {
    //       this.clientes.push({value : element.id.toString() , label : element.razon_social});
    //   });
    // });


    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', Validators.required],
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      clientes: ['', '']


  }
  , {
      validator: MustMatch('password', 'confirmPassword')
  }

  );
  }
  cancel(): void{
    this.router.navigate(['/seguridad/listausuarios']);
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.messageService.add({key: 'c', sticky: false, severity: 'success', summary: '¿Desea registrar un nuevo usuario?', detail: ''});

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
