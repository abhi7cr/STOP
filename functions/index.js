const functions = require('firebase-functions');
const webpush = require('web-push');
//const urlBase64 = require('urlsafe-base64');
// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();
const request = require('request');
const cron = require('cron');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
let intervalIds = {}
let cronJobs = {}
exports.registerUser = functions.https.onRequest((req, res) => {
  const requestData = req.query;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  admin.database().ref('/userPushRegistration').push({ registrationInfo: requestData }).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});

exports.setReminderNotification = functions.database.ref('/reminderSetting/{userId}')
  .onWrite(event => {
    console.log(event)
    let phone = null
    admin.database().ref('/user/' + event.params.userId).once('value').then(function(snapshot){
      phone = snapshot.child('phone').val()
      console.log('PHONE NUMBER:' + phone)
      const reminder1 = event.data.val().reminder1;
      const reminder2 = event.data.val().reminder2;
      const timeZoneOffset = event.data.val().timeZoneOffset
      const uid = event.params.userId;
      console.log(reminder1 + ',' + reminder2 + ',' + uid)

      //reminder notifications
      let firstNotificationTime = new Date();
      let secondNotificationTime = new Date();
      let now = new Date();
      //Convert to local user time
      now.setHours(now.getHours() - timeZoneOffset)
      firstNotificationTime.setHours(firstNotificationTime.getHours() - timeZoneOffset)
      secondNotificationTime.setHours(secondNotificationTime.getHours() - timeZoneOffset)
      let hourMinute1 = reminder1.split(':');
      let hour1 = hourMinute1[0];
      let minute1 = hourMinute1[1];
      firstNotificationTime.setHours(hour1);
      firstNotificationTime.setMinutes(minute1);
      firstNotificationTime.setSeconds(0, 0);

      let hourMinute2 = reminder2.split(':');
      let hour2 = hourMinute2[0];
      let minute2 = hourMinute2[1];
      secondNotificationTime.setHours(hour2);
      secondNotificationTime.setMinutes(minute2);
      secondNotificationTime.setSeconds(0, 0);
      console.log(firstNotificationTime + ':' + secondNotificationTime + ':' + now)
      let diffOfReminder1FromNow = firstNotificationTime - now
      let diffOfReminder2FromNow = secondNotificationTime - now

      console.log('DIFF:' + diffOfReminder1FromNow + ',' + diffOfReminder2FromNow)
      if (cronJobs[uid] !== undefined) {
        Array(cronJobs[uid]).forEach(c => {
          console.log('stopping cron job' + JSON.stringify(Object.keys(c)) + ' for phone ' + phone)
          //c.stop()
        })
      }

      let sendReminder = () => {
        const url = 'https://platform.clickatell.com/messages/http/send?apiKey=-MJU6bpsQtuWnjBPposNdg==&to=1'+phone+'&content=Reminder+from+Constipation+APP:+Hey!+This+is+a+reminder+to+go+the+bathroom!+App+link:+https://stop-847d8.firebaseapp.com&from=1202-735-3375';
        request(url, { method: 'GET' }, (err, res, body) => {
          if (err) { return console.log('ERROR:' + err); }
          console.log('BODY:' + body);
        });
      }

      let cronTime1 = `00 ${Number(minute1)} ${Number(hour1)+Number(timeZoneOffset)} * * *`
      console.log(cronTime1)
      let cronTime2 = `00 ${Number(minute2)} ${Number(hour2)+Number(timeZoneOffset)} * * *`
      console.log(cronTime2)
      let reminderCron1 = new cron.CronJob({
        cronTime: cronTime1,
        onTick: ()=> {
          console.log('reminder 1 ticked for ' + phone)
          sendReminder()
        },
       start: false,
      //  timeZone: 'America/Chicago'
      });
    
     let reminderCron2 = new cron.CronJob({
        cronTime: cronTime2,
        onTick: ()=> {
          console.log('reminder 2 ticked ' + phone)
          sendReminder()
        },
      start: false,
      // timeZone: 'America/Chicago'
     });
     reminderCron1.start()
     reminderCron2.start()
     cronJobs[uid] = [reminderCron1, reminderCron2]
  })
});


