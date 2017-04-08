import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, AngularFireModule, AuthMethods,
    AuthProviders} from 'angularfire2';

import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {BristolPage} from '../pages/bristol/bristol';
import {CalendarPage} from '../pages/calendar/calendar';
import {mealtimePage} from '../pages/mealtime/mealtime';
import {remindersPage} from '../pages/reminders/reminders';
import {TimerComponent} from '../pages/timers/timers';
import {TimerPage} from '../pages/timers/timer';
import {aboutPage} from '../pages/about/about';
import {helpPage} from '../pages/help/help';
import {HomePage} from '../pages/home/home';
import {settingEmojiPage } from '../pages/settingEmoji/settingEmoji';
import {currentMealtimePage} from '../pages/currentMealtime/currentMealtime';
import {currentRemindersPage} from '../pages/currentReminders/currentReminders';
import {currentTimersPage} from '../pages/currentTimers/currentTimers';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ThisDayPage} from '../pages/thisDay/thisDay';

export const firebaseConfig = {
  apiKey: "AIzaSyCBvKIztKx4W1oSJ0Eti8aVljxEmMzNlII",
    authDomain: "stop-847d8.firebaseapp.com",
    databaseURL: "https://stop-847d8.firebaseio.com",
    storageBucket: "stop-847d8.appspot.com"
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    mealtimePage,
    remindersPage,
    TimerComponent,
    aboutPage,
    helpPage,
    HomePage,
    settingEmojiPage,
    BristolPage,
    CalendarPage,
    LoginPage,
    TimerPage,
    ThisDayPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(
      firebaseConfig,
      {method: AuthMethods.Password,
       provider: AuthProviders.Password})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    mealtimePage,
    remindersPage,
    TimerComponent,
    aboutPage,
    helpPage,
    HomePage,
    settingEmojiPage,
    BristolPage,
    CalendarPage,
    TimerPage,
    LoginPage,
    ThisDayPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
