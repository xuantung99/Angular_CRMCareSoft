import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({providedIn: 'root'})

export class LocationService {
  private apiAllProvince = '/api/shipment/FCAdminShip/GetAllProvince';
  private apiAllDistrict = '/api/shipment/FCAdminShip/GetAllDistrict';
  private apiAllSubDistrict = '/api/shipment/FCAdminShip/GetAllSubDistrict';
  private reloadData = false;
  constructor(private api: ApiService) {
    if (this.reloadData === true) {
      localStorage.removeItem('data_provinces');
      localStorage.removeItem('data_district');
      localStorage.removeItem('data_subDistrict');
    }
  }

  public getAllProvince() {
    return new Promise((resolve, reject) => {
      const provinces = localStorage.getItem('data_provinces');
      if (provinces === null) {
        this.api.get(this.apiAllProvince).subscribe((res: any) => {
          if (res.statusCode === 200 && res.data !== null) {
            localStorage.setItem('data_provinces', JSON.stringify(res.data));
            resolve(res.data);
          } else {
            reject([]);
          }
        });
      } else {
        resolve(JSON.parse(provinces));
      }
    });
  }

  public getAllDistrict() {
    return new Promise((resolve, reject) => {
      const district = localStorage.getItem('data_district');
      if (district === null) {
        this.api.get(this.apiAllDistrict).subscribe((res: any) => {
          if (res.statusCode === 200 && res.data !== null) {
            localStorage.setItem('data_district', JSON.stringify(res.data));
            resolve(res.data);
          } else {
            reject([]);
          }
        });
      } else {
        resolve(JSON.parse(district));
      }
    });
  }

  public getAllSubDistrict() {
    return new Promise((resolve, reject) => {
      const subDistrict = localStorage.getItem('data_subDistrict');
      if (subDistrict === null) {
        this.api.get(this.apiAllSubDistrict).subscribe((res: any) => {
          if (res.statusCode === 200 && res.data !== null) {
            localStorage.setItem('data_subDistrict', JSON.stringify(res.data));
            resolve(res.data);
          } else {
            reject([]);
          }
        });
      } else {
        resolve(JSON.parse(subDistrict));
      }
    });
  }

  public getDistrictByProvinceId(provinceId) {
    return new Promise((resolve, reject) => {
      const district = localStorage.getItem('data_district');
      if (district === null) {
        this.getAllDistrict().then((data: any) => {
          resolve(data.filter(x => x.provinceId === Number(provinceId)));
        });
      } else {
        const dt = JSON.parse(district);
        resolve(dt.filter(x => x.provinceId === Number(provinceId)));
      }
    });
  }

  public getSubDistrictByDistrictId(districtId) {
    return new Promise((resolve, reject) => {
      const subDistrict = localStorage.getItem('data_subDistrict');
      if (subDistrict === null) {
        this.getAllSubDistrict().then((data: any) => {
          resolve(data.filter(x => x.districtId === Number(districtId)));
        });
      } else {
        const dt = JSON.parse(subDistrict);
        resolve(dt.filter(x => x.districtId === Number(districtId)));
      }
    });
  }

  public getProvinceById(provinceId) {
    return new Promise((resolve, reject) => {
      const provinces = localStorage.getItem('data_provinces');
      if (provinces === null) {
        this.getAllProvince().then((data: any) => {
          resolve(data.filter(x => x.provinceId === Number(provinceId)));
        });
      } else {
        const pr = JSON.parse(provinces);
        resolve(pr.find(x => x.provinceId === Number(provinceId)));
      }
    });
  }

  public getDistrictById(districtId) {
    return new Promise((resolve, reject) => {
      const districts = localStorage.getItem('data_district');
      if (districts === null) {
        this.getAllDistrict().then((data: any) => {
          resolve(data.filter(x => x.districtId === Number(districtId)));
        });
      } else {
        const dt = JSON.parse(districts);
        resolve(dt.find(x => x.districtId === Number(districtId)));
      }
    });
  }

  public getSubDistrictById(subDistrictId) {
    return new Promise((resolve, reject) => {
      const subDistrict = localStorage.getItem('data_subDistrict');
      if (subDistrict === null) {
        this.getAllSubDistrict().then((data: any) => {
          resolve(data.filter(x => x.wardId === Number(subDistrictId)));
        });
      } else {
        const sdt = JSON.parse(subDistrict);
        resolve(sdt.find(x => x.wardId === Number(subDistrictId)));
      }
    });
  }
}
