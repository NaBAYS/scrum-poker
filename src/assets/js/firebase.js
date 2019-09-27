import firebase from 'firebase/app'
import 'firebase/auth'

window.firebase = firebase

const firebaseConfig = {
  apiKey: 'AIzaSyBvbpWcecuiZUBc0vYyPQtLkspPeheBB5I',
  authDomain: 'scrum-poker-f7776.firebaseapp.com',
  databaseURL: 'https://scrum-poker-f7776.firebaseio.com',
  projectId: 'scrum-poker-f7776',
  storageBucket: '',
  messagingSenderId: '254734140159',
  appId: '1:254734140159:web:1b2d719ac22f9018db82ca'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
