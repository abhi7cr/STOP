import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/settingEmoji/settingEmoji.html'
})


export class settingEmojiPage {

  constructor(private navCtrl: NavController) {
    this.navCtrl = navCtrl;

  }

  infoWin() {
    alert("Thank you!");
  }

}
