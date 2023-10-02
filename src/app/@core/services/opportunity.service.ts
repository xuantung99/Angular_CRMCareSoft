import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {CountOppStatus, OpportunityModel} from '../../model/opportunity.model';
import {OppStatusByEmpModel} from '../../model/employee.model';
import {AppConstants} from '../utils/app.constants';
import {ExtraParam} from '../../model/extraParam.model';
import {formatDate} from '@angular/common';

@Injectable({providedIn: 'root'})
export class OpportunityService {
  private getById = '/api/customer_support/Opportunity/byId';
  private getByCareSoftId = '/api/customer_support/Opportunity/byCareSoftId';
  private getAllForMkt = '/api/customer_support/v2/Opportunity/allForMkt';
  private oppUrl = '/api/customer_support/Opportunity';
  private assignEmpsUrl = '/api/customer_support/OpportunityUser/changeMulti';
  private assignCustomerUrl = '/api/customer_support/opportunity/assigncustomer';
  private apiTicketClosedByEmp = '/api/customer_support/v2/Opportunity/ticketClosedByEmp';
  private apiCountbyStatus = '/api/customer_support/v2/Opportunity/countbyStatus';
  private apiTotalByProcessStatus = '/api/customer_support/v2/Opportunity/totalByProcessStatus';
  private apiticketClosedByEmpForSLorSM = '/api/customer_support/v2/Opportunity/ticketClosedByEmpForSLorSM';
  private recoveryOpportunityUrl = '/api/customer_support/OpportunityUser/RecoveryOpportunity';
  private recoveryOpportunityByLeaderUrl = '/api/customer_support/OpportunityUser/RecoveryOpportunityByLeader';

  constructor(private api: ApiService) {
  }

  public getOpportuntyById(id: number) {
    const response = new Subject<OpportunityModel>();
    this.api.get(this.getById, {id: id}).subscribe((res: any) => {
      if (res.statusCode === 200 && res.data !== null) {
        response.next(res.data);
      }
    });
    return response.asObservable();
  }

  public getOpportuntyCareSoftById(id: number) {
    const response = new Subject<OpportunityModel>();
    this.api.get(this.getByCareSoftId, {id: id}).subscribe((res: any) => {
      if (res.statusCode === 200 && res.data !== null) {
        response.next(res.data);
      }
    });
    return response.asObservable();
  }

