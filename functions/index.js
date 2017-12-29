const functions = require('firebase-functions');
const webpush = require('web-push');
//const urlBase64 = require('urlsafe-base64');
// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();
const request = require('request');


// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
let intervalIds = {}

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
      var ms = 15000;
      var oneDayInMs = 60 * 60 * 1000 * 24;
      let intervalId1 = null;
      let intervalId2 = null;
      if (diffOfReminder1FromNow < 0) {
        diffOfReminder1FromNow = oneDayInMs - diffOfReminder1FromNow
      }
      if (diffOfReminder2FromNow < 0) {
        diffOfReminder2FromNow = oneDayInMs - diffOfReminder2FromNow
      }
      console.log(diffOfReminder1FromNow + ';' + diffOfReminder2FromNow)
      let sendReminder = () => {
        const url = 'https://platform.clickatell.com/messages/http/send?apiKey=-MJU6bpsQtuWnjBPposNdg==&to=1'+phone+'&content=Hey!+This+is+a+reminder+to+go+the+bathroom!&from=1202-735-3375';
        request(url, { method: 'GET' }, (err, res, body) => {
          if (err) { return console.log('ERROR:' + err); }
          console.log('BODY:' + body);
        });
      }
      if (Array.isArray(intervalIds[uid])) {
        console.log('interval ids: ' + JSON.stringify(intervalIds[uid]))
        intervalIds[uid].forEach(i => {
          clearInterval(i)
        })
      }
      let timeoutId1 = setTimeout(() => {
        console.log('fired reminder1 for' + uid + 'at' + new Date().toDateString())
        sendReminder()
        intervalId1 = setInterval(() => {
          console.log('fired subsequent reminder1 for' + uid + 'at' + new Date().toDateString())
          sendReminder()
        }, oneDayInMs)
        intervalIds[uid].push(intervalId1)
      }, diffOfReminder1FromNow);
      let timeoutId2 = setTimeout(() => {
        console.log('fired reminder1 for' + uid + 'at' + new Date().toDateString())
        sendReminder()
        intervalId1 = setInterval(() => {
          console.log('fired subsequent reminder1 for' + uid + 'at' + new Date().toDateString())
          sendReminder()
        }, oneDayInMs)
        intervalIds[uid].push(intervalId2)
      }, diffOfReminder2FromNow);
      intervalIds[uid] = [timeoutId1, timeoutId2]
    });

    //webpush.setGCMAPIKey('AAAA_-45Fes:APA91bFvtqf130TiipD53EyG0yp93_5GlgGgHjQayah5K03N1NYWOv5eRvA2hgOcLFebEuey2ksJ8uYHruSWey3zzKN8t-H-3GSwEECVHYqoXOGcn3-HwbCVhYi-CG3vWqDwj428hKuA');
    //  webpush.setVapidDetails(
    //  'mailto:abhi7cronaldo@gmail.org',
    // vapidKeys.publicKey,
    //  vapidKeys.privateKey);

    // This is the same output of calling JSON.stringify on a PushSubscription
    // const pushSubscription = {
    // 		endpoint: "https://android.googleapis.com/gcm/send/f2BtJX3hyww:APA91bFZbG6HnHkkSDEAqWtErP06bE2lZnh6IgAYBUryMdtsJj12x7MAh1Lp5msHNyeOP2VLwrQv7ZBmPv91UeQ9l6cDZT1C3P9U-pcwXo14bPxtxfojNVnNOWc7Rs83yn2U52KyFYCH",
    // 		keys: {
    // 			p256dh: "BBKtSNS4mlJn3Xy0LtE8nLC0vwK+lLCIIlD2K8D+kBsTQDaKGtW69wLjSmFjE/OZsiULk71AAzexAlDEeTavEdk=",
    // 			auth: "+DPoqGYxkB3L8dWXzXL1xw=="
    // 		}
    // 	  };

    // 	  console.log("Length of key" + urlBase64.decode(pushSubscription.keys.p256dh).length);
    //     console.log("Length of auth" + urlBase64.decode(pushSubscription.keys.auth).length);
    //     // Grab the current value of what was written to the Realtime Databa

    //   webpush.sendNotification(pushSubscription, 'Hey! This is a reminder to go to toilet');
    //  });
  })

function updateLocalNotifications(reminder) {
  //reminder notifications
  let firstNotificationTime = new Date();
  let secondNotificationTime = new Date();

  let hourMinute1 = reminder.reminder1.split(':');
  let hour1 = hourMinute1[0];
  let minute1 = hourMinute1[1];
  firstNotificationTime.setHours(hour1);
  firstNotificationTime.setMinutes(minute1);
  firstNotificationTime.setSeconds(0, 0);

  let hourMinute2 = reminder.reminder2.split(':');
  let hour2 = hourMinute2[0];
  let minute2 = hourMinute2[1];
  secondNotificationTime.setHours(hour2);
  secondNotificationTime.setMinutes(minute2);
  secondNotificationTime.setSeconds(0, 0);

  var ms = 15000;
  var now = new Date();

  setTimeout(function () {
    var en = new Notification('Hey!', {
      body: this.reminderText,
      icon: '../assets/images/STOP_FINAL.png'
    });
    en.onshow = function () {
      setTimeout(en.close, ms)
      setInterval(function () {
        var en = new Notification('Hey!', {
          body: this.reminderText,
          icon: '../assets/images/STOP_FINAL.png'
        });
        en.onshow = function () {
          setTimeout(en.close, ms)
        }
      }, 60 * 60 * 1000 * 24)
    }
  }, (firstNotificationTime) - (now));

  setTimeout(function () {
    var en = new Notification('Hey!', {
      body: this.reminderText,
      icon: '../assets/images/STOP_FINAL.png'
    });
    en.onshow = function () {
      setTimeout(en.close, ms)
      setInterval(function () {
        var en = new Notification('Hey!', {
          body: this.reminderText,
          icon: '../assets/images/STOP_FINAL.png'
        });
        en.onshow = function () {
          setTimeout(en.close, ms)
        }
      }, 60 * 60 * 1000 * 24)
    }
  }, (secondNotificationTime) - (now));
}
