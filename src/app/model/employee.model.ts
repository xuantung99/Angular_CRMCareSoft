export class EmployeeModel {
  code: string;
  email: string;
  employeeId: number;
  fullName: string;
  employeeName: string;
  count?: number;
}

export class OppStatusByEmpModel {
  employeeStats: EmployeeModel[];
  statusId: number;
  statusName: string;
  total: number;
  count?: number;
}
