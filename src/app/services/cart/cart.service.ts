import { inject, Injectable } from '@angular/core';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { product } from 'src/app/data/products';
import { barcode } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartData:any = null;
  cartStorageNme= 'barcode_cart';
  products:any[]= [...product]

  private cart$= new BehaviorSubject<any>(null)
  private storageService= inject(StorageService);

  get cart(){
    return this.cart$.asObservable();
  }

  constructor() { }

  async startScan(val?:number){
    try {
      const result= await CapacitorBarcodeScanner.scanBarcode({
        hint: val || 17,
        cameraDirection: 1,
      })
      console.log(result)
      return result.ScanResult;
      
    } catch (error:any) {
      throw new Error(error);
    }
  }

  addItemByBarcode(barCode:string){
    const items= this.products.find(item=>item.barcode === barCode);
    if(!items){
      throw 'No Item Found!!!'
    }
    this.addQuantity(items);
  }

  addQuantity(items:any){
    
  }
}
