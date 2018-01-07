import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewHomePage } from '../newHome/newHome';
import { AngularFireAuth } from 'angularfire2/auth';
//import {AuthProviders, AngularFireAuth, AngularFire, FirebaseAuthState, AuthMethods} from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  private authState;
  private auth;
  constructor(private navController: NavController,
    public auth$: AngularFireAuth,
    private db: AngularFireDatabase) {
     this.authState = auth$.authState;
      this.authState.subscribe((state) => {
       this.auth = state;
      //  if (this.auth !== null) {
      //    var ref = this.db.object('/user/' + this.auth.uid);
      //    if (this.phone !== '') {
      //      ref.set({
      //      phone: this.phone
      //    })
      //   .then(result => console.log('saved phone'))
      //   .catch(this.handleError);
      //   }
      //  }
       })
    }

  ngOnInit() {
  }

  response: any;
  user: any;
  email: string;
  password: string;
  phone: string;

  parseResponse(response: any) { 
    this.navController.setRoot(NewHomePage);
  }

  handleError(error: any) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("ERROR:" + errorMessage);
  }


  handleSignUp() {
    this.auth$.auth.createUserWithEmailAndPassword(this.email, this.password).then(result => {
      this.parseResponse(result)
    }).catch(this.handleError);
  }


  toggleSignIn() {
    this.auth$.auth.signInWithEmailAndPassword(this.email, this.password).then(result => this.parseResponse(result))
      .catch(this.handleError);
  }


  ionViewWillEnter() {
  }


}