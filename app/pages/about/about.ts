import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'build/pages/about/about.html'
})
export class aboutPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
  }
}