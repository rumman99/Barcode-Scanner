import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonButtons, IonIcon, IonButton, IonBadge, IonBackButton, IonCard, IonLabel, IonImg, IonItem, IonThumbnail, IonCol, IonRow, IonList, IonModal } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonList, IonRow, IonCol, IonItem, IonImg, IonLabel, IonCard, IonBackButton, IonBadge, IonButton, IonIcon, IonButtons, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonThumbnail, DecimalPipe, IonModal, QRCodeModule,]
})
export class CartPage implements OnInit, OnDestroy {

  cartData:any= null;
  cartSub!: Subscription;
  currency="$";
  isQrPay= false;
  isToast= false;
  toastData:any= {}; 

  private cartService= inject(CartService);

  constructor() { }

  ngOnInit() {
    this.cartSub = this.cartService.cart.subscribe({
      next: (cart) => {
        console.log(cart);
        this.cartData = cart;
      },
      error(err) {
        console.log(err)
      },
    });
  }

  async startScan(){
    try {
      const barCode= await this.cartService.startScan();
      this.cartService.addItemByBarcode(barCode);
    } catch (error) {
      console.log(error);
    }
  }

  addQuantity(item:any){
    this.cartService.addQuantity({...item, id:item?.item_id})
  }

  subtractQuantity(item:any){
    this.cartService.subtractQuantity({...item, id:item?.item_id})
  }

  ngOnDestroy(): void {
    if(this.cartSub) this.cartSub.unsubscribe();
  }

  async pay(model:IonModal){
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
      model.dismiss();

      //Clear Cart
      this.cartService.clearCart();
    } catch (error) {
      console.log(error);
    }
  }
}
