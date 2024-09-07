import { GetEmitentes } from "./get-emitentes";

export interface ApiEmitente {
  content: GetEmitentes[];
  pageable: any; // Ajuste conforme a necessidade
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: any; // Ajuste conforme a necessidade
  numberOfElements: number;
  first: boolean;
  empty: boolean;

}
