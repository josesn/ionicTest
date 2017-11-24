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
  private urlCont = '/contato/'

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
    this.headers.append('Authorization', `Token b1433a579e9b6d45a6a8a19f577879266db4201f`);
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

  setContato(nome, email, tel, entrada, saida, adulto, crianca, obs, emaildestino) {
    console.log(nome, email, tel, entrada, saida, adulto, crianca, obs, emaildestino);
    let params = {
      emaildestino: emaildestino,
      nome: nome,
      email: email,
      telefone: tel,
      entrada: entrada,
      saida: saida,
      adulto: adulto,
      crianca: crianca,
      obs: obs,
     
      
    }
    let url = this.urlBase + this.urlHosp + this.urlCont
    return this.http.post(url, params, this.options)
      .map(this.dataHandlerPost)
     
      
  }

  private dataHandlerPost (res: Response) {
    
    let resp = res.json()
    console.log(resp);
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
