import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDcWmHHTp9OKPDtxX13cfqFBn6R9bF9gZU',
    authDomain: 'fir-upload-react.firebaseapp.com',
    projectId: 'fir-upload-react',
    storageBucket: 'fir-upload-react.appspot.com',
    messagingSenderId: '740082682431',
    appId: '1:740082682431:web:a6c33d5d8b1f917954068a',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
