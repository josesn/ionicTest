import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  @ViewChild('map') mapRef: ElementRef;
  map: any;
  hospedagens = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.hospedagens = this.navParams.data;
    console.log(this.hospedagens);
  }

  public displayMap() {
    let latLng = new google.maps.LatLng(-3.7317914, -38.5114384);
    
        let mapOptions = {
          center: latLng,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
  }

  public getMarkers() {
    console.log(this.hospedagens.length);
    for (let i = 0; i < this.hospedagens.length; i++) {
       this.addMarkers(this.hospedagens[i]);
    }
  }

  public addMarkers(hospedagem) {
    var position = new google.maps.LatLng(hospedagem.latitude, hospedagem.longitude);
    var HospedagemMarker = new google.maps.Marker({position: position, title: hospedagem.nome});
    console.log(hospedagem.nome);
    HospedagemMarker.setMap(this.map);
}


  //public addMarker(position, map){
    //return new google.maps.Marker({
      //position,
      //map
    //});
  //}

  ionViewDidLoad() {
    this.displayMap();
    this.getMarkers();
  }

}
