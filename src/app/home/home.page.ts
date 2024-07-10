import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonLabel, IonItem, IonText, IonThumbnail, IonListHeader, IonCol, IonRow, IonCard } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bagHandleOutline, cartOutline, checkmarkCircle, listOutline, scanOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCard, IonRow, IonCol, IonListHeader, IonText, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonThumbnail],
})
export class HomePage {
  constructor() {
    this.addAllIcons()
  }

  addAllIcons(){
    addIcons({cartOutline, scanOutline, listOutline, checkmarkCircle, bagHandleOutline})
  }

}
