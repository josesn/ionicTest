import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HospedagemProvider } from '../../providers/hospedagem/hospedagem';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { MapsPage } from '../../pages/maps/maps';

declare var google:any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapRef: ElementRef;

  public hospedagens: any [];

  url: string;

  constructor(public navCtrl: NavController,
              public hosProvider: HospedagemProvider,
              public inApp: InAppBrowser,
              public callNumber: CallNumber,
              public launchNav: LaunchNavigator) {

  }

  public openMaps(latitude, longitude) { 
    this.launchNav.navigate([latitude, longitude])
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  public openWebpage(url: string){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }

    const browser = this.inApp.create(url, '_self', options);
  }

  public openCall(telefone) {
    this.callNumber.callNumber(telefone, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

  public getHospAll() {
    
    this.hosProvider.getAllHospedagem()
    .subscribe(
      (hospedagens) => {
        this.hospedagens = hospedagens.lista;
        this.navCtrl.push(MapsPage, this.hospedagens);
        
      },
      (erros) => {
        console.log('Error', erros);
      }
    )

    
  }



  ionViewDidLoad() {
    
    console.log(this.mapRef);
    console.log('ionViewDidLoad Hospedagem');
  }

}
