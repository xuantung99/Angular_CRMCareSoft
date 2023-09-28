export class ProcessStatusModel {
  id: number;
  code: number;
  name: string;
  description: string;
  process: string;
  createdOn: string;
  createdBy: string;
  modifiedOn: string;
  modifiedBy: string;
}

export class NextStatusModel {
  code: number;
  name: string;
}
