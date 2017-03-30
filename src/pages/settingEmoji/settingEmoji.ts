import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire} from 'angularfire2';
//declare var firebase:any;


@Component({
  templateUrl: 'settingEmoji.html'
})


export class settingEmojiPage {

	url1:any;
	url2:any;

  constructor(private navCtrl: NavController,
              private firebase: AngularFire) {
    this.navCtrl = navCtrl;
  }

  db:any;
  auth = this.firebase.auth.getAuth().auth;

  infoWin() {
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
		this.url1 = "build/images/cool.svg";
	}else if(isChecked1_2){
		this.url1 = "build/images/in-love.svg";
	}else if(isChecked1_3){
		this.url1 = "build/images/happy.svg";
	}

	if(isChecked2_1){
		this.url2 = "build/images/angry.svg";
	}else if(isChecked2_2){
		this.url2 = "build/images/laughing.svg";
	}else if(isChecked2_3){
		this.url2 = "build/images/happy-1.svg";
	}

  }

    submit() {
      this.db = this.firebase.database;
      this.db.list('emojiSetting', {query: {child: this.firebase.auth.getAuth().uid}}).set({
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
