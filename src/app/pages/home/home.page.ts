import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonLabel,
  IonItem,
  IonText,
  IonThumbnail,
  IonListHeader,
  IonCol,
  IonRow,
  IonCard,
  IonToast,
  IonBadge,
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonBadge,
    IonToast,
    IonCard,
    IonRow,
    IonCol,
    IonListHeader,
    IonText,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonThumbnail,
    RouterLink,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  toastData = { message: '', color: '' };
  isToast = false;
  totalItems = 0;
  cartSub!: Subscription;
  private cartService = inject(CartService);

  constructor() {
  }

  ngOnInit() {
    this.cartSub = this.cartService.cart.subscribe({
      next: (cart) => {
        console.log(cart);
        this.totalItems = cart ? cart?.totalItem : 0;
      },
      error(err) {
        console.log(err)
      },
    });
  }

  async scanBarcode() {
    try {
      const barCode = await this.cartService.startScan();
      console.log(barCode);
      if (!barCode) {
        this.isToast = true;
        this.toastData = {
          color: 'danger',
          message: 'No Such Barcode Found',
        };
        return;
      }
      this.isToast = true;
      this.toastData = {
        color: 'success',
        message: 'Payment Done',
      };
      this.cartService.addItemByBarcode(barCode);
    } catch (error) {
      console.log(error);
    }
  }

  async scanQr() {
    try {
      const qrCode = await this.cartService.startScan(0);
      console.log(qrCode);
      if (!qrCode) {
        this.isToast = true;
        this.toastData = {
          color: 'danger',
          message: 'No Such QR Code Found',
        };
        return;
      }
      this.isToast = true;
      this.toastData = {
        color: 'success',
        message: 'Payment Done',
      };
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
      if(this.cartSub) this.cartSub.unsubscribe();
  }
}
