import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PoDividerModule,
  PoModalComponent,
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

@Component({
  selector: 'app-form-emitente',
  templateUrl: './form-emitente.component.html',
  styleUrl: './form-emitente.component.css',
})
export class FormEmitenteComponent implements OnInit {
  public formCheck!: FormGroup;
  public checkLoading: boolean = false;

  public hideToast = true;
  public msgToast = '';
  public type: PoToasterType = PoToasterType.Success;

  public columns!: Array<PoTableColumn>;
  public items!: Array<any>;
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
      action: () => {
      },
      separator: true,
      type: 'danger',
    },
  ];

  // customLiterals: PoTableLiterals = {
  //   noColumns: 'Nenhuma definição de colunas',
  //   noData: 'Nenhum dado encontrado',
  //   noVisibleColumn: 'Nenhuma coluna visível',
  //   noItem: 'Nenhum item selecionado',
  //   oneItem: '1 item selecionado',
  //   multipleItems: 'itens selecionados',
  //   loadingData: 'Carregando',
  //   loadMoreData: 'Carregar mais resultados',
  //   seeCompleteSubtitle: 'Ver legenda completa',
  //   completeSubtitle: 'Legenda completa',
  //   columnsManager: 'Gerenciador de colunas',
  //   bodyDelete: 'Deseja realmente excluir esse item?',
  //   cancel: 'Cancelar',
  //   delete: 'Excluir',
  //   deleteSuccessful: 'Itens removidos com sucesso',
  //   deleteApiError: 'Ocorreu um erro inesperado, tente novamente mais tarde!',
  // };

  ngOnInit(): void {
    this.columns = this.table.getColumns();
    this.items = this.table.getItems();
  }

  constructor(
    private fb: FormBuilder,
    private service: DataEmitenteService,
    private table: TableService
  ) {
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
