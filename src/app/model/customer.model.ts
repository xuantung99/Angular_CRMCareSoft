export class CustomerModel {
  customerId: number;
  dateOfBirth: string;
  email: string;
  facebookId: string;
  fullName: string;
  gender: string;
  googleId: string;
  hasOrder: number;
  hasPassword: boolean;
  isEmailVerified?: boolean;
  isFacebookLogin: number;
  isGoogleLogin?: boolean;
  isPhoneVerified?: boolean;
  phone: string;
  primaryRegister: string;
  shippingAddress: ShippingAddressModel[];
}

export class ShippingAddressModel {
  address: string;
  districtId: number;
  districtName: string;
  fullName: string;
  phone: string;
  provinceId: number;
  provinceName: string;
  shippingAddressId: number;
  subDistrictId: number;
  subDistrictName: string;
}
