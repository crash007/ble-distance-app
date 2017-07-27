import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {DataHelper} from '../pages/home/dataHelper';
//import { ScannerProvider } from '../providers/scanner/scanner';
//importDataHelperProvider } from '../prdataHelperers/scanner/scanner';
import { BLE } from '@ionic-native/ble';
import { ScannerProvider } from "../providers/scanner/scanner";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    DataHelper,
    StatusBar,
    SplashScreen,
    DataHelper,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScannerProvider,
    BLE
  ]
})
export class AppModule {}
