export interface PutEmitentes {
  id?: number;
  razaoSocial: string;
  nomeFantasia: string;
  inscricaoEstadual: string;
  codigoRegimeTributario: number;
  fone: string;
  endereco: {
    logradouro: string;
    numero: string;
    bairro: string;
    numMunicipio: 0;
    nomeMunicipio: string;
    uf: string;
    cep: string;
    numPais: 0;
    nomePais: string;
  };
}
