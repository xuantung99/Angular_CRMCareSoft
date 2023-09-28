import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {EmployeeModel} from '../../model/employee.model';

@Injectable({providedIn: 'root'})
export class EmployeeService {
  private getAllSimpleUrl = '/api/employee/GetAllEmployeeSimple';
  private getByDepartmentCodeUrl = '/api/employee/ByDepartmentCode';
  private employeeUrl = '/api/employee';
  private customerEmployeeUrl = '/api/customer_support/FCEmployee';

  constructor(private api: ApiService) {
  }

  public getAllEmployeeSimple(limit: number = 9999, isActive = 1) {
    const response = new Subject<EmployeeModel[]>();
    this.api.get(this.getAllSimpleUrl, {
      limit: limit,
      isActive: isActive,
    }).subscribe(
      (res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          response.next(res.data);
        }
      },
    );
    return response.asObservable();
  }

  public getMyEmployees() {
    const response = new Subject<EmployeeModel[]>();
    this.api.get(this.employeeUrl + '/GetMyEmployees').subscribe(
      (res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          response.next(res.data);
        }
      },
    );
    return response.asObservable();
  }

  public getByDepartmentCode(departmentCode, isActive = 1) {
    return new Promise((resolve, reject) => {
      this.api.get(this.getByDepartmentCodeUrl, {departmentCode: departmentCode, isActive: isActive}).subscribe((res: any) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            resolve([]);
          }
        },
      );
    });
  }
  // Lấy danh sách nhân viên 
  public GetAllEmployee(){
    return new Promise((resolve, reject) => {
      this.api.get(this.customerEmployeeUrl + "/all").subscribe((res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          resolve([]);
        }
      });
    });
  }

  // Thêm nhân viên
  public CreateEmployee(empModel: any){
    return new Promise((resolve, reject) => {
      this.api.post(this.customerEmployeeUrl +"/create",empModel).subscribe((res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          resolve([]);
        }
      });
    });
  }
  // Đồng bộ nhân viên
  public SyncEmployee(){
    return new Promise((resolve, reject) => {
     // lấy danh sách thuộc sale departmeent 
     this.getByDepartmentCode("sales-department").then((res:any) =>{
      this.api.post(this.customerEmployeeUrl +"/SyncEmployee",null,res).subscribe((res: any) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
     })
    });
  }

}
