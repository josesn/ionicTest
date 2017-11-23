import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Storage } from '@ionic/storage';


import 'rxjs/add/operator/map';

/*
  Generated class for the HospedagemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HospedagemProvider {


  private urlBase = 'http://localhost:8000'
  private urlHosp = '/hospedagem'
  private urlGas = '/gastronomia'
  private urlPass = '/passeio'
  private urlFav = '/favoritar/'

  private headers: Headers;
  private options: RequestOptions;

  public teste: any [];
  public passeios: any [];

  constructor(public http: Http,
              public storage: Storage) {
    console.log('Hello HospedagemProvider Provider');
    this.headers = new Headers();   
    this.headers.append("Accept", "application/json");
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', `Token f75da6351f4907fa1099dd59b8b016e0d436219b`);
    this.options = new RequestOptions({headers: this.headers});
    
  }

  public getAllHospedagem(): Observable<any> {
    let url = this.urlBase + this.urlHosp
    return this.http.get(url)
            .map(this.dataHandler)
            
  }

  public getAllGastro(): Observable<any> {
    let url = this.urlBase + this.urlGas
    return this.http.get(url)
            .map(this.dataHandler2)
  }

  public getAllPasseio(): Observable<any> {
    let url = this.urlBase + this.urlPass
    return this.http.get(url)
            .map(this.dataHandler3)
  }

  setFavorito(id, email, nome) {
    let params = {
      id_passeio: id,
      email: email,
      nome: nome,
    }
    let url = this.urlBase + this.urlPass + this.urlFav
    return this.http.post(url, params, this.options)
      .map(this.dataHandlerPost)
      
  }

  private dataHandlerPost (res: Response) {
    
    let resp = res.json()
    let id_favorito = resp.id_favorito
    
    console.log(id_favorito);
    return resp;
    
  }

  public dataHandler (res: Response) {
    let hosp = res.json();

    return {lista: hosp};
  }

  

  public dataHandler2(res: Response) {
    let gas = res.json();
    return {lista: gas};
  }

  public dataHandler3(res: Response){
    let pass = res.json();
    console.log(pass);
    this.passeios = pass;
    
    return {lista: pass}
    
  }

}
