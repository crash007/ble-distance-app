import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BLE } from '@ionic-native/ble';

/*
  Generated class for the ScannerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ScannerProvider {

  constructor(public ble: BLE) {
    console.log('Hello ScannerProvider Provider');
  }

  getBle() {
    return this.ble.scan([], 15);
  }

  ready(adData: any) {    
    var dv = new DataView(adData, 15);
    //const buf = Buffer.from([adData[11], adData[12], adData[13], adData[14]]);
    //TODO fixa sen.
    
    return dv.getInt32(0,true);    
  }
}
