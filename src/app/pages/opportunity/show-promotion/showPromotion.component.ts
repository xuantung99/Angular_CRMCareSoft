import {Component, OnDestroy} from '@angular/core';
import {NbThemeService, NbWindowService, NbWindowRef} from '@nebular/theme';
import {takeWhile} from 'rxjs/operators';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-showpromotion',
  styleUrls: ['../edit/edit.component.scss'],
  templateUrl: './showPromotion.component.html',
})

export class ShowPromotionComponent implements OnDestroy {
  private alive = true;
  commonStatusCardsSet: CardSettings[] = [];
  statusCards: string;
  user: any;
  promotionInfo: any;
  locations: any = [];
  conditionLocations: any = [];
  conditionProducts: any = [];
  conditionData: any = [];
  dataContext: any;
  conditionObjects: any = [
    {check: false, Name: 'Đã có đơn hàng', value: 1},
    {check: false, Name: 'Tổng giá trị đơn hàng', value: 2, total: 0},
  ];
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
    , private windowService: NbWindowService
    , private windowRef: NbWindowRef) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

      this.dataContext = this.windowRef.config.context;
      this.promotionInfo = this.dataContext.promotion;
      this.locations = this.dataContext.locations;
      this.createCondition(this.promotionInfo.promotionCondition, this.promotionInfo.promotionReward);
  }

  createCondition(dataCondition, dataReward): void {
    if (dataCondition.length > 0) {
      if (this.promotionInfo.promotionType === 1) {
        for (const condition of dataCondition) {
          switch (condition.conditionType) {
            case 4: {
              const obj = JSON.parse(condition.condition);
              this.conditionLocations = obj.LocationList;
              break;
            }
            case 2: {
              const obj = JSON.parse(condition.condition);
              this.conditionProducts.push(
                {productId: obj.ProductId, productName: obj.ProductName, quantity: obj.Quantity});
              break;
            }
            case 3: {
              break;
            }
            case 5: {
              break;
            }
          }
        }
      } else {
        if (this.promotionInfo.typeId === 2) {
          for (const condition of dataCondition) {
            const obj = JSON.parse(condition.condition);
            this.conditionProducts.push({
              productId: obj.ProductId, productName: obj.ProductName, quantity: obj.Quantity
              , price: obj.Price, salePrice: 0, discount: obj.Discount,
            });
          }
        } else {
          if (dataReward.length > 0) {
            for (const condition of dataCondition) {
              const obj = JSON.parse(condition.condition);
              for (const reward of dataReward) {
                if (condition.id === reward.conditionId) {
                  const objR = JSON.parse(reward.rewards);
                  this.conditionProducts.push({
                    productId: obj.ProductId, productName: obj.ProductName, quantity: obj.Quantity,
                    productIdR: objR.ProductId, productNameR: objR.ProductName, categoryId: 0, quantityR: objR.Quantity,
                    products: [{productId: objR.ProductId, productName: objR.ProductName}],
                  });
                }
              }
            }
          }
        }
      }
    }

    if (dataReward.length > 0) {
      this.conditionData.data = [];
      this.conditionData.products = [];
      for (const dataR of dataReward) {
        switch (dataR.rewardType) {
          case 2: {
            const obj = dataR.rewards;
            this.conditionData.type = obj.Type;
            this.conditionData.data.push({
              start: obj.StartPrice,
              end: obj.EndPrice,
              discount: obj.Discount,
              max: obj.Max,
            });
            break;
          }
          case 3: {
            const obj = dataR.rewards;
            this.conditionData.products.push({
              start: obj.StartPrice, end: obj.EndPrice,
              productId: obj.ProductId, productName: obj.ProductName, quantity: obj.Quantity,
            });
            break;
          }
          case 1: {
            const obj = dataR.rewards;
            this.conditionData.type = obj.Type;
            this.conditionData.data.push({
              start: obj.StartPrice,
              end: obj.EndPrice,
              discount: obj.Discount,
              max: obj.Max,
            });
            break;
          }
        }
      }
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
