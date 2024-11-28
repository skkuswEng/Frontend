/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// firebase-messaging-sw.js



self.__WB_DISABLE_DEV_LOGS = true;
importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging-compat.js');
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDlAMd3LiBHZsi7tOMSUdwmnz_MB_mtWcA',
  authDomain: 'sokk-82ce3.firebaseapp.com',
  projectId: 'sokk-82ce3',
  storageBucket: 'sokk-82ce3.firebasestorage.app',
  messagingSenderId: '496181595010',
  appId: '1:496181595010:web:aa0c1095ccbd7e17c31d9b',
  measurementId: 'G-WP6CW1YCMY'
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const isSupported = firebase.messaging.isSupported();
if (isSupported) {
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage(payload => {
    const {
      notification: {
        title,
        body
      },
      data: {
        reservation
      }
    } = payload;
    console.log('메세지를 획득함 from 서비스워커', payload);
    const reservationId = parseInt(reservation);
    self.registration.showNotification(title, {
      body
    });
  });
}
/******/ })()
;