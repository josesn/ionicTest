import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HospedagemProvider } from '../../providers/hospedagem/hospedagem';

/**
 * Generated class for the EmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
})
export class EmailPage {

  public detalhes: any;

  time: any;
  timeMin: any = 0;
  timeMax: any = 5;
  timeMin2: any;
  timeMax2: any;
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public hospProvider: HospedagemProvider) {

                this.timeMin2 = this.timeMin;
                this.timeMax2 = this.timeMax;
    
  }

  emailForm(nome, sobrenome, tel, entrada, saida, adulto, crianca, obs, emaildestino) {
      emaildestino = this.navParams.data.email
      this.hospProvider.setContato(nome, sobrenome, tel, entrada, saida, adulto, crianca, obs, emaildestino)
        .subscribe((formulario) => {
            console.log(formulario);
        })
  }

  setBadge(time) {
    this.timeMin2 = time.lower;
    this.timeMax2 = time.upper;
}

  

  ionViewDidLoad() {
    this.detalhes = this.navParams.data;
    console.log('ionViewDidLoad EmailPage');
  }



}
