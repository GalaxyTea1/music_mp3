import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCPAyEKHBbXMqa4Q33ld5THcaNfKXn1ko8',
    authDomain: 'frb-upload-react-45308.firebaseapp.com',
    projectId: 'frb-upload-react-45308',
    storageBucket: 'frb-upload-react-45308.appspot.com',
    messagingSenderId: '497244064834',
    appId: '1:497244064834:web:c9a55181b30cf55f9c71db',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
