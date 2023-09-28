export class PlanInfo {
  id: number;
  type: string;
  startDate: Date;
  endDate: Date;
  description: string;
  cost: number;
  impr: number;
  clicks: number;
  conversions: number;
  lead: number;
  order: number;
  product: number;
  productId: number;
  quantity: number;
}

export class ReportAdsInfo {
  cost: number;
  impr: number;
  clicks: number;
  conversions: number;
  total_lead: number;
  total_order: number;
  total_amount: number;
  total_quantity: number;
}
