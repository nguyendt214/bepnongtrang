import { IProduct } from './../../ccmart/model/product';
import { MainService } from './../../ccmart/main.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ModalDirective } from 'ngx-bootstrap';
import { productData } from 'src/app/ccmart/data/products';
import { AlertController, ToastController } from '@ionic/angular';
import { DecimalPipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-mu-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Array<IProduct> = [];
  temp: Array<IProduct> = [];
  thucDon: Array<IProduct> = [];
  searchBox = '';
  moment = moment;
  @ViewChild('confirmModal') confirmModal: ModalDirective;
  constructor(
    private mainService: MainService,
    private alertController: AlertController,
    private _decimalPipe: DecimalPipe,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.products = productData;
    this.temp = [...this.products];
  }

  getProductImage(product: IProduct) {
    return product.IMAGE_URL ? product.IMAGE_URL : '/assets/img/logo.jpg';
  }
  getButtonState(sp: IProduct) {
    const idx = _.findIndex(this.thucDon, (s: IProduct) => {
      return sp.ID === s.ID;
    });
    if (idx > -1) {
      return 'ĐÃ THÊM';
    }
    return 'THÊM';
  }
  updateFilter() {
    const val = this.searchBox.toUpperCase();
    // filter our data
    const temp = this.temp.filter(function (d: IProduct) {
      return (d.NAME && d.NAME.toUpperCase().indexOf(val) !== -1) ||
        (d.SKU && d.SKU.toString().toUpperCase().indexOf(val) !== -1) ||
        (d.GROUP && d.GROUP.toString().toUpperCase().indexOf(val) !== -1) ||
        !val;
    });
    this.products = temp;
  }
  addThucDon(sp: IProduct) {
    sp.GIA_THEO_NGAY = sp.GIA_THEO_NGAY ? sp.GIA_THEO_NGAY : sp.PRICE_ORIGIN;
    const idx = _.findIndex(this.thucDon, (s: IProduct) => {
      return sp.ID === s.ID;
    });
    if (idx > -1) {
      this.thucDon.splice(idx, 1, sp);
      return;
    }
    this.thucDon.push(sp);
  }

  async hoanThanhThucDon() {
    let message = '<p>Bạn chắc chắn muốn tạo thực đơn cho ngày hôm nay?</p>';
    this.thucDon.forEach((pro: IProduct, idx: number) => {
      message += '<p>' + (idx + 1) + '. ' + pro.NAME +
        ' - Giá bán: ' + this._decimalPipe.transform(pro.GIA_THEO_NGAY) + ' VNĐ - SL: ' + pro.SL_THEO_NGAY + ' (' + pro.TYPE + ')' + '</p>';
    });
    const alert = await this.alertController.create({
      header: 'Chú ý',
      subHeader: '',
      message: message,
      cssClass: 'big-alert',
      mode: 'ios',
      buttons: [
        {
          text: 'Không',
          role: 'Không',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Ok',
          handler: () => {
            this.taoThucDon();
          }
        }]
    });
    await alert.present();
  }
  taoThucDon() {
    this.mainService.taoThucDon(JSON.stringify(this.thucDon))
      .subscribe(
        data => {
          console.log(data);
          this.thucDon = [];
          this.taoThucDonToast();
        },
        error => {
          console.log(error);
        }
      );
  }
  async taoThucDonToast() {
    const toast = await this.toastController.create({
      message: 'Thực đơn đã được tạo',
      duration: 5000
    });
    toast.present();
  }

}
