import { Injectable } from '@angular/core';
import { PoTableColumn, PoTagType } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'cnpj', label: 'CNPJ', width: '16%' },
      { property: 'razaoSocial', label: 'Razão Social', width: '16%' },
      { property: 'nomeFantasia', label: 'Nome Fantasia', width: '16%'},
      { property: 'inscricaoEstadual', label: 'Inscrição Estadual', width: '16%'},
      { property: 'codigoRegimeTributario', label: 'Código Regime Tributário', width: '20%'},
      { property: 'fone', label: 'Telefone', width: '14%'},
    ];
  }
}
