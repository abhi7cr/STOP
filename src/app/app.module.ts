import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

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
import {NewHomePage} from '../pages/newHome/newHome';
import {settingEmojiPage } from '../pages/settingEmoji/settingEmoji';
import {currentMealtimePage} from '../pages/currentMealtime/currentMealtime';
import {currentRemindersPage} from '../pages/currentReminders/currentReminders';
import {currentTimersPage} from '../pages/currentTimers/currentTimers';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ThisDayPage} from '../pages/thisDay/thisDay';

import {CalendarService} from '../pages/calendar/calendar.service'

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
    ThisDayPage,
    NewHomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(
      firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
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
    ThisDayPage,
    NewHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CalendarService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
