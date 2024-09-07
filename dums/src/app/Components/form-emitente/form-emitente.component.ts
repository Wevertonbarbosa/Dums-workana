import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PoDividerModule,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoSearchFilterMode,
  PoSelectOption,
  PoTableAction,
  PoTableColumn,
  PoTableColumnSpacing,
  PoTableLiterals,
  PoToasterType,
} from '@po-ui/ng-components';
import { DataEmitenteService } from '../../Services/data-emitente.service';
import { TableService } from '../../Services/table.service';
import { EmitenteModel } from '../../Interface/emitente-model';
import { GetEmitentes } from '../../Interface/get-emitentes';
import { ApiEmitente } from '../../Interface/api-emitente';

@Component({
  selector: 'app-form-emitente',
  templateUrl: './form-emitente.component.html',
  styleUrl: './form-emitente.component.css',
})
export class FormEmitenteComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true })
  emitenteModal!: PoModalComponent;

  public sendEmitentes: EmitenteModel[] = [];
  public showEmitente: GetEmitentes[] = [];

  public formCheck!: FormGroup;
  public checkLoading: boolean = false;
  public hasItems: boolean = true;

  public hideToast = true;
  public msgToast = '';
  public type: PoToasterType = PoToasterType.Success;

  public columns!: Array<PoTableColumn>;
  public items: any[] = [];
  public actions: Array<PoTableAction> = [
    {
      label: 'Editar',
      action: () => {
        //Logica para os modais
      },
      separator: true,
    },
    {
      label: 'Excluir',
      action: () => {},
      separator: true,
      type: 'danger',
    },
  ];

  ngOnInit(): void {
    this.columns = this.table.getColumns();
    this.loadEmitentes();
  }

  constructor(
    private fb: FormBuilder,
    private service: DataEmitenteService,
    private table: TableService,
    private poNotification: PoNotificationService
  ) {
    this.formCheck = this.fb.group({
      nomeFantasia: ['', [Validators.required, Validators.minLength(2)]],
      razaoSocial: ['', [Validators.required, Validators.minLength(2)]],
      inscricaoEstadual: ['', [Validators.required, Validators.minLength(2)]],
      fone: ['', [Validators.required, Validators.minLength(11)]],
      codigoRegimeTributario: [
        '',
        [Validators.required, Validators.maxLength(5)],
      ],
      cnpj: ['', [Validators.required, Validators.minLength(14)]],
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

  confirmAddEmitente: PoModalAction = {
    action: () => {
      if (this.formCheck.valid) {
        const newItem = this.formCheck.value;
        this.service.postEmitente(newItem).subscribe({
          next: (value) => {
            this.sendEmitentes.push(newItem);
            this.items = [...this.items, newItem];
            this.loadEmitentes();
            this.closeModal();
          },
          error: (err) => {
            console.error('Erro ao enviar Emitente', err);

            setTimeout(() => {
              this.poNotification.error(
                'Erro na requisição para envio do emitente!'
              );
            }, 5000);
          },
        });
      } else {
        console.log(this.formCheck.value);

        setTimeout(() => {
          this.poNotification.error(
            'Por favor, preencha o formulário corretamente.'
          );
        }, 5000);
      }
    },
    label: 'Confirmar',
    disabled: false,
  };

  cancelModal: PoModalAction = {
    action: () => this.closeModal(),
    label: 'Cancelar',
    danger: true,
  };

  openModal() {
    if (this.emitenteModal) {
      this.emitenteModal.open();
    } else {
      console.error('Modal instance is undefined or not initialized.');
    }
  }

  closeModal() {
    if (this.emitenteModal) {
      this.emitenteModal.close();
      this.formCheck.reset();
    } else {
      console.error('Modal instance is undefined or not initialized.');
    }
  }

  formatCnpj(cnpj: string): string {
    if (!cnpj) return '';
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }
  formatTelefone(telefone: string): string {
    if (!telefone) return '';
    return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }

  formatData(data: GetEmitentes[]): GetEmitentes[] {
    return data.map((item) => ({
      ...item,
      cnpj: this.formatCnpj(item.cnpj),
      fone: this.formatTelefone(item.fone),
    }));
  }

  loadEmitentes() {
    this.service.getEmitentes().subscribe({
      next: (data: ApiEmitente) => {
        this.showEmitente = this.formatData(data.content);
        this.hasItems = this.showEmitente.length > 0;
      },
      error: (err) => {
        console.error('Erro ao buscar emitentes', err);
        this.hasItems = false;
        setTimeout(() => {
          this.poNotification.error('Erro ao buscar emitentes!');
        }, 5000);
      },
    });
  }

  validateRange(field: string) {
    const value = this.formCheck.get(field)?.value;
    if (value > 32767) {
      setTimeout(() => {
        this.poNotification.error('O valor não pode ser maior que 32767.');
      }, 5000);

      this.formCheck.get(field)?.setValue(null);
    }
  }
}
