import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RegisteredService } from '../../Services/registered.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public mask: string = '999.999.999-99';

  public checkLoading: boolean = false;
  public formCheck!: FormGroup;

  ngOnInit(): void {}

  constructor(private fb: FormBuilder, private service: RegisteredService) {
    this.formCheck = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(2)]],
      senha: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
      cnpjCpf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      fone: ['', [Validators.required, Validators.minLength(11)]],
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

  // onInputChange(event: any) {
  //   //EM BREVE AJUSTAR A MASCARA PARA CORRIGIR
  //   // const rawValue = this.formCheck.get('cpf')?.value.replace(/\D/g, '');
  //   if (event.length == 11) {
  //     this.mask = '999.999.999-99';
  //   } else if (event.length == 12) {
  //     this.mask = '99.999.999/9999-99';
  //   }
  // }

  // LIMPAR FORMULARIO QUANDO CLICAR NO BTN
  // clearForm() {
  //   this.formCheck.reset();
  // }

  sendForm() {
    try {
      this.checkLoading = true;

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
      });

      if (this.formCheck.valid) {
        this.service.postData(this.formCheck.value).subscribe({
          next: (resp) => {
            console.log(resp);
          },
          error: (error) => {
            console.error('Erro ao registrar usuário:', error);
            alert('Erro ao registrar usuário. Tente novamente.');
          },
        });
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    } finally {
      this.formCheck.reset();
      this.checkLoading = false;
    }
  }
}
