import { inject, Injectable } from '@angular/core';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { product } from 'src/app/data/products';
import { barcode } from 'ionicons/icons';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartData: any = null;
  cartStorageNme = 'barcode_cart';
  products: any[] = [...product];

  private cart$ = new BehaviorSubject<any>(null);
  private storageService = inject(StorageService);

  get cart() {
    return this.cart$.asObservable();
  }

  constructor() {
    this.getCartData()
    // this.addQuantity(this.products[0]);
  }

  async startScan(val?: number) {
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: val || 17,
        cameraDirection: 1,
      });
      console.log(result);
      return result.ScanResult;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  addItemByBarcode(barCode: string) {
    const items = this.products.find((item) => item.barcode === barCode);
    if (!items) {
      throw new Error('No Item Found!!!');
    }
    this.addQuantity(items);
  }

  addQuantity(inputItem: any) {
    console.log(inputItem);
    if (this.cartData) {
      const index = this.cartData.items.findIndex(
        (data: any) => data.items_id === inputItem.id
      );
      if (index >= 0) {
        this.cartData.items[index].quantity += 1;
      } else {
        const items = [
          {
            item_id: inputItem?.id,
            name: inputItem?.name,
            description: inputItem?.description,
            price: inputItem?.price,
            image: inputItem?.image,
            quantity: 1,
          },
        ];
        this.cartData.items.push(items);
      }
    } else {
      const items = {
        item_id: inputItem?.id,
        name: inputItem?.name,
        description: inputItem?.description,
        price: inputItem?.price,
        image: inputItem?.image,
        quantity: 1,
      };
      this.cartData = {
        items: [items],
      };
    }

    return this.calculate();
  }

  subtractQuantity(inputItem: any) {
    if (this.cartData) {
      const index = this.cartData.items.findIndex(
        (data: any) => data.items_id === inputItem.id
      );

      if(index >=0){
        if(this.cartData.items[index].quantity >0){
          this.cartData.items[index].quantity -=1;
        }
        return this.calculate();
      }
    }
    return null;
  }
  calculate() {
    const itemQuantityNotZero= this.cartData.items.filter((item:any)=> item.quantity > 0)
    
    if(itemQuantityNotZero?.length === 0){
      this.clearCart();
      return;
    }

    let totalItem= 0;
    let totalPrice= 0;

    for(const product of itemQuantityNotZero){
      totalItem += product.quantity
      totalPrice +=  product.quantity * product.price;
    }

    this.cartData= {
      ...this.cartData,
      itemQuantityNotZero,
      totalItem,
      totalPrice,
    }

    this.cart$.next(this.cartData);

    //store data//
    this.saveCartInLocal(this.cartData);

    return this.cartData;
  }

  clearCart(){
    this.storageService.removeStorage(this.cartStorageNme);
    this.cartData= null;
    this.cart$.next(null);
  }

  saveCartInLocal(data:any){
    const local= JSON.stringify(data);
    this.storageService.setStorage(this.cartStorageNme, local)
  }

  async getCartData(){
    let data= this.cart$.value;

    if(!data){
      data= await this.storageService.getStorage(this.cartStorageNme);
      console.log(data);

      if(data?.value){
        this.cartData= JSON.parse(data.value);
        console.log(this.cartData);
        this.cart$.next(this.cartData);
      }
    }
  }
}
