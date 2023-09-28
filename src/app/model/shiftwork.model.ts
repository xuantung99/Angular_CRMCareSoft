export class ShiftworkModel {
  shiftDate: string;
  dayOfWeekName: string;
  isUpdate: boolean;
  shifts: ShiftModel[];
}

export class ShiftModel {
  userCode: string;
  shiftTimeOne: string;
  shiftTimeTwo: string;
  shiftTimeThree: string;
  shiftOne: boolean;
  shiftTwo: boolean;
  shiftThree: boolean;
  shiftNum: number;
  shiftPrio: number;
}

export class ShiftWorkInput {
  userCode: string;
  shiftDate: string;
  shiftType: number;
  shiftValue: boolean;
  shiftPrio: number;
}

