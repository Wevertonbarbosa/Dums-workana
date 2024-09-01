import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { PoFieldModule, PoToasterType } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { LoggingService } from '../../Services/logging.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  public formCheck!: FormGroup;
  public checkLoading: boolean = false;

  public type: PoToasterType = PoToasterType.Success;
  public hideToast = true;
  public msgToast = '';

  ngOnInit(): void {}

  constructor(
    private fb: FormBuilder,
    private service: LoggingService,
    private cookieService: CookieService
  ) {
    this.formCheck = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
    });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    if (!hasUpperCase || !hasSpecialChar) {
      return { invalidPassword: true };
    }
    return null;
  }

  sendLogin() {
    try {
      this.checkLoading = true;

      if (this.formCheck.valid) {
        this.service.postLogin(this.formCheck.value).subscribe({
          next: (value) => {
            console.log(value);
            const token = value.token;

            if (token) {
              this.cookieService.set('authToken', token, {
                expires: 2,
                path: '/',
              });
            }
          },
          error: (err) => {
            console.error('Erro na requisição', err);
            let msgErro = err.error[0].mensagem;

            this.type = PoToasterType.Error;
            if (
              err.error[0].mensagem ==
              'UserDetailsService returned null, which is an interface contract violation'
            ) {
              this.msgToast = 'Usuário não foi encontrado';
            } else {
              this.msgToast = msgErro;
            }

            this.hideToast = false;

            setTimeout(() => {
              this.hideToast = true;
            }, 5000);
          },
        });
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      this.type = PoToasterType.Error;
      this.msgToast = 'Erro ao enviar os dados!';
      this.hideToast = false;

      setTimeout(() => {
        this.hideToast = true;
      }, 5000);
    } finally {
      setTimeout(() => {
        this.checkLoading = false;
      }, 2400);
    }
  }
}
