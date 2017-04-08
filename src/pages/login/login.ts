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
           this.navController.setRoot(HomePage);
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
        this.firebase.auth.login({email: this.email, password:this.password}).then(result => this.parseResponse(result))
        .catch(this.handleError);
      }
    

    ionViewWillEnter(){
			// if (firebase.auth().currentUser) {
			// 	this.navController.push(HomePage);
			// }  
	}


}