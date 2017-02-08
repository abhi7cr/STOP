import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {mealtimePage} from '../mealtime/mealtime';
import { remindersPage } from '../reminders/reminders';
import { timersPage } from '../timers/timers';
import { settingEmojiPage } from '../settingEmoji/settingEmoji';

@Component({
  selector: 'page-timers',
  templateUrl: 'build/pages/thisDay/thisDay.html'
})
export class thisDayPage {

  constructor(public navCtrl: NavController) {
  	this.navCtrl = navCtrl;
  }

  goToMealtime() {
    this.navCtrl.push(mealtimePage);
  }
  goToReminder() {
    this.navCtrl.push(remindersPage);
  }
  goToTimer() {
    this.navCtrl.push(timersPage);
  }
  goToEmoji() {
    this.navCtrl.push(settingEmojiPage);
  }

}