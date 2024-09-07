export interface EmitenteModel {
  id?: number;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  inscricaoEstadual: string;
  codigoRegimeTributario: number;
  fone: string;
  endereco: {
    logradouro: string;
    numero: string;
    bairro: string;
    numMunicipio: number;
    nomeMunicipio: string;
    uf: string;
    cep: string;
    numPais: number;
    nomePais: string;
  };



}
