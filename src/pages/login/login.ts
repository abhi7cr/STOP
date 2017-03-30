import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {AuthProviders, AngularFireAuth, AngularFire, FirebaseAuthState, AuthMethods} from 'angularfire2';
//declare var firebase: any;

@Component({
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
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
    

	 handleSignUp() {
      this.firebase.auth.createUser({email:this.email, password:this.password}).then(result => this.parseResponse(result))
        .catch(this.handleError);
    }

	 toggleSignIn() {
      if (!this.firebase.auth) {
        this.firebase.auth.login({email: this.email, password:this.password}).then(result => this.parseResponse(result))
        .catch(this.handleError);
        // [END authwithemail]
      }
      else{
      	this.user = this.authState.auth;
    	  this.navController.pop();
      }
    }

    ionViewWillEnter(){
			// if (firebase.auth().currentUser) {
			// 	this.navController.push(HomePage);
			// }  
	}


}