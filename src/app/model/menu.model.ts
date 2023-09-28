import {RoleModel} from './roleModel.model';

export class MenuModel {
  href: string;
  icon: string;
  menuId: number;
  name: string;
  orderDisplay: number;
  parentId: number;
  roles: RoleModel[];
  roleIds?: number[];
  status?: number;
  type: string;
}
