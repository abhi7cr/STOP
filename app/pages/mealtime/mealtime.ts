import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'build/pages/mealtime/mealtime.html'
})


export class mealtimePage {

  constructor(private navCtrl: NavController) {
    this.navCtrl = navCtrl;

  }

  goToDetails() {
    this.navCtrl.push(HomePage);
  }

}
