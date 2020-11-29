import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  show = false;
  model: any = {};
  public loading = false;
  constructor(private authService: AuthService,
              private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    const rememberme =  localStorage.getItem('Name');
    this.model.recuerdame = true;
    this.model.username = rememberme;


  }
  login(form: NgForm): any {
    this.show  = true;
    this.loading = true;
    if (form.invalid) {
      return;
    }

    this.authService.login(this.model).subscribe(resp => {

      this.show  = false;
    }, error => {
        this.show  = false;

        console.log(error);


        if ('Unauthorized' === error.statusText) {
          this.messageService.add({severity: 'error', summary: 'Login', detail: 'usuario y/o contraseña incorrecta'});
          } else if ('Bloqueado' === error.statusText) {
      //     this.alertify.error('usuario bloqueado');
        } else if ('Eliminado' === error.statusText) {
          //        this.alertify.error('usuario eliminado');
        } else {
            //      this.alertify.error(error.statusText);
        }

    }, () => {

      this.router.navigate(['/welcome']);
    });
  }
}
