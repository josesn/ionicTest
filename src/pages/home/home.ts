import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HospedagemProvider } from '../../providers/hospedagem/hospedagem';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { MapsPage } from '../../pages/maps/maps';
import { LoginPage } from '../../pages/login/login';
import { SliderPage } from '../../pages/slider/slider';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { EmailPage } from '../../pages/email/email';
 

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
  public passeios: any [];
  public email;
  public nome;
 
  url: string;

  testCheckboxOpen: boolean;
  testCheckboxResult;

  constructor(public navCtrl: NavController,
              public hosProvider: HospedagemProvider,
              public inApp: InAppBrowser,
              public callNumber: CallNumber,
              public launchNav: LaunchNavigator,
              public alertCtrl: AlertController,
              public storage: Storage,
              public location: Geolocation) {

        this.email = "zeneto1@gmail.com";
        this.nome = 'Jose';
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

    const browser = this.inApp.create(url, '_system', options);
  }

  public openCall(telefone) { 
     
    this.hosProvider.getAllPasseio()
      .subscribe((data) => {
        this.passeios = data.lista
      })
      this.storage.get('storage').then((data) => {
        console.log(JSON.parse(data));
      })
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
        console.log(this.gastronomias);
        //this.getMarkers(this.gastronomias);
      },
      (erros) => {
        console.log('erros', erros);
      }
    )
  }

  public getPassAll() {
    if(this.storage.get('storage')) {
      this.storage.get('storage').then((data) => {
        console.log('entrei pelo storage');
        this.passeios = JSON.parse(data)
      })
    } else { 
    
        console.log('entrei pelo provider');
      
    }
  }

  public displayMap() {
    this.location.getCurrentPosition().then((resp) => {

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      
          let mapOptions = {
            center: latLng,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
          
     }).catch((error) => {
       console.log('Error getting location', error);
     });
   
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

  emailForm(hospedagem) {
    this.navCtrl.push("EmailPage", hospedagem);
  }

  //public irPaginaLogin() {
    //this.navCtrl.push(LoginPage);
  //}

  public favoritar(passeio, index) {
    var email = this.email
    var nome = this.nome
    this.hosProvider.setFavorito(passeio, email, nome)
      .subscribe ((favorito) => {
        this.passeios[index].valido = !this.passeios[index].valido;
        console.log(this.passeios[index]);
      })
  }


  ionViewDidLoad() {
    this.getHospAll();
    this.displayMap();
    console.log(this.mapRef);
    console.log('ionViewDidLoad Hospedagem');
  }

}


