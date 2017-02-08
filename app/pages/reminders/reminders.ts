import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { currentRemindersPage } from '../currentReminders/currentReminders';

@Component({
  templateUrl: 'build/pages/reminders/reminders.html'
})


export class remindersPage {

  constructor(private navCtrl: NavController) {
    this.navCtrl = navCtrl;

  }

  goToCurrentReminder() {
    this.navCtrl.push(currentRemindersPage);
  }

}
