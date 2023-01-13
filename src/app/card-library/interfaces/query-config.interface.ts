export interface QueryConfig {
  name: string;
  pageSize: number;
  page: number;
  colorIdentity: string;
  first: number;
  gameFormat: string;
  orderBy?: string;
  colors?: string;
}
