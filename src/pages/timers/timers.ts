import {Component, Input, AfterViewInit } from '@angular/core';
import {ITimer} from './itimer';


@Component({
    selector: 'stopTimer',
    templateUrl: 'timer.html'
})
export class TimerComponent implements AfterViewInit {

    @Input() timeInSeconds: number;
    @Input() test: string;
    public timer: ITimer;

    constructor(
    ) {
    }

    ngAfterViewInit(){

    }

    ngOnInit() {
        this.initTimer();
    }

    hasFinished() {
        return this.timer.hasFinished;
    }

    updateTimer() {
      this.initTimer();
    }

    initTimer() {
        if(!this.timeInSeconds) { this.timeInSeconds = 60; }

        this.timer = <ITimer>{
            seconds: this.timeInSeconds,
            runTimer: false,
            hasStarted: false,
            hasFinished: false,
            secondsRemaining: this.timeInSeconds
        };

        this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
    }

    startTimer() {
        this.timer.hasStarted = true;
        this.timer.runTimer = true;
        this.timerTick();
    }

    pauseTimer() {
        this.timer.runTimer = false;
    }

    resumeTimer() {
        this.startTimer();
    }

    timerTick() {
        setTimeout(() => {
            if (!this.timer.runTimer) { return; }
            this.timer.secondsRemaining--;
            this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
            if (this.timer.secondsRemaining > 0) {
                this.timerTick();
            }
            else {
                this.timer.hasFinished = true;
            }
        }, 1000);
    }

    getSecondsAsDigitalClock(inputSeconds: number) {
        var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString = '';
        hoursString = (hours < 10) ? "0" + hours : hours.toString();
        minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
        secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
        return hoursString + ':' + minutesString + ':' + secondsString;
    }
    
}








// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
// import { currentTimersPage } from '../currentTimers/currentTimers';

// declare var firebase:any;

// @Component({
//   selector: 'page-timers',
//   templateUrl: 'build/pages/timers/timers.html'
// })
// export class timersPage {

//   constructor(public navCtrl: NavController) {
//   	this.navCtrl = navCtrl;
//   }

//   mytimerStart1:any=null;
//   mytimerStart2:any=null;
//   mytimerEnd1:any=null;
//   mytimerEnd2:any=null;
//   db:any;
//   ref:any;
//   auth = firebase.auth();

//   goToCurrentTimers() {
//     this.navCtrl.push(currentTimersPage, {
//     	param1: this.mytimerStart1, param2: this.mytimerEnd1, param3: this.mytimerStart2, param4: this.mytimerEnd2
//     	});
//   }

//   updateInfo() {
//       var info1;
//       var info2;
//       var info3;
//       var info4;
//       this.db = firebase.database();
//       this.ref = this.db.ref('/timerSetting/'+this.auth.currentUser.uid);
//       this.ref.on('value', function(snapshot){
//         info1 = snapshot.child('Starter1').val();
//         info2 = snapshot.child('Ender1').val();
//         info3 = snapshot.child('Starter2').val();
//         info4 = snapshot.child('Ender2').val();

//       });
//       this.mytimerStart1 = info1;
//       //console.log(this.myMealtime1);
//       this.mytimerEnd1 = info2;
//       this.mytimerStart2 = info3;
//       this.mytimerEnd2 = info4;

//   }

//     submit() {
//       this.db = firebase.database();
//       this.db.ref('timerSetting').child(this.auth.currentUser.uid).set({
//         Starter1: this.mytimerStart1 == null? "":this.mytimerStart1,
//         Ender1: this.mytimerEnd1 == null? "":this.mytimerEnd1,
//         Starter2: this.mytimerStart2 == null? "":this.mytimerStart2,
//         Ender2: this.mytimerEnd2 == null? "":this.mytimerEnd2
//       }).then(result => this.parseResponse(result)).catch(this.handleError);
//     }

//   parseResponse(response: any)
//   {
//       alert("Your timers have been set!");     
//   }

//   handleError(error: any)
//   {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       alert("Error setting timer:" + error.message);

//   };

// }