import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';

import { IonicStorageModule } from '@ionic/storage';

import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapsPage } from '../pages/maps/maps';
import { LoginPage } from '../pages/login/login';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

import { Facebook } from '@ionic-native/facebook'; 


import { MattDamon } from './pipes/matt-damon';

import { HospedagemProvider } from '../providers/hospedagem/hospedagem';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MattDamon,
    MapsPage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapsPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HospedagemProvider,
    InAppBrowser,
    CallNumber,
    LaunchNavigator,
    Facebook,
    NativeStorage,
    Geolocation,
  ]
})
export class AppModule {}
