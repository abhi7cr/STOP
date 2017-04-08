import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {mealtimePage} from '../mealtime/mealtime';
import { remindersPage } from '../reminders/reminders';
import { TimerPage } from '../timers/timer';
import { settingEmojiPage } from '../settingEmoji/settingEmoji';
import {AuthProviders, AngularFireAuth, AngularFire, FirebaseAuthState, AuthMethods} from 'angularfire2';


@Component({
  templateUrl: 'thisDay.html'
})
export class ThisDayPage implements OnInit {

  db:any;
  auth = this.firebase.auth.getAuth().auth;
  posts: any[] = [];
  message1:any;
  message2:any;
  message3:any;
  date: string;
  private authState: FirebaseAuthState;
  constructor(private navController: NavController,
            private firebase: AngularFire,
            public auth$: AngularFireAuth,
            private navParams: NavParams) {
    //this.initApp();
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    //   if(this.authState === null || this.authState === undefined)
    //     //this.navController.push(LoginPage);
    });
  }

  ngOnInit(){
  }

  goToMealtime() {
    this.navController.push(mealtimePage);
  }
  goToReminder() {
    this.navController.push(remindersPage);
  }
  goToTimer() {
    this.navController.push(TimerPage);
  }
  goToEmoji() {
    this.navController.push(settingEmojiPage);
  }

  viewActivity() {
    var currentUser = this.authState.auth.uid;
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
    this.message2 = str2;
    this.message3 = str3;
  }

  parseResponse(response)
  {   
    this.posts = response;
    this.viewActivity();
  }

  ionViewWillEnter(){
      this.date =  this.navParams.get("param1").date;
      let timeInMilliseconds = new Date(Number(this.date.split('-')[0]),
                                        Number(this.date.split('-')[1]),
                                        Number(this.date.split('-')[2]));
      this.fetchLogs(timeInMilliseconds.valueOf());
  }

  fetchLogs(ms: number) {  
        var uid = this.authState.auth.uid;
        let oneDayInMs:number = 3600*1000*24;
        let nextDayinMs:number = ms + oneDayInMs;
        var ref = this.firebase.database.list('logs/'+ uid, 
          { 
            query: {
            orderByChild: 'date',
            startAt: ms,
            endAt: nextDayinMs
          }
        });
        ref.subscribe(result => this.parseResponse(result));    
    }

}