export class OpportunityLogModel {
  id: number;
  opportunityId: number;
  oldStatus: number; // Đây là ProcessStatus cũ
  newStatus: number; // Đây là ProcessStatus cũ

  oldProcessStatus: number; //ProcessStatus mới
  newProcessStatus: number; // Process Status mới

  oldCallStatus : number; //Đây là ResultCall
  newCallStatus : number; //Đây là ResultCall
  description: string;
  contactNumber: number;
  createdOn: string;
  createdBy: string;
  modifiedon: string;
  modifiedby: string;
  oldStatusName: string;
  newStatusName: string;
  oldCallStatusName : string;
  newCallStatusName : string;
  teamId : number;
  divisionId : number;
  oldPendingTime : Date;
  newPendingTime : Date;
}
