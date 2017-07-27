import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
//import { ScannerProvider } from '../../providers/scanner/scanner'
import { BLE } from '@ionic-native/ble';
import { ScannerProvider } from "../../providers/scanner/scanner";
import {Chart} from 'chart.js';
import {DataHelper} from './dataHelper'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('distanceCanvas')distanceCanvas;
  someChart:any;
  devices: any[] = [];
  value: any;
  loader:any;



  constructor(public dataHelper:DataHelper, public loadingCtrl:LoadingController, 
    public navCtrl: NavController, private scannerProvider: ScannerProvider) {
    
  }

  loadingDialog(){
    this.loader = this.loadingCtrl.create({
      content:"Scanning for PeWe..."
      
    });
    this.loader.present();
  }

  ionViewDidLoad() {
  
  }

 

  bleScanning() {
    this.loadingDialog();
    this.devices = [];
    //console.log("start scanning");
    this.scannerProvider.getBle().subscribe(temp => {
      this.devices.push(temp.id);
      //console.log(temp) //Hur ser detta ut?
      if (temp.name == "PeWe") {
        
        this.dataChart();
        
        this.loader.dismiss();
        console.log("Found PeWe device");
        let adData = temp.advertising;
        
        //console.log(new Uint8Array(temp.advertising));
        this.value = this.scannerProvider.ready(adData);        
        //console.log(this.value);
       
        this.distanceCanvas.data.datasets[0].data[0] = this.value;
        this.distanceCanvas.update();
        
        
      }
    })
  }
//Added chart js simple horizontal bar
  dataChart(){
     this.distanceCanvas = new Chart(this.distanceCanvas.nativeElement,{
      type:'horizontalBar',
      data:{
        labels:["CM"],
        datasets:[{
          label:'Distance',
          data:[0],
          backgroundColor:[
              'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
          ],
                  borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                      borderWidth:1     
        }]
      },
      options:{
        scales:{
          xAxes:[{
            ticks:{
              beginAtZero:true
            }
          }]
        }
      }
    });
 
  }

}
