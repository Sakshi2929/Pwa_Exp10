if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error);
    });
  }
//
//
//   function subscribePush() {
//         //Subscribes user to Push notifications
//         registration.pushManager.subscribe({
//           userVisibleOnly: true //Set user to see every notification
//         })
//         .then(function (subscription) {
//           toast('Subscribed successfully.');
//           console.info('Push notification subscribed.');
//           console.log(subscription);
//         })
//         .catch(function (error) {
//           console.error('Push notification subscription error: ', error);
//         });
//       }
//
//
// Notification.requestPermission(function(status) {
//     console.log('Notification permission status:', status);
// });
//
//

function isPushSupported() {
    //checks if user has granted permission to Push notifications
    if (Notification.permission === 'denied') {
      alert('User has blocked push notification.');
      return;
    }

    //Checks if current browser supports Push notification
    if (!('PushManager' in window)) {
      alert('Sorry, Push notification isn\'t supported in your browser.');
      return;
    }

    //Get `push notification` subscription id

    //If `serviceWorker` is registered and ready
    navigator.serviceWorker.ready
      .then(function (registration) {
        registration.pushManager.getSubscription()
        .catch(function (error) {
          console.error('Error occurred while enabling push ', error);
        });
      });
  }

  function subscribePush() {
       //Subscribes user to Push notifications
       registration.pushManager.subscribe({
         userVisibleOnly: true //Set user to see every notification
       })
       .then(function (subscription) {
         toast('Subscribed successfully.');
         console.info('Push notification subscribed.');
         console.log(subscription);
       })
       .catch(function (error) {
         console.error('Push notification subscription error: ', error);
       });

   }
   Notification.requestPermission(function(status) {
       console.log('Notification permission status:', status);
   });
