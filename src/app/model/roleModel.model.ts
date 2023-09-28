export class RoleModel {
  code: string;
  id: number;
  name: string;
  check?: boolean;
  description: string;
  createdBy: string;
  createdOn: string;
  modifiedBy: string;
  modifiedOn: string;
  status?: number;
  sysRoleUser: any [];
}
