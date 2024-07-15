import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bagHandleOutline,
  cartOutline,
  checkmarkCircle,
  listOutline,
  scanOutline,
  barcodeOutline,
  closeOutline,
  remove,
  add,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
    cartOutline,
    scanOutline,
    listOutline,
    checkmarkCircle,
    bagHandleOutline,
    barcodeOutline,
    closeOutline,
    remove,
    add
  });}

 
    
  
}
