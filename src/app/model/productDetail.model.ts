export class ProductDetailModel {
  CategoryId: number;
  CreatedOn: string;
  Descriptions: DescriptionProductDetailModel[];
  DetailDescription: string;
  DisplayOrder: number;
  Id: number;
  ManufactureName: string;
  MetaDescription: string;
  MetaKeyword: string;
  MetaTitle: string;
  Name: string;
  ProductSkus: ProductSkuModel[];
  QuestionAndAnswers: any = [];
  SellerName: string;
  SeoId: string;
  ShortDescription1: string;
  ShortDescription2: string;
  Status: string;
  Tag: string;
  ThumbnailUrl: string;
  Unit: string;
}

export class DescriptionProductDetailModel {
  Title: string;
  Value: string;
}

export class ProductSkuModel {
  AttachFiles: any = [];
  AttributeValue: any;
  ConvertedWeightGram: number;
  DimensionXCm: number;
  DimensionYCm: number;
  DimensionZCm: number;
  Medias: any[];
  OriginalPrice: number;
  QuantityAvaiable: number;
  QuantityInStock: number;
  QuantityOrdered: number;
  SalePrice: number;
  Sku: string;
  WeightGram: number;
}
