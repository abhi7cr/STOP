import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-reminders',
  templateUrl: 'build/pages/reminders/reminders.html'
})
export class remindersPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello reminders Page');
  }
}