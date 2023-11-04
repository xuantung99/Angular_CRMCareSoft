import {Component, OnDestroy} from '@angular/core';
import {NbThemeService, NbWindowRef} from '@nebular/theme';
import {takeWhile} from 'rxjs/operators';
import * as XLSX from 'xlsx';
import {ApiService} from '../../../@core/services/api.service';
import {NotiService} from '../../../@core/services/noti.service';
interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}
@Component({
  selector: 'ngx-insert-opp',
  styleUrls: ['./../opportunity.component.scss'],
  templateUrl: './insertOpp.component.html',
})
export class InsertOppComponent implements OnDestroy {
  private alive = true;
  commonStatusCardsSet: CardSettings[] = [];
  statusCards: string;
  user: any;
  file: File;
  arrayBuffer: any;
  fileList: any = [];
  formError = false;
  checkUpdate = true;
  errorLog = '';
  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: this.commonStatusCardsSet,
    dark: this.commonStatusCardsSet,
  };
  constructor(private themeService: NbThemeService
              , private noti: NotiService
              , private windowRef: NbWindowRef
              , private api: ApiService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
  }
  ngOnDestroy() {
    this.alive = false;
  }
  addfile(event) {
    this.formError = false;
    this.file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }

      const workbook = XLSX.read(arr.join(''), {type: 'binary', cellDates: true, dateNF: 'dd/mm/yyyy' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      this.fileList = XLSX.utils.sheet_to_json(worksheet, {raw: false});
    };
  }

  updateOpp() {
    this.formError = false;
    if (this.fileList.length > 0) {
      this.checkUpdate = false;
      this.api.post('/api/customer_support/FCOpportunity/insertMultiple', null, this.fileList)
        .subscribe(
          (res: any) => {
            if (res.statusCode === 200) {
              let check = false;
              for (let i = 0; i !== this.fileList.length; ++i) {
                for (const dataE of res.data) {
                  if ( Number(this.fileList[i].STT) === dataE.data.stt && dataE.statusCode === 400) {
                    this.fileList[i].clError = 'item-error';
                    check = true;
                  } else if (Number(this.fileList[i].STT) === dataE.data.stt && dataE.statusCode === 409) {
                    this.fileList[i].clError = 'item-duplicate';
                    check = true;
                  }
                }
              }

              if (check) {
                this.errorLog = 'Có lỗi 1 số thông tin khách hàng không thể thêm được. Bạn hãy kiểm tra lại';
              } else {
                this.noti.success('Cập nhật thành công');
                this.windowRef.close();
              }
            } else {
              this.checkUpdate = true;
              this.errorLog = 'Có lỗi không trong quá trình cập nhât. Bạn hãy thử lại';
            }
          });
    } else {
      this.formError = true;
    }
  }
}
