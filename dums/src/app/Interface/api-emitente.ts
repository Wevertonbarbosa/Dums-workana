import { GetEmitentes } from "./get-emitentes";

export interface ApiEmitente {
  content: GetEmitentes[];
  pageable: any; 
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: any; 
  numberOfElements: number;
  first: boolean;
  empty: boolean;

}
