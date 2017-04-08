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
      });
   

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
      this.db.object('reminderSetting/'+ this.authState.auth.uid).set({
        reminder1: this.myReminder1 == null? "":this.myReminder1,
        reminder2: this.myReminder2 == null? "":this.myReminder2
      }).then(result => this.parseResponse(result)).catch(this.handleError);

    }

}
