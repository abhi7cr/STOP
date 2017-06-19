import { Component, OnInit } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { currentRemindersPage } from '../currentReminders/currentReminders';

import { LocalNotifications } from 'ionic-native';
import {AngularFire, FirebaseAuthState, AngularFireAuth} from 'angularfire2';
//import * as moment from 'moment';

//declare var firebase:any;

@Component({
  templateUrl: 'reminders.html'
})


export class remindersPage implements OnInit {

  private authState: FirebaseAuthState;
  constructor(private navController: NavController,
            private firebase: AngularFire,
            public auth$: AngularFireAuth) {
    //this.initApp();
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  myReminder1:any=null;
  myReminder2:any=null;
  notifications: any[] = [];
  db:any;
  ref:any;

  //notifyTime: any;
  //notifications: any[] = [];
  //chosenHours: number;
  //chosenMinutes: number;

  ngOnInit(){
    this.updateInfo();
  }

  goToCurrentReminder() {
    this.navController.push(currentRemindersPage, {
    	param1: this.myReminder1, param2: this.myReminder2
    	});
  }

  //timeChange(time) {
        //this.chosenHours = time.hour.value;
        //this.chosenMinutes = time.minute.value;
  //}


  updateInfo() {
      this.db = this.firebase.database;
      this.ref = this.db.object('/reminderSetting/'+this.authState.auth.uid, {preserveSnapshot: true});
      this.ref.subscribe(snapshot => {
        this.myReminder1 = snapshot.child('reminder1').val();
        this.myReminder2 = snapshot.child('reminder2').val();
        //this.updateLocalNotifications();
      });
   
      
  }

  parseResponse(response: any)
  {
      alert("Your reminder has been set!");     
      this.updateLocalNotifications();
  }

  handleError(error: any)
  {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error setting reminder:" + error.message);
 }

  submit() {
      this.db = this.firebase.database;
      this.db.object('reminderSetting/'+ this.authState.auth.uid).set({
        reminder1: this.myReminder1 == null? "":this.myReminder1,
        reminder2: this.myReminder2 == null? "":this.myReminder2
      }).then(result => this.parseResponse(result)).catch(this.handleError);

    }

    updateLocalNotifications() {
       //reminder notifications
      let currentDate = new Date(); // Sunday = 0, Monday = 1, etc.
     
      let firstNotificationTime = new Date();
      let secondNotificationTime = new Date();
      let hourMinute1 = this.myReminder1.split(':');
      let hour1 = hourMinute1[0];
      let minute1 = hourMinute1[1];
      firstNotificationTime.setHours(hour1);
      firstNotificationTime.setMinutes(minute1);
      let hourMinute2 = this.myReminder2.split(':');
      let hour2 = hourMinute2[0];
      let minute2 = hourMinute2[1];
      secondNotificationTime.setHours(hour2);
      secondNotificationTime.setMinutes(minute2);

       alert(firstNotificationTime.toLocaleString() + "," + secondNotificationTime.toLocaleString());
     
       let notification1 = {
                    id: this.myReminder1,
                    title: 'Hey!',
                    text: 'This is your reminder to go to the toilet',
                    at: firstNotificationTime,
                    every: 'week'
        };
     
         let notification2 = {
                    id: this.myReminder2,
                    title: 'Hey!',
                    text: 'This is your reminder to go to the toilet',
                    at: secondNotificationTime,
                    every: 'week'
        };

        this.notifications.push(notification1);
        this.notifications.push(notification2);
     
        console.log("Notifications to be scheduled: ", this.notifications);
        LocalNotifications.schedule(this.notifications);
    }

}
