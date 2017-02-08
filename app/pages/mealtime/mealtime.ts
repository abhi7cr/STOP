import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { currentMealtimePage } from '../currentMealtime/currentMealtime';

@Component({
  templateUrl: 'build/pages/mealtime/mealtime.html'
})


export class mealtimePage {

  constructor(private navCtrl: NavController) {
    this.navCtrl = navCtrl;

  }

  goToDetails() {
    this.navCtrl.push(currentMealtimePage);
  }

}
