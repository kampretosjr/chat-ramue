import Firebase from 'firebase';

let config = {

    apiKey: "AIzaSyDIeDPhoUVnCsgVGkp2qdWPPPrvHIHRNRc",
    authDomain: "chat-ramue.firebaseapp.com",
    databaseURL: "https://chat-ramue.firebaseio.com/",
    projectId: "chat-ramue",
    storageBucket: "gs://chat-ramue.appspot.com",
    messagingSenderId: "1069201209353",
    appId: "com.chatramue"

}

let app = Firebase.initializeApp(config);

export const Database = app.database();
export const Auth = app.auth();