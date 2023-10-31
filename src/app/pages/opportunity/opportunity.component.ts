import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbThemeService, NbWindowService, NbWindowRef} from '@nebular/theme';
import {takeWhile} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../@core/services/api.service';
import {NotiService} from '../../@core/services/noti.service';
import {ServerDataSource} from 'ng2-smart-table';
import {PermissionService} from '../../@core/services/permission.service';
import {InsertOppComponent} from './import/insertOpp.component';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-opportunity',
  styleUrls: ['./opportunity.component.scss'],
  templateUrl: './opportunity.component.html',
})
export class OpportunityComponent implements OnInit, OnDestroy {
  private alive = true;
  phone = '';
  email = '';
  facebook = '';
  fullName = '';
  source = '';
  status = '';
  sourceData: any;
  perPage: number = 15;
  page: number = 1;
  oppSource = [];
  oppStatus = [];
  commonStatusCardsSet: CardSettings[] = [];
  wRef: NbWindowRef;
  statusCards: string;
  settings: any = {
    mode: 'external',
    actions: {
      add: false, edit: false, delete: false, position: 'right', custom: [
        {name: 'viewAction', title: '<i class="nb-search"></i>'},
        {name: 'editAction', title: '<i class="nb-plus-circled"></i>'},
      ],
    },
    hideSubHeader: true,
    columns: {
      fullName: {
        title: 'Họ tên',
        type: 'string',
      },
      phone: {
        title: 'Số điện thoại',
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value !== '' && value !== undefined) {
            return 'xxx' + value.slice(-5);
          } else {
            return '';
          }
        },
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      facebook: {
        title: 'Facebook',
        type: 'string',
      },
      description: {
        title: 'Nội dung',
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value && value.length > 250) {
            return value.split(' ').slice(0, 45).join(' ') + ' ...';
          } else {
            return value;
          }
        },
      },
      status: {
        title: 'Nhóm ticket',
        type: 'string',
        valuePrepareFunction: (value) => {
          for (const st of this.oppStatus) {
            if (st.id === value) {
              return st.name;
            }
          }
        },
      },
    },
    pager: {
      perPage: 15,
    },
  };

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
    , private api: ApiService
    , private permission: PermissionService
    , private windowService: NbWindowService
    , private router: Router
    , @Inject(ActivatedRoute) private routeA: ActivatedRoute
    , private http: HttpClient
    , private noti: NotiService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
        this.permission.canAccess('customer_support', '/api/Opportunity/all');
      });
  }

  ngOnInit(): void {
    this.api.get('/api/customer_support/OpportunitySource/all', {take: 1000}).subscribe(
      (res: any) => {
        this.oppSource = res.data;
      },
    );

    this.api.get('/api/customer_support/OpportunityStatus/all', {take: 1000}).subscribe(
      (res: any) => {
        this.oppStatus = res.data;
      },
    );

    this.getdataOpp();
  }

  showEdit($event) {
    this.router.navigate(['/answer/' + $event.data.id]);
  }

  onSubmit() {
    this.getdataOpp();
  }

  resetSearch() {
    this.phone = '';
    this.email = '';
    this.facebook = '';
    this.getdataOpp();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getdataOpp(): void {
    let qParams: string = ``;
    if (this.phone !== '') {
      if (qParams === '') {
        qParams += `?phone=${this.phone}`;
      } else {
        qParams += `&phone=${this.phone}`;
      }
    }

    if (this.email !== '') {
      if (qParams === '') {
        qParams += `?email=${this.email}`;
      } else {
        qParams += `&email=${this.email}`;
      }
    }

    if (this.facebook !== '') {
      if (qParams === '') {
        qParams += `?facebook=${this.facebook}`;
      } else {
        qParams += `&facebook=${this.facebook}`;
      }
    }

    if (this.status !== '') {
      if (qParams === '') {
        qParams += `?status=${this.status}`;
      } else {
        qParams += `&status=${this.status}`;
      }
    }

    if (this.source !== '') {
      if (qParams === '') {
        qParams += `?source=${this.source}`;
      } else {
        qParams += `&source=${this.source}`;
      }
    }

    if (this.fullName !== '') {
      if (qParams === '') {
        qParams += `?name=${this.fullName}`;
      } else {
        qParams += `&name=${this.fullName}`;
      }
    }

    this.sourceData = new ServerDataSource(this.http, {
      endPoint: `/api/customer_support/Opportunity/all${qParams}`,
      dataKey: 'data',
      pagerLimitKey: 'limit',
      pagerPageKey: 'page',
      totalKey: 'total',
    });
  }

  actionOpp(event) {
    if (event.action === 'viewAction') {
      this.router.navigate(['/opportunity/edit/' + event.data.id]);
    } else if (event.action === 'editAction') {
      this.router.navigate(['/order/opp/' + event.data.id]);
    }
  }

  importOpp() {
    this.wRef = this.windowService.open(
      InsertOppComponent,
      {
        title: 'Thêm mới danh sách ticket',
        context: {},
      },
    );

    this.wRef.onClose.subscribe((res) => {
      this.getdataOpp();
    });
  }
}
