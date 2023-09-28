import {Injectable} from '@angular/core';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';

@Injectable({providedIn: 'root'})

export class NotiService {

  types: NbComponentStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];

  constructor(private toastrService: NbToastrService) {
  }

  public info(message: string) {
    this.showToast('info', 'Thông báo', message);
  }

  public error(message: string) {
    this.showToast('danger', 'Lỗi', message);
  }

  public success(message: string) {
    this.showToast('success', 'Thành công', message);
  }

  public custom(type: NbComponentStatus, title: string, message: string) {
    this.showToast(type, title, message);
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };

    this.toastrService.show(
      body,
      title,
      config);
  }
}
