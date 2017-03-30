import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {mealtimePage} from '../mealtime/mealtime';
import { remindersPage } from '../reminders/reminders';
import { TimerPage } from '../timers/timer';
import { settingEmojiPage } from '../settingEmoji/settingEmoji';
import {AngularFire} from 'angularfire2';

@Component({
  templateUrl: 'thisDay.html'
})
export class thisDayPage {

  db:any;
  auth = this.firebase.auth.getAuth().auth;
  posts: any[] = [];
  message1:any;
  message2:any;
  message3:any;

  constructor(public navCtrl: NavController,
         private navParams: NavParams,
         private firebase: AngularFire
         ) {
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
    var currentUser = this.firebase.auth.getAuth().auth;
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

      if(this.firebase.auth.getAuth().auth != null)
      {
        var uid = this.firebase.auth.getAuth().uid;
        var ref = this.firebase.database.list('logs', {query:{
                    orderByChild: uid}});
        ref.subscribe(result => this.parseResponse(result));
      }
    }

}