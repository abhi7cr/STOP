import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-help',
  templateUrl: 'build/pages/help/help.html'
})
export class helpPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello help Page');
  }
}