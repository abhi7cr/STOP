import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-reminder',
  templateUrl: 'build/pages/mealtime/mealtime.html'
})


export class remindersPage {

  constructor(public navCtrl: NavController) {
    this.navCtrl = navCtrl;

  }


}