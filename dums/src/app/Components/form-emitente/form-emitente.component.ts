import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoDividerModule, PoToasterType } from '@po-ui/ng-components';
import { DataEmitenteService } from '../../Services/data-emitente.service';

@Component({
  selector: 'app-form-emitente',
  templateUrl: './form-emitente.component.html',
  styleUrl: './form-emitente.component.css',
})
export class FormEmitenteComponent {
  public formCheck!: FormGroup;
  public checkLoading: boolean = false;

  public hideToast = true;
  public msgToast = '';
  public type: PoToasterType = PoToasterType.Success;

  constructor(private fb: FormBuilder, private service: DataEmitenteService) {
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
    try {
      this.checkLoading = true;

      if (this.formCheck.valid) {
        this.service.postEmitente(this.formCheck.value).subscribe({
          next: () => {
            this.formCheck.reset();
            this.msgToast = 'Emitente registrado';
            this.hideToast = false;

            setTimeout(() => {
              this.hideToast = true;
            }, 3000);
          },
          error: (err) => {
            console.error('Erro ao registrar emitente:', err);
            this.type = PoToasterType.Error;
            this.msgToast = 'Erro ao registrar o usuário!';
            this.hideToast = false;

            setTimeout(() => {
              this.hideToast = true;
            }, 5000);
          },
        });
      }
    } catch (error) {
      console.error('Erro ao enviar o emitente:', error);

      this.type = PoToasterType.Error;
      this.msgToast = 'Erro ao enviar o emitente!';
      this.hideToast = false;

      setTimeout(() => {
        this.hideToast = true;
      }, 5000);
    } finally {
      setTimeout(() => {
        this.checkLoading = false;
      }, 2000);
    }
  }
}
