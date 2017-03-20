import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {mealtimePage} from '../mealtime/mealtime';
import { remindersPage } from '../reminders/reminders';
import { TimerPage } from '../timers/timer';
import { settingEmojiPage } from '../settingEmoji/settingEmoji';

declare var firebase: any;

@Component({
  selector: 'page-timers',
  templateUrl: 'build/pages/thisDay/thisDay.html'
})
export class thisDayPage {

  db:any;
  auth = firebase.auth();
  posts: any[] = [];
  message1:any;
  message2:any;
  message3:any;

  constructor(public navCtrl: NavController, navParams: NavParams) {
  	this.navCtrl = navCtrl;
  }

  goToMealtime() {
    this.navCtrl.push(mealtimePage);
  }
  goToReminder() {
    this.navCtrl.push(remindersPage);
  }
  goToTimer() {
    this.navCtrl.push(TimerPage);
  }
  goToEmoji() {
    this.navCtrl.push(settingEmojiPage);
  }

  viewActivity() {
    var currentUser = firebase.auth().currentUser; 
    var str1='';
    var str2=''; 
    var str3='';
    for(var i in this.posts)
    {
              // if(date.getFullYear() == this.currentYear)

            if(!this.posts[i].dose)
            {
              str1='Cool! You\'ve not used a dose softner.';
            }   
            if(this.posts[i].sit)
            {
              str2='Great! You\'ve tried to sit down at '+this.posts[i].time+'!';
            }
            if(this.posts[i].stool)
            {
              str3='Excellent! You\'ve produced a stool of type '+this.posts[i].stoolType+'!';
            }
          // }
      
    }
    this.message1 = str1;
    console.log(str1);
    this.message2 = str2;
    console.log(str2);
    this.message3 = str3;
    console.log(str3);
  }

  parseResponse(response)
  {   
    this.posts = response.val();

  }

  ionViewWillEnter(){
      this.fetchLogs();
  }

  fetchLogs() {

      if(firebase.auth().currentUser != null)
      {
        var user = firebase.auth().currentUser;
        var ref = firebase.database().ref('logs').orderByChild('uid').equalTo(user.uid);
        ref.once("value").then(result => this.parseResponse(result));
      }
    }

}