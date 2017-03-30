import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { currentRemindersPage } from '../currentReminders/currentReminders';

import { LocalNotifications } from 'ionic-native';
import {AngularFire} from 'angularfire2';
//import * as moment from 'moment';

//declare var firebase:any;

@Component({
  templateUrl: 'reminders.html'
})


export class remindersPage {

  constructor(private navCtrl: NavController,
     public platform: Platform,
      navParams: NavParams,
      private firebase: AngularFire) {
    this.navCtrl = navCtrl;

    //this.chosenHours = new Date().getHours();
    //this.chosenMinutes = new Date().getMinutes();
    //this.myReminder1 = moment(new Date()).format();

  }

  myReminder1:any=null;
  myReminder2:any=null;
  db:any;
  auth = this.firebase.auth.getAuth().uid;
  ref:any;

  //notifyTime: any;
  //notifications: any[] = [];
  //chosenHours: number;
  //chosenMinutes: number;

  goToCurrentReminder() {
    this.navCtrl.push(currentRemindersPage, {
    	param1: this.myReminder1, param2: this.myReminder2
    	});
  }

  //timeChange(time) {
        //this.chosenHours = time.hour.value;
        //this.chosenMinutes = time.minute.value;
  //}


  updateInfo() {
      var info1;
      var info2;
      this.db = this.firebase.database;
      this.ref = this.db.object('/reminderSetting/'+this.auth);
      this.ref.on('value', function(snapshot){
        info1 = snapshot.child('reminder1').val();
        info2 = snapshot.child('reminder2').val();

      });
      this.myReminder1 = info1;
      //console.log(this.myMealtime1);
      this.myReminder2 = info2;

      //reminder notifications
      //let currentDate = new Date(); // Sunday = 0, Monday = 1, etc.
     
                //let firstNotificationTime = new Date();

                //firstNotificationTime.setHours(this.chosenHours);
                //firstNotificationTime.setMinutes(this.chosenMinutes);
     
                //let notification = {
                    //id: day.dayCode,
                    //title: 'Hey!',
                    //text: 'You just got notified :)',
                    //at: firstNotificationTime,
                    //every: 'week'
                //};
     
                //this.notifications.push(notification);
     
        //console.log("Notifications to be scheduled: ", this.notifications);
        //LocalNotifications.schedule(this.notifications);

  }

  parseResponse(response: any)
  {
      alert("Your reminder has been set!");     
  }

  handleError(error: any)
  {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error setting reminder:" + error.message);
 }

  submit() {
      this.db = this.firebase.database;
      this.db.object('reminderSetting/'+ this.auth).set({
        reminder1: this.myReminder1 == null? "":this.myReminder1,
        reminder2: this.myReminder2 == null? "":this.myReminder2
      }).then(result => this.parseResponse(result)).catch(this.handleError);

    }

}
