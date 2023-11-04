// khai báo các function mặc định , setting của table,.....

import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { AOppViewComponent } from "../../pages/aOppView.component";
import { ShowDescriptionComponent } from "../../pages/showDescription.component";
import { TreeNode } from "./app.constants";
import { FSEntry } from "./app.constants";

// mục đích cho code ở các component gọn hơn
@Injectable()
export class Globals {
  public GetSettingTable(perPages: any, processStatus: any, subProcessStatus: any, productData: any) {
    var result = {
      actions: {
        columnTitle: '', add: false, edit: false, delete: false, position: 'right', custom: [
          { name: 'viewAction', title: '<i class="nb-search inline-block"></i>' },
          { name: 'editAction', title: '<i class="nb-edit inline-block"></i>' },
        ],
      },
      hideSubHeader: true,
      columns: {
        id: {
          title: 'Mã',
          type: 'custom',
          renderComponent: AOppViewComponent,
        },
        fullName: {
          title: 'Họ tên',
          type: 'string',
          sort: false,
        },
        phone: {
          title: 'Số đt',
          type: 'string',
          sort: false,
          valuePrepareFunction: (value) => {
            if (value !== '' && value !== undefined) {
              return 'xxx' + value.slice(-5);
            } else {
              return '';
            }
          },
        },
        orderCode: {
          title: 'Nguồn tạo',
          type: 'string',
          sort: false,
        },
        items: {
          title: 'Sản phẩm',
          type: 'string',
          sort: false,
          valuePrepareFunction: (value) => {
            const lp = [];
            for (const p of value) {
              const item = productData.find(x => x.Id === p.productId);
              if (item) {
                lp.push(item.Name);
              }
            }
            if (lp.length > 0) {
              return lp.join(' , ');
            } else {
              return '';
            }
          },
        },
        quantityItems: {
          title: 'Số lượng SP',
          type: 'string',
          sort: true,
        },
        processStatus: {
          title: 'Trạng thái xử lý',
          type: 'string',
          sort: false,
          valuePrepareFunction: (value) => {
            const item = processStatus.find(x => x.id === Number(value));
            if (item) {
              return item.name;
            } else {
              return '';
            }
          },
        },
        description: {
          title: 'Nội dung',
          type: 'custom',
          sort: false,
          renderComponent: ShowDescriptionComponent,
        },
        // createdBy: {
        //   title: 'Người tạo',
        //   type: 'string',
        //   sort: false,
        // },
        modifiedOn: {
          title: 'Ngày cập nhật',
          type: 'string',
          valuePrepareFunction: (value) => {
            if (value !== '' && value !== undefined) {
              return formatDate(value, 'dd/MM/yyyy hh:mm:ss a', 'en-US');
            } else {
              return '';
            }
          },
        },
        pendingToDate: {
          title: 'Ngày phải gọi',
          type: 'string',
          sort: true,
          valuePrepareFunction: (value) => {
            if (value) {
              return formatDate(value, 'dd/MM/yyyy', 'en-US');
            } else {
              return '';
            }
          },
        },
        createdOn: {
          title: 'Ngày tạo',
          type: 'string',
          valuePrepareFunction: (value) => {
            if (value !== '' && value !== undefined) {
              return formatDate(value, 'dd/MM/yyyy hh:mm:ss a', 'en-US');
            } else {
              return '';
            }
          },
        },
        expToDate: {
          title: 'Ngày hết hàng',
          type: 'string',
          sort: true,
          valuePrepareFunction: (value) => {
            if (value) {
              return formatDate(value, 'dd/MM/yyyy', 'en-US');
            } else {
              return '';
            }
          },
        },
        subProcessStatus: {
          title: 'Trạng thái',
          type: 'string',
          sort: false,
          valuePrepareFunction: (value) => {
            const item = subProcessStatus.find(x => x.id === Number(value));
            if (item) {
              return item.name;
            } else {
              return '';
            }
          },
        },

      },
      pager: {
        display: true,
        page: 1,
        perPage: 10,
        perPageSelect: perPages,
      },
    };
    return result;
  };
  public GetSettingTableProcessing(perPages: any, processStatus: any, subProcessStatus: any, productData: any, user: any) {
    var result = {
      actions: {
        columnTitle: '', add: false, edit: false, delete: false, position: 'right', custom: [
          { name: 'viewAction', title: '<i class="nb-search inline-block"></i>' },
          { name: 'editAction', title: '<i class="nb-edit inline-block"></i>' },
        ],
      },
      rowClassFunction: (row) => {
        var dayModifiedOn = formatDate(row.data.modifiedOn, 'dd/MM/yyyy', 'en-US');
        var nowDay = formatDate(Date.now().toString(), 'dd/MM/yyyy', 'en-US');
        if (dayModifiedOn == nowDay && row.data.modifiedBy == user.email) {
          return 'solved';
        }
      },
      hideSubHeader: true,
      columns: {
        id: {
          title: 'Mã',
          type: 'custom',
          renderComponent: AOppViewComponent,
        },
        fullName: {
          title: 'Họ tên',
          type: 'string',
          sort: false,
        },
        phone: {
          title: 'Số đt',
          type: 'string',
          sort: false,
          valuePrepareFunction: (value) => {
            if (value !== '' && value !== undefined) {
              return 'xxx' + value.slice(-5);
            } else {
              return '';
            }
          },
        },
        orderCode: {
          title: 'Nguồn tạo',
          type: 'string',
          sort: false,
        },
        items: {
          title: 'Sản phẩm',
          type: 'string',
          sort: false,
          valuePrepareFunction: (value) => {
            const lp = [];
            for (const p of value) {
              const item = productData.find(x => x.Id === p.productId);
              if (item) {
                lp.push(item.Name);
              }
            }
            if (lp.length > 0) {
              return lp.join(' , ');
            } else {
              return '';
            }
          },
        },
        quantityItems: {
          title: 'Số lượng SP',
          type: 'string',
          sort: true,
        },
        description: {
          title: 'Nội dung',
          type: 'custom',
          sort: false,
          renderComponent: ShowDescriptionComponent,
        },
        // createdBy: {
        //   title: 'Người tạo',
        //   type: 'string',
        //   sort: false,
        // },
        modifiedOn: {
          title: 'Ngày cập nhật',
          type: 'string',
          valuePrepareFunction: (value) => {
            if (value !== '' && value !== undefined) {
              return formatDate(value, 'dd/MM/yyyy hh:mm:ss a', 'en-US');
            } else {
              return '';
            }
          },
        },
        pendingToDate: {
          title: 'Ngày phải gọi',
          type: 'string',
          sort: true,
          valuePrepareFunction: (value) => {
            if (value) {
              return formatDate(value, 'dd/MM/yyyy', 'en-US');
            } else {
              return '';
            }
          },
        },
        createdOn: {
          title: 'Ngày tạo',
          type: 'string',
          valuePrepareFunction: (value) => {
            if (value !== '' && value !== undefined) {
              return formatDate(value, 'dd/MM/yyyy hh:mm:ss a', 'en-US');
            } else {
              return '';
            }
          },
        },
        expToDate: {
          title: 'Ngày hết hàng',
          type: 'string',
          sort: true,
          valuePrepareFunction: (value) => {
            if (value) {
              return formatDate(value, 'dd/MM/yyyy', 'en-US');
            } else {
              return '';
            }
          },
        },
        processStatus: {
          title: 'Trạng thái xử lý',
          type: 'string',
          sort: false,
          valuePrepareFunction: (value) => {
            const item = processStatus.find(x => x.id === Number(value));
            if (item) {
              return item.name;
            } else {
              return '';
            }
          },
        },
        subProcessStatus: {
          title: 'Trạng thái',
          type: 'string',
          sort: false,
          valuePrepareFunction: (value) => {
            const item = subProcessStatus.find(x => x.id === Number(value));
            if (item) {
              return item.name;
            } else {
              return '';
            }
          },
        },
      },
      pager: {
        display: true,
        page: 1,
        perPage: 10,
        perPageSelect: perPages,
      },
    };
    return result;
  }
  public dataTree: TreeNode<FSEntry>[];
  public prepareDataTreeView (arrOppIds: any,data: any) {
    this.dataTree = [];
    arrOppIds.forEach(oppId => {
        var lstChilds = [];
        var findChild = data.filter(x => x.parentId == oppId);
        findChild.forEach(child => {
          var preparechild = {
            data : {
              id: child.id,
              customerName: child.customerName,
              status: child.status,
              empEssign: child.empEssign,
              modifieldOn: formatDate(child.modifieldOn, 'dd/MM/yyyy HH:mm', 'en-US'),
              pendingToDate: formatDate(child.pendingToDate, 'dd/MM/yyyy HH:mm', 'en-US'),
              expToDate:formatDate(child.expToDate, 'dd/MM/yyyy HH:mm', 'en-US')}
            }
            lstChilds.push(preparechild);
        });
        if(findChild.length > 0)
        {
          this.dataTree.push(
            {
              data: { id : Number.parseInt(oppId)},
              children: lstChilds
            }
          )
        }
     });
     return this.dataTree;
  }
}
