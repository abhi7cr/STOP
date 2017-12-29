import { Component, OnInit } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { currentRemindersPage } from '../currentReminders/currentReminders';
import { HomePage } from '../home/home';
import { NewHomePage } from '../newHome/newHome';
//import {AngularFire, FirebaseAuthState, AngularFireAuth} from 'angularfire2';
//import * as moment from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

//declare var firebase:any;

@Component({
  templateUrl: 'reminders.html'
})


export class remindersPage implements OnInit {

  private authState;
  private auth;
  constructor(private navController: NavController,
            public auth$: AngularFireAuth,
            public db:AngularFireDatabase,
            private _platform: Platform) {
    this.authState = auth$.authState;
    this.authState.subscribe((state) => {
      this.auth = state;
    });
  }

  myReminder1:any=null;
  myReminder2:any=null;
  notifications: any[] = [];
  ref:any;
  reminderText: string = 'Reminder to go to the toilet and complete questionnare!';

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
      this.ref = this.db.object('/reminderSetting/'+this.auth.uid, {preserveSnapshot: true});
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
      this.db.object('reminderSetting/'+ this.auth.uid).set({
        reminder1: this.myReminder1 == null? "":this.myReminder1,
        reminder2: this.myReminder2 == null? "":this.myReminder2,
        timeZoneOffset: new Date().getTimezoneOffset() / 60
      }).then(result => this.parseResponse(result)).catch(this.handleError);

    }

    updateLocalNotifications() {
       //reminder notifications
  

      // setTimeout(function(){
      //   var en = new Notification('Hey!', { 
      //     body: this.reminderText,
      //     icon: '../assets/images/STOP_FINAL.png' 
      //    });
      //   en.onshow = function() { 
      //     setTimeout(en.close, ms)
      //     setInterval(function(){
      //       var en = new Notification('Hey!', { 
      //         body: this.reminderText,
      //         icon: '../assets/images/STOP_FINAL.png' 
      //       });
      //       en.onshow = function() { 
      //         setTimeout(en.close, ms)
      //        }
      //      }, 60*60*1000*24)
      //     }
      // }, <any>(firstNotificationTime) - <any>(now));

      // setTimeout(function(){
      //   var en = new Notification('Hey!', { 
      //     body: this.reminderText,
      //     icon: '../assets/images/STOP_FINAL.png' 
      //    });
      //   en.onshow = function() {
      //    setTimeout(en.close, ms)
      //      setInterval(function(){
      //       var en = new Notification('Hey!', { 
      //         body: this.reminderText,
      //         icon: '../assets/images/STOP_FINAL.png' 
      //       });
      //       en.onshow = function() { 
      //         setTimeout(en.close, ms)
      //        }
      //      },  60*60*1000*24)
      //     }
      // }, <any>(secondNotificationTime) - <any>(now));

       //alert("Your first reminder will be at: " + firstNotificationTime.toLocaleString() + ", and your second reminder will be at: " + secondNotificationTime.toLocaleString())
     
        // console.log("Notifications to be scheduled: ", this.notifications);
        // this.localNotifications.cancelAll().then(() => {
        // this.localNotifications.schedule(this.notifications);
        // this.notifications = [];
        // this.localNotifications.on('click', () => {
        //     let activeComponent = this.navController.getActive().component.name;
        //     if(activeComponent !== 'NewHomePage')
        //       this.navController.setRoot(NewHomePage);
        // });
      }

}
