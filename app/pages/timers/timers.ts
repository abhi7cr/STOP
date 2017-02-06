import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-timers',
  templateUrl: 'build/pages/timers/timers.html'
})
export class timersPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello timers Page');
  }
}