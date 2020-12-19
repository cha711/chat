import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const ifvisible = require('ifvisible.js');

firebase.initializeApp({
  apiKey: 'AIzaSyD26tbySA_2A_yBS73OE05MDqBBbINl_m4',
  authDomain: 'fooo-e20b5.firebaseapp.com',
  databaseURL: 'https://fooo-e20b5.firebaseio.com',
  projectId: 'fooo-e20b5',
  storageBucket: 'fooo-e20b5.appspot.com',
  messagingSenderId: '240653320347',
  appId: '1:240653320347:web:8973d00fac33749dfd463e',
  measurementId: 'G-XGJHSYYB7H',
});

let display_flag = true;

const surveillance = async () => {
  if (display_flag) {
    // 再接続
    firebase.database().goOnline();
  }
  setTimeout(surveillance, 250);
};

/**
 * 画面がアクティブになったとき
 */
ifvisible.on('focus', async function () {
  display_flag = true;
});

/**
 * 画面が非アクティブになったとき
 */
ifvisible.on('blur', async function () {
  display_flag = false;

  // 切断
  firebase.database().goOffline();
});

// 監視開始
surveillance();

export default firebase;
