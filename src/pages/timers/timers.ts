import {Component, Input, AfterViewInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ITimer} from './itimer';
//import {AuthProviders, AngularFireAuth, AngularFire, FirebaseAuthState, AuthMethods} from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'stopTimer',
    templateUrl: 'timer.html'
})
export class TimerComponent implements AfterViewInit {

    @Input() timeInSeconds: number;
    @Input() test: string;
    public timer: ITimer;
    public timeToSave: number = 0;
     private authState;
  constructor(private navController: NavController,
            public db: AngularFireDatabase,
            public auth$: AngularFireAuth) {
    //this.initApp();
    this.authState = auth$.authState;
    // auth$.subscribe((state: FirebaseAuthState) => {
    //   this.authState = state;
    // });
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

    stopTimer() {
        this.timeToSave = this.timeInSeconds - this.timer.secondsRemaining;
        this.initTimer();
    }

    submit() {
     
     
       this.db.list('timer/'+ this.authState.auth.uid).push({
        seconds:  this.timeToSave
      }).then(result => this.parseResponse(result)).catch(this.handleError);
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

    parseResponse(response: any)
      {
          alert("Your Time has been saved!");     
      }

  handleError(error: any)
  {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error saving time:" + error.message);

  }

    startTimer() {
        this.timeToSave = 0;
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
                this.timeInSeconds = this.timeInSeconds;
                let audio = <HTMLAudioElement>(document.getElementById('timerBuzz'))
                audio.play();
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
