import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import {AuthProviders, AngularFireAuth, AngularFire, FirebaseAuthState, AuthMethods} from 'angularfire2';
//declare var firebase:any;
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';


@Component({
  templateUrl: 'settingEmoji.html'
})


export class settingEmojiPage {

	url1:any;
	url2:any;

  private authState;
  private auth;
  constructor(private navController: NavController,
            public auth$: AngularFireAuth,
            public db: AngularFireDatabase) {
    //this.initApp();
    this.authState = auth$.authState;
    this.authState.subscribe((state) => {
      this.auth = state;
    });
  }


  getSelectedEmojis() {
  var element1_1 = <HTMLInputElement> document.getElementById("1-1");
	var isChecked1_1 = element1_1.checked;

	var element1_2 = <HTMLInputElement> document.getElementById("1-2");
	var isChecked1_2 = element1_2.checked;

  var element1_3 = <HTMLInputElement> document.getElementById("1-3");
	var isChecked1_3 = element1_3.checked;

  var element2_1 = <HTMLInputElement> document.getElementById("2-1");
	var isChecked2_1 = element2_1.checked;

  var element2_2 = <HTMLInputElement> document.getElementById("2-2");
	var isChecked2_2 = element2_2.checked;

  var element2_3 = <HTMLInputElement> document.getElementById("2-3");
	var isChecked2_3 = element2_3.checked;

	if(isChecked1_1){
		this.url1 = "assets/images/star.png";
	}else if(isChecked1_2){
		this.url1 = "assets/images/poop_2.png";
	}else if(isChecked1_3){
		this.url1 = "assets/images/poop_4.png";
	}

	if(isChecked2_1){
		this.url2 = "assets/images/Smiley.svg.png";
	}else if(isChecked2_2){
		this.url2 = "assets/images/poop_3.png";
	}else if(isChecked2_3){
		this.url2 = "assets/images/poop_5.png";
	}

  }

    submit() {
      this.getSelectedEmojis();
      this.db.object('emojiSetting/'+ this.auth.uid).set({
        url1: this.url1 == null? "":this.url1,
        url2: this.url2 == null? "":this.url2
      }).then(result => this.parseResponse(result)).catch(this.handleError);
    }

  parseResponse(response: any)
  {
      alert("Your Emoji has been set!");     
  }

  handleError(error: any)
  {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error setting Emoji:" + error.message);

  }

}
