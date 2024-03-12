import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAhtZNpehAovpqv_Y2KiBLXNLgaL6NnoRk',
  authDomain: 'vue-firebase-blog-app.firebaseapp.com',
  projectId: 'vue-firebase-blog-app',
  storageBucket: 'vue-firebase-blog-app.appspot.com',
  messagingSenderId: '671075324397',
  appId: '1:671075324397:web:4df872e2dfe471af5317e4',
};

const app = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(app);
const timestamp = serverTimestamp();

export { projectFirestore, timestamp };
