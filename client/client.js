const publicVapidkey = 'BCZko7ex-cwqlhS20tb6x5hTVNwjTvTVigpdsV6hQiKj59pi7fQNUzhQVRhD8_4HVwbOaKsZZaqNpULcnYqcjaU';

//check for service worker

if('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
}

// Register SW, Register Push, send Push
async function send() {
    console.log('registring service worker');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('servcie worker registerd');

    // regsiter push
    console.log('Registring push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidkey),
    });
    console.log('push Registered... ');

    //Send Push Notification
    console.log('Sending Push....');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push Sent...');
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }