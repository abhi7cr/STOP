import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage} from '../home/home';
declare var firebase: any;

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage implements OnInit {
  constructor(private navController: NavController) {
  	//this.initApp();
  }

    ngOnInit(){
    }

  	response: any;
  	user: any;
  	email: any;
  	password: any;
  
    parseResponse(response: any)
	  {
           this.navController.pop();
	  } 

	handleError(error: any)
	{
		      var errorCode = error.code;
          var errorMessage = error.message;
          alert("ERROR:"+ errorMessage);
	}
    toggleSignInWithFB() {
      if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.FacebookAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('user_birthday');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithPopup(provider).then(result => this.parseResponse(result))
          .catch(this.handleError);
    	}
    	else{
    		this.user = firebase.auth().currentUser;
    		this.navController.push(HomePage);
    	}
	}

	 handleSignUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(result => this.parseResponse(result))
        .catch(this.handleError);
    }

	 toggleSignIn() {
      if (!firebase.auth().currentUser) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(result => this.parseResponse(result))
        .catch(this.handleError);
        // [END authwithemail]
      }
      else{
      	this.user = firebase.auth().currentUser;
    	  this.navController.pop();
      }
    }

    ionViewWillEnter(){
			// if (firebase.auth().currentUser) {
			// 	this.navController.push(HomePage);
			// }  
	}


}