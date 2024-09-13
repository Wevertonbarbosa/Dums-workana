import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
  PoToasterType,
} from '@po-ui/ng-components';
import { DataEmitenteService } from '../../Services/data-emitente.service';
import { TableService } from '../../Services/table.service';
import { EmitenteModel } from '../../Interface/emitente-model';
import { GetEmitentes } from '../../Interface/get-emitentes';
import { ApiEmitente } from '../../Interface/api-emitente';
import { ModalUpdateComponent } from '../modal-update/modal-update.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { CepService } from '../../Services/cep.service';

@Component({
  selector: 'app-form-emitente',
  templateUrl: './form-emitente.component.html',
  styleUrl: './form-emitente.component.css',
})
export class FormEmitenteComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true })
  emitenteModal!: PoModalComponent;
  @ViewChild(ModalUpdateComponent) modalUpdateComponent!: ModalUpdateComponent;
  @ViewChild(ModalDeleteComponent) modalDelete!: ModalDeleteComponent;

  public sendEmitentes: EmitenteModel[] = [];
  public showEmitente: GetEmitentes[] = [];

  public formCheck!: FormGroup;
  public checkLoading: boolean = false;
  public hasItems: boolean = true;

  public hideToast = true;
  public msgToast = '';
  public type: PoToasterType = PoToasterType.Success;

  public loadingTable: boolean = false;

  public columns!: Array<PoTableColumn>;
  public items: any[] = [];

  public actions: Array<PoTableAction> = [
    {
      label: 'Editar',
      action: (value: any) => {
        this.openUpdateModal(value);
      },
      separator: true,
    },
    {
      label: 'Excluir',
      action: (value: any) => {
        this.modalDelete.open(value.id);
      },
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
    private cepService: CepService,
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

  openUpdateModal(value: any) {
    this.modalUpdateComponent.open(value);
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

            this.poNotification.success({
              message: 'Emitente adicionado!',
              duration: 3000,
            });
          },
          error: (err) => {
            console.error('Erro ao enviar Emitente', err);

            this.poNotification.warning({
              message: 'Erro na requisição para envio do emitente!',
              duration: 5000,
            });
          },
        });
      } else {
        this.poNotification.warning({
          message: 'Preencha o formulário corretamente!',
          duration: 5000,
        });
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

        this.poNotification.warning({
          message: 'Erro ao buscar emitentes!',
          duration: 5000,
        });
      },
    });
  }

  validateRange(field: string) {
    const value = this.formCheck.get(field)?.value;
    if (value > 32767) {
      this.poNotification.warning({
        message: 'O valor não pode ser maior que 32767.',
        duration: 5000,
      });
      this.formCheck.get(field)?.setValue(null);
    }
  }

  onCep() {
    const cep = this.formCheck.get('endereco.cep')?.value;
    if (cep && cep.length === 8) {
      this.cepService.getCep(cep).subscribe({
        next: (value) => {
          if (value.erro) {
            this.poNotification.warning({
              message: 'CEP não encontrado!',
              duration: 5000,
            });
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
          this.poNotification.warning({
            message: 'Erro ao buscar dados do CEP!',
            duration: 5000,
          });
        },
      });
    } else {
    }
  }
}
