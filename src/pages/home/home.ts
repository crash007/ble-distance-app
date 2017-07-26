import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { ScannerProvider } from '../../providers/scanner/scanner'
import { BLE } from '@ionic-native/ble';
import { ScannerProvider } from "../../providers/scanner/scanner";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  devices: any[] = [];
  value: any;
  constructor(public navCtrl: NavController, private ble: BLE, private scannerProvider: ScannerProvider) {

  }

  ionViewDidLoad() {
    this.bleScanning();
  }

  bleScanning() {
    console.log("start scanning");
    this.scannerProvider.getBle().subscribe(temp => {
      this.devices.push(temp.id);
      console.log(temp) //Hur ser detta ut?
      if (temp.name == "PeWe") {
        console.log("Found PeWe device");
        let adData = temp.advertising;
        
        console.log(new Uint8Array(temp.advertising));
        this.value = this.scannerProvider.ready(adData);    
        console.log(this.value);
      }
    })
  }

}
