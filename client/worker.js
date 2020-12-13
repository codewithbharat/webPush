console.log('service worker loaded');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push Recived....');
    self.registration.showNotification(data.title, {
        body: 'Notified by CodeWithbharat',
    });
})