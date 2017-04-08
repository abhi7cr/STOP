import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { currentMealtimePage } from '../currentMealtime/currentMealtime';
import {AngularFire, FirebaseAuthState, AngularFireAuth} from 'angularfire2';

@Component({
  templateUrl: 'mealtime.html'
})
export class mealtimePage {

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

  myMealtime1:any=null;
  myMealtime2:any=null;
  db:any;
  ref:any;
  auth = this.firebase.auth;

  ngOnInit(){
    this.updateInfo();
  }

  updateInfo() {
      this.db = this.firebase.database;
      this.ref = this.db.object('/mealtimeSetting/'+this.authState.auth.uid, {preserveSnapshot: true});
      this.ref.subscribe(snapshot => {
        this.myMealtime1 = snapshot.child('mealTime1').val();;
        this.myMealtime2 = snapshot.child('mealTime2').val();;
      });
  }

  submit2() {
      this.db = this.firebase.database;
      this.db.object('mealtimeSetting/'+this.authState.auth.uid).set({
        mealTime1: this.myMealtime1 == null? "":this.myMealtime1,
        mealTime2: this.myMealtime2 == null? "":this.myMealtime2
      }).then(result => this.parseResponse(result)).catch(this.handleError);

    }

   parseResponse(response: any)
  {
      alert("Your Mealtime has been set!");     
  }

  handleError(error: any)
  {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error setting mealtime:" + error.message);
}
}



