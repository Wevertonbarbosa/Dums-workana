import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
} from '@po-ui/ng-components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataEmitenteService } from '../../Services/data-emitente.service';
import { PutEmitentes } from '../../Interface/put-emitentes';
import { CepService } from '../../Services/cep.service';

@Component({
  selector: 'app-modal-update',
  templateUrl: './modal-update.component.html',
  styleUrl: './modal-update.component.css',
})
export class ModalUpdateComponent {
  @ViewChild(PoModalComponent, { static: true })
  updateModal!: PoModalComponent;

  @Output() emitenteUpdated = new EventEmitter<void>();

  public formCheck!: FormGroup;
  public emitenteData!: PutEmitentes;

  constructor(
    private fb: FormBuilder,
    private service: DataEmitenteService,
    private poNotification: PoNotificationService,
    private cepService: CepService
  ) {
    this.formCheck = this.fb.group({
      id: [null],
      nomeFantasia: ['', [Validators.required, Validators.minLength(2)]],
      razaoSocial: ['', [Validators.required, Validators.minLength(2)]],
      inscricaoEstadual: ['', [Validators.required, Validators.minLength(2)]],
      codigoRegimeTributario: [
        '',
        [Validators.required, Validators.maxLength(5)],
      ],
      fone: ['', [Validators.required, Validators.minLength(11)]],
      endereco: this.fb.group({
        cep: ['', [Validators.required, Validators.minLength(8)]],
        logradouro: ['', [Validators.required, Validators.minLength(2)]],
        nomeMunicipio: ['', [Validators.required, Validators.minLength(2)]],
        numero: ['', [Validators.required, Validators.minLength(1)]],
        numMunicipio: ['', [Validators.required, Validators.maxLength(5)]],
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
        numPais: ['', [Validators.required, Validators.maxLength(5)]],
      }),
    });
  }

  open(data: PutEmitentes) {
    this.emitenteData = data;
    this.formCheck.patchValue(data);
    this.updateModal.open();
  }

  close() {
    this.updateModal.close();
  }

  validateRange(field: string) {
    const value = this.formCheck.get(field)?.value;
    if (value > 32767) {
      this.poNotification.error('O valor não pode ser maior que 32767.');

      this.formCheck.get(field)?.setValue(null);
    }
  }

  confirmAddEmitente: PoModalAction = {
    action: () => {
      if (this.formCheck.valid) {
        const updatedEmitente = this.formCheck.value;

        this.service.putEmitente(updatedEmitente).subscribe({
          next: (value) => {
            this.close();
            this.emitenteUpdated.emit();
            this.poNotification.success('Emitente atualizado com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao atualizar emitente:', err);
            this.poNotification.error('Erro ao atualizar o emitente.');
          },
        });
      } else {
        console.error('Formulário inválido');
        this.poNotification.error(
          'Por favor, preencha o formulário corretamente.'
        );
      }
    },
    label: 'Confirmar',
    disabled: false,
  };

  cancelModal: PoModalAction = {
    action: () => this.close(),
    label: 'Cancelar',
    danger: true,
  };

  getCep() {
    const cep = this.formCheck.get('endereco.cep')?.value;
    if (cep && cep.length === 8) {
      this.cepService.getCep(cep).subscribe({
        next: (value) => {
          if (value.erro) {
            this.poNotification.error('CEP não encontrado!');
            this.formCheck.patchValue({ endereco: { cep: '' } });
          } else {
            this.formCheck.patchValue({
              endereco: {
                logradouro: value.logradouro || '',
                bairro: value.bairro || '',
                nomeMunicipio: value.localidade || '',
                uf: value.uf || '',
              },
            });
          }
        },
        error: (err) => {
          console.error('Erro ao buscar dados do CEP:', err);
          this.poNotification.error('Erro ao buscar dados do CEP!');
        },
      });
    } else {
    }
  }
}
