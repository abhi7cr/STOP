import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { currentTimersPage } from '../currentTimers/currentTimers';

@Component({
  selector: 'page-timers',
  templateUrl: 'build/pages/timers/timers.html'
})
export class timersPage {

  constructor(public navCtrl: NavController) {
  	this.navCtrl = navCtrl;
  }

  goToCurrentTimers() {
    this.navCtrl.push(currentTimersPage);
  }
}