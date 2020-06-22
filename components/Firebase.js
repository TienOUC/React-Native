import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyClas2eHtwX3NgGRjOKYx7easa9H1xMKFE",
    authDomain: "react-native-demo.firebaseapp.com",
    databaseURL: "https://react-native-demo.firebaseio.com",
    storageBucket: "react-native-demo.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export default firebase 
