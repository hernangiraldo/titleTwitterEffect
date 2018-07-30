import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getCoins() {
    this.http.get('https://next.json-generator.com/api/json/get/EkyciTxEH').subscribe(
      coins => {
        console.log(JSON.stringify(coins));
      },
      error => {
        console.error(JSON.stringify(error))
      }
    );
  }

}
