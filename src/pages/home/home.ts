import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HospedagemProvider } from '../../providers/hospedagem/hospedagem';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { MapsPage } from '../../pages/maps/maps';
import { LoginPage } from '../../pages/login/login';
import { SliderPage } from '../../pages/slider/slider';

declare var google:any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapRef: ElementRef;

  map: any;
  
  
  public hospedagens: any [];
  public gastronomias: any [];
 
  url: string;

  testCheckboxOpen: boolean;
  testCheckboxResult;

  constructor(public navCtrl: NavController,
              public hosProvider: HospedagemProvider,
              public inApp: InAppBrowser,
              public callNumber: CallNumber,
              public launchNav: LaunchNavigator,
              public alertCtrl: AlertController) {

  }

  
  public showCheckBox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('O que deseja visualizar?');

    alert.addInput({
      type: 'checkbox',
      label: 'Hospedagem',
      value: 'value1',
      
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Gastronomia',
      value: 'value2'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Eventos',
      value: 'value3'
    });

    alert.addButton('Sair');
    alert.addButton({
      text: 'Buscar',
      handler: data  => { 
        console.log(data);
        if (data == 'value1') {
          this.getHospAll();
        } else if (data == 'value2') {
          this.getGasAll();
        } else if (data == 'value3') {
          console.log('Checkbox data:', data);
          this.testCheckboxOpen = false;
          this.testCheckboxResult = data;
        }
      }
    });
    alert.present();
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
        //this.getMarkers(this.hospedagens);
      },
      (erros) => {
        console.log('Error', erros);
      }
    ) 
  }

  public getGasAll() {
    this.hosProvider.getAllGastro()
    .subscribe(
      (gastronomias) => {
        this.gastronomias = gastronomias.lista;
        //this.getMarkers(this.gastronomias);
      },
      (erros) => {
        console.log('erros', erros);
      }
    )
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

  public getMarkers(selecionado) {
    console.log(selecionado);
    console.log(selecionado.length);
    for (let i = 0; i < selecionado.length; i++) {
       
       this.addMarkers(selecionado[i]);
    }
  }

  public addMarkers(selecionado) {
    
    var position = new google.maps.LatLng(selecionado.latitude, selecionado.longitude);
    var selecMarker = new google.maps.Marker({position: position, title: selecionado.nome});
    
    google.maps.event.addListener(selecMarker, 'click', (function(selecMarker) {
      return function() {
        var infowindow = new google.maps.InfoWindow();
        infowindow.setContent(selecionado.nome);        
        infowindow.open(this.map, selecMarker);
        selecMarker.setMap(this.map);
      }
    })(selecMarker));
    console.log(selecionado.nome);
    selecMarker.setMap(this.map);
    
  }


  openSlider(hospedagem) {
    this.navCtrl.push("SliderPage", hospedagem);
  }

  //public irPaginaLogin() {
    //this.navCtrl.push(LoginPage);
  //}

  public favoritar(id, hospedagem, index, email) {
          console.log(id);
          this.hosProvider.setFavorito(id, email)
          .subscribe ((favorito) => {
            this.hospedagens[index].valido = !this.hospedagens[index].valido;
            console.log(this.hospedagens[index]);
          })
          
    
  }



  ionViewDidLoad() {
    this.getHospAll();
    //this.displayMap();
    console.log(this.mapRef);
    console.log('ionViewDidLoad Hospedagem');
  }

}


