import {Component, OnDestroy} from '@angular/core';
import {NbThemeService, NbWindowService, NbWindowRef} from '@nebular/theme';
import {takeWhile} from 'rxjs/operators';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-promotion',
  styleUrls: ['../edit/form-order.component.scss'],
  templateUrl: './promotion.component.html',
})

export class PromotionComponent implements OnDestroy {
  private alive = true;
  commonStatusCardsSet: CardSettings[] = [];
  statusCards: string;
  user: any;
  public promotionServiceId = 0;
  public promotionDiscountId = 0;
  public promotionGiveId = 0;
  lstPromotionService : any=[];
  lstPromotionDiscount : any=[];
  lstPromotionGive : any=[];
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
    , private windowRef: NbWindowRef) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    const pr: any = this.windowRef.config.context;
    if (pr.data.length > 0) {
      this.lstPromotionService = [{
        id: 0,
        name : "Không"
      }];
      this.lstPromotionDiscount = [{
        id: 0,
        name : "Không"
      }];
      this.lstPromotionGive = [{
        id: 0,
        name : "Không"
      }];
      for (const pro of pr.data) {
        if(pro.typeId == 1)
          this.lstPromotionService.push(pro)
        else if(pro.typeId == 2)
          this.lstPromotionDiscount.push(pro)
        else
          this.lstPromotionGive.push(pro)
      }
    }
  }
  cancel() {
    this.windowRef.close();
  }
  submit() {
    this.windowRef.config.context = {
      promotionServiceId: this.promotionServiceId,
      promotionDiscountId: this.promotionDiscountId,
      promotionGiveId: this.promotionGiveId,
    };
    this.windowRef.close();
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
