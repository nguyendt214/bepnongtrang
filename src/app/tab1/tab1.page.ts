import { MainService } from './../ccmart/main.service';
import { IProduct } from './../ccmart/model/product';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { productData } from '../ccmart/data/products';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  products: Array<IProduct> = [];
  thucDon: Array<IProduct> = [];
  gioHang: Array<IProduct> = [];
  pageLoad = false;
  addToCartMessage = '';
  @ViewChild('giohangModal') giohangModal: ModalDirective;
  @ViewChild('addToCartModal') addToCartModal: ModalDirective;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mainService: MainService
  ) {
    this.products = productData;
    console.log(this.products);

  }

  ngOnInit() {
    this.mainService.getThucDonHomNay()
      .pipe(
        finalize(
          () => this.pageLoad = true
        )
      )
      .subscribe(
        (td: any) => {
          this.thucDon = td;
        }
      );
  }

  getProductImage(product: IProduct) {
    return product.IMAGE_URL ? product.IMAGE_URL : '/assets/img/logo.jpg';
  }
  getButtonState(sp: IProduct) {
    const idx = _.findIndex(this.gioHang, (s: IProduct) => {
      return sp.ID === s.ID;
    });
    if (idx > -1) {
      return 'ĐÃ MUA';
    }
    return 'MUA';
  }

  muaSanPham(sp: IProduct) {
    const idx = _.findIndex(this.gioHang, (s: IProduct) => {
      return sp.ID === s.ID;
    });
    if (idx > -1) {
      this.gioHang.splice(idx, 1, sp);
      this.addToCartMessage = 'Đã sửa giỏ hàng thành: ' + sp.NAME + ', SL: ' + sp.SL_SOLD + ' (' + sp.TYPE + '). Cám ơn QK!';
      this.addToCartModal.show();
      setTimeout(() => {
        this.addToCartModal.hide();
      }, 3000);
      return;
    }
    this.gioHang.push(sp);
    this.addToCartMessage = 'Đã thêm: ' + sp.NAME + ', SL: ' + sp.SL_SOLD + ' (' + sp.TYPE + ') vào giỏ hàng. Cám ơn QK!';
    this.addToCartModal.show();
    setTimeout(() => {
      this.addToCartModal.hide();
    }, 3000);
  }
  xemGioHang() {
    this.giohangModal.show();
  }
  chotDonHang() {

  }
}