  public getOpportuntiesByPhone(phone: string = '', page: number = 1, take: number = 20, type: number = 1) {
    return new Promise((resolve, reject) => {
      this.api.get(this.getAllForMkt, {phone: phone, page: page, take: take, type: type}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public countbyStatusV2(param: string = ``) {
    return new Promise((resolve, reject) => {
      this.api.get(`/api/customer_support/v2/Opportunity/countbyStatus${param}`).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public countbyStatusV3(params?: Array<ExtraParam>) {
     let param = '';
    if (params != null && params.length > 0) {
      for (let i = 0; i < params.length; i++) {
        if (i === 0) param += '?' + params[i].field + '=' + params[i].value;
        else param += '&' + params[i].field + '=' + params[i].value;
      }
    }
    return new Promise((resolve, reject) => {
      this.api.get(`/api/customer_support/v2/Opportunity/CountOppStatusByUser${param}`).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public countbyStatusForMkt(model: any) {
    return new Promise((resolve, reject) => {
      this.api.post(`/api/customer_support/v2/Opportunity/CountOppsForMarketingV2`, null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public countbyStatusByMkt(model: any) {
    return new Promise((resolve, reject) => {
      this.api.post(`/api/customer_support/v2/Opportunity/CountOppStatusByMarketing`, null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public countbyStatus(employeeId: number = -1, groupSale: number = -1, source: number = -1, status: number = -1,
                       orderId: number = -1, processed: number = -1, processStatus: number = -1, typeOpp: number = 1) {
    const response = new Subject<CountOppStatus[]>();
    this.api.get(this.apiCountbyStatus, {
      employeeId: employeeId,
      groupSale: groupSale,
      source: source,
      status: status,
      orderId: orderId,
      processed: processed,
      processStatus: processStatus,
      type: typeOpp,
    }).subscribe((res: any) => {
      if (res.statusCode === 200 && res.data !== null) {
        response.next(res.data);
      }
    });
    return response.asObservable();
  }

  public totalByProcessStatus(by: string = 'all', groupSale: number = -1, employee_code: string = '', type: number = 1) {
    const response = new Subject<OppStatusByEmpModel[]>();
    this.api.get(this.apiTotalByProcessStatus, {
      by: by,
      type: type,
      groupSale: groupSale,
      employee_code: employee_code,
    }).subscribe((res: any) => {
      if (res.statusCode === 200 && res.data !== null) {
        response.next(res.data);
      }
    });
    return response.asObservable();
  }

  public ticketClosedByEmp(by: string = 'all', groupSale: number = -1) {
    const response = new Subject<OppStatusByEmpModel[]>();
    this.api.get(this.apiTicketClosedByEmp, {
      by: by,
      groupSale: groupSale,
    }).subscribe((res: any) => {
      if (res.statusCode === 200 && res.data !== null) {
        response.next(res.data);
      }
    });
    return response.asObservable();
  }

  public assignEmployees(body: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.assignEmpsUrl, null, body).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public assigncustomer(id: number = 0, customerId: number = 0) {
    return new Promise((resolve, reject) => {
      this.api.post(this.assignCustomerUrl, {
        oppId: id,
        customerId: customerId,
      }).subscribe((res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public countMyOppByResultCall(param: string = ``) {
    return new Promise((resolve, reject) => {
      this.api.get(`/api/customer_support/v2/Opportunity/CountMyOppForResultCall${param}`).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public countOppForStatus(param: string = ``) {
    return new Promise((resolve, reject) => {
      this.api.get(`/api/customer_support/v2/Opportunity/CountMyOpportunityForStatus${param}`).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          for (const dat of res.data) {
            switch (dat.id) {
              case -1: {
                dat.name = 'Tất cả';
                break;
              }
              case AppConstants.ticketStatusAssigned: {
                dat.name = 'Chưa xử lý';
                break;
              }
              case AppConstants.ticketStatusProcessing: {
                dat.name = 'Đang xử lý';
                break;
              }
              case AppConstants.ticketStatusCancel: {
                dat.name = 'Đã hủy';
                break;
              }
              // case AppConstants.ticketStatusCancelToBought: {
              //   dat.name = 'Chốt chưa tạo đơn';
              //   break;
              // }
              case AppConstants.ticketStatusBought: {
                dat.name = 'Đã tạo đơn';
                break;
              }
              case AppConstants.ticketStatusCallAgain: {
                dat.name = 'Gọi lại sau';
                break;
              }
              case AppConstants.ticketStatusDelete: {
                dat.name = 'Trùng lặp';
                break;
              }
            }
          }
          resolve(res.data.filter(x => x.name !== ''));
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public countOppForMkt(param: string = ``) {
    return new Promise((resolve, reject) => {
      this.api.get(`/api/customer_support/v2/Opportunity/CountOppsForMarketing${param}`).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          for (const dat of res.data) {
            switch (dat.id) {
              case -1: {
                dat.name = 'Tất cả';
                break;
              }
              case AppConstants.ticketStatusCreate: {
                dat.name = 'Mới tạo';
                break;
              }
              case AppConstants.ticketStatusAssigned: {
                dat.name = 'Đã phân sale';
                break;
              }
              case AppConstants.ticketStatusProcessing: {
                dat.name = 'Đang xử lý';
                break;
              }
              case AppConstants.ticketStatusCancel: {
                dat.name = 'Đã hủy';
                break;
              }
              // case AppConstants.ticketStatusCancelToBought: {
              //   dat.name = 'Chốt chưa tạo đơn';
              //   break;
              // }
              case AppConstants.ticketStatusBought: {
                dat.name = 'Đã tạo đơn';
                break;
              }
              case AppConstants.ticketStatusCallAgain: {
                dat.name = 'Gọi lại sau';
                break;
              }
            }
          }
          resolve(res.data.filter(x => x.name !== ''));
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public countMyOppForMkt(param: string = ``) {
    return new Promise((resolve, reject) => {
      this.api.get(`/api/customer_support/v2/Opportunity/CountMyOppsForMarketing${param}`).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          for (const dat of res.data) {
            switch (dat.id) {
              case -1: {
                dat.name = 'Tất cả';
                break;
              }
              case AppConstants.ticketStatusCreate: {
                dat.name = 'Mới tạo';
                break;
              }
              case AppConstants.ticketStatusAssigned: {
                dat.name = 'Đã phân sale';
                break;
              }
              case AppConstants.ticketStatusProcessing: {
                dat.name = 'Đang xử lý';
                break;
              }
              case AppConstants.ticketStatusCancel: {
                dat.name = 'Đã hủy';
                break;
              }
              // case AppConstants.ticketStatusCancelToBought: {
              //   dat.name = 'Chốt chưa tạo đơn';
              //   break;
              // }
              case AppConstants.ticketStatusBought: {
                dat.name = 'Đã tạo đơn';
                break;
              }
              case AppConstants.ticketStatusCallAgain: {
                dat.name = 'Gọi lại sau';
                break;
              }
            }
          }
          resolve(res.data.filter(x => x.name !== ''));
        } else {
          reject(res.statusCode);
        }
      });
    });
  }


  public createOpportunity(model: OpportunityModel = new OpportunityModel()) {
    return new Promise((resolve, reject) => {
      this.api.post(this.oppUrl, null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public CreateOppUpSaleFromOpp(id) {
    return new Promise((resolve, reject) => {
      this.api.post('/api/customer_support/v2/Opportunity/CreateOppUpSaleFromOpp?oppId=' + id, null, null).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public changeProcessStatus(id: number = 0, statusId: number = 0) {
    return new Promise((resolve, reject) => {
      this.api.post(this.oppUrl + '/changeprocessStatus', {oppId: id, status: statusId})
        .subscribe(
          (res: any) => {
            if (res.statusCode === 200) {
              resolve(res.message);
            } else {
              reject(res.message);
            }
          });
    });
  }

  public updateOpportunity(id: number = 0, model: OpportunityModel = new OpportunityModel()) {
    return new Promise((resolve, reject) => {
      this.api.put(this.oppUrl, {id: id}, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public deleteOpportunityDuplicate(id: number) {
    return new Promise((resolve, reject) => {
      this.api.delete(this.oppUrl, {id: id}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public CountTicketToReport(type: number) {
    return new Promise((resolve, reject) => {
      this.api.get(`/api/customer_support/v2/Opportunity/CountTicketToReport?type=${type}`).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data.filter(x => x.name !== ''));
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public GetOppWithCustomerandAsigner(oppIds: string) {
    return new Promise((resolve, reject) => {
      this.api.get(`/api/customer_support/Opportunity/GetOppWithCustomerandAsigner?oppIds=${oppIds}`).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

// 20230204 HuyJR : NNEC- 337
  public ticketClosedByEmpForSLorSM(by: string = 'all', groupSale: number = -1, typeTicket: number = 1) {
    const startDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');
    const endDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');
    const response = new Subject<OppStatusByEmpModel[]>();
    this.api.get(this.apiticketClosedByEmpForSLorSM, {
      by: by,
      groupSale: groupSale,
      type: typeTicket,
      startDate: startDate,
      endDate: endDate,
    }).subscribe((res: any) => {
      if (res.statusCode === 200 && res.data !== null) {
        response.next(res.data);
      }
    });
    return response.asObservable();
  }

//
// Duy : NNEC-395
  public recoveryTicket(body: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.recoveryOpportunityUrl, null, body).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

// Duy : NNEC-476
  public recoveryTicketByLeader(body: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.recoveryOpportunityByLeaderUrl, null, body).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }
}
