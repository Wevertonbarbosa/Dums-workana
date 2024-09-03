import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RegisteredService } from '../../Services/registered.service';
import { PoRadioGroupOption, PoToasterType } from '@po-ui/ng-components';
import { NewUser } from '../../Interface/new-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public labelCpfCnpj = 'CPF*';
  public checkLoading: boolean = false;
  public formCheck!: FormGroup;
  public cnpjCpfMask = '999.999.999-99';
  public hideToast = true;
  public msgToast = '';
  public type: PoToasterType = PoToasterType.Success;

  ngOnInit(): void {}

  constructor(
    private fb: FormBuilder,
    private service: RegisteredService,
    private router: Router
  ) {
    this.formCheck = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(2)]],
      senha: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
      cnpjCpf: ['', [Validators.required]],
      email: ['', [Validators.required]],
      fone: ['', [Validators.required, Validators.minLength(11)]],
      choose: ['1'],
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

  sendForm() {
    try {
      this.checkLoading = true;
      let value: NewUser = {
        nomeCompleto: this.formCheck.get('nomeCompleto')?.value,
        senha: this.formCheck.get('senha')?.value,
        cnpjCpf: this.formCheck.get('cnpjCpf')?.value,
        email: this.formCheck.get('email')?.value,
        fone: this.formCheck.get('fone')?.value,
      };
      debugger;
      if (this.formCheck.valid) {
        this.service.postData(value).subscribe({
          next: (resp) => {
            console.log(resp);
            this.formCheck.reset();
            this.type = PoToasterType.Success;
            this.msgToast = 'Inscrição realizada';
            this.hideToast = false;

            setTimeout(() => {
              this.hideToast = true;
              this.router.navigate(['/login']);
            }, 3000);
          },
          error: (error) => {
            console.error('Erro ao registrar usuário:', error);

            this.type = PoToasterType.Error;
            this.hideToast = false;

            //EMAIL E CPF NÃO PODEM SER O MESMO, NECESSÁRIO MENSAGEM DE ERRO CORRETA
            const existsEmail =
              'could not execute statement [ERROR: duplicate key value violates unique constraint "usuario_email_key"\n  Detail: Key (email)=(usuario@gmail.com) already exists.] [insert into usuario (cnpj_cpf,email,fone,nome_completo,senha) values (?,?,?,?,?) returning id]; SQL [insert into usuario (cnpj_cpf,email,fone,nome_completo,senha) values (?,?,?,?,?) returning id]; constraint [usuario_email_key]';

            if (error.status === 400 && error.error.mensagem == existsEmail) {
              this.msgToast = 'Este email já está registrado.';
            } else {
              this.msgToast =
                'Erro na solicitação. Por favor, tente novamente.';
            }

            setTimeout(() => {
              this.hideToast = true;
            }, 5000);
          },
        });
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);

      this.type = PoToasterType.Error;
      this.msgToast = 'Erro ao enviar o formulário!';
      this.hideToast = false;

      setTimeout(() => {
        this.hideToast = true;
      }, 5000);
    } finally {
      setTimeout(() => {
        this.checkLoading = false;
        this.formCheck.patchValue({ choose: '1' });
      }, 2000);
    }
  }

  choose: Array<PoRadioGroupOption> = [
    { label: 'CPF', value: '1' },
    { label: 'CNPJ', value: '2' },
  ];

  changeCpfCnpj(value: string) {
    if (value == '1') {
      this.labelCpfCnpj = 'CPF*';
      this.cnpjCpfMask = '999.999.999-99';
      this.formCheck.get('cnpjCpf')?.reset();
    } else {
      this.labelCpfCnpj = 'CNPJ*';
      this.cnpjCpfMask = '99.999.999/9999-99';
      this.formCheck.get('cnpjCpf')?.reset();
    }
  }
}
