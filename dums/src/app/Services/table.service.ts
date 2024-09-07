import { Injectable } from '@angular/core';
import { PoTableColumn, PoTagType } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'cnpj', label: 'CNPJ', },
      { property: 'razaoSocial', label: 'Razão Social' },
      { property: 'nomeFantasia', label: 'Nome Fantasia'},
      { property: 'inscricaoEstadual', label: 'Inscrição Estadual' },
      { property: 'codigoRegimeTributario', label: 'Código Regime Tributário'},
      { property: 'fone', label: 'Telefone'},
    ];
  }
}
