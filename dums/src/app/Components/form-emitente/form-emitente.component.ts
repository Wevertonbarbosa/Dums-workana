import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoDividerModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-form-emitente',
  templateUrl: './form-emitente.component.html',
  styleUrl: './form-emitente.component.css',
})
export class FormEmitenteComponent {
  public formCheck!: FormGroup;
  public checkLoading: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formCheck = this.fb.group({
      nomeFantasia: ['', [Validators.required, Validators.minLength(2)]],
      razaoSocial: ['', [Validators.required, Validators.minLength(2)]],
      inscricaoEstadual: ['', [Validators.required, Validators.minLength(2)]],
      fone: ['', [Validators.required, Validators.minLength(11)]],
      codigoRegimeTributario: ['', [Validators.required, Validators.min(0)]],
      cnpj: ['', [Validators.required, Validators.minLength(14)]],
      endereco: this.fb.group({
        cep: ['', [Validators.required, Validators.minLength(8)]],
        logradouro: ['', [Validators.required, Validators.minLength(2)]],
        nomeMunicipio: ['', [Validators.required, Validators.minLength(2)]],
        numero: ['', [Validators.required, Validators.minLength(1)]],
        numMunicipio: ['', [Validators.required, Validators.min(0)]],
        bairro: ['', [Validators.required, Validators.minLength(2)]],
        uf: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(2),
          ],
        ],
        nomePais: ['', [Validators.required, Validators.minLength(2)]],
        numPais: ['', [Validators.required, Validators.min(0)]],
      }),
    });
  }

  sendEmitente() {
    console.log(this.formCheck.value);
  }
}
