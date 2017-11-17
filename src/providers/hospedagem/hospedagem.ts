import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';

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
  private urlFav = '/favoritar/'

  private headers: Headers;
  private options: RequestOptions;

  constructor(public http: Http) {
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

  setFavorito(id, email) {
    let params = {id_hospedagem: id}
    console.log(id);
    let url = this.urlBase + this.urlHosp + this.urlFav
    console.log(url);
    return this.http.post(url, params, this.options)
      .map(this.dataHandlerPost)
      
  }

  private dataHandlerPost (res: Response) {
    console.log(res);
    return res.json();
  }

  public dataHandler (res: Response) {
    let hosp = res.json();
    return {lista: hosp};
  }

  public getAllGastro(): Observable<any> {
    let url = this.urlBase + this.urlGas
    return this.http.get(url)
            .map(this.dataHandler2)
  }

  public dataHandler2(res: Response) {
    let gas = res.json();
    return {lista: gas};
  }

}
