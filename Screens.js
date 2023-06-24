import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
// import firestore from '@react-native-firebase/firestore';
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";

// import firebase from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyAzGf_dDf8WcjI2UZb6pFsQZYcnpeDB5Tk",
//   authDomain: "react-native-app-25dab.firebaseapp.com",
//   projectId: "react-native-app-25dab",
//   storageBucket: "react-native-app-25dab.appspot.com",
//   messagingSenderId: "726051856412",
//   appId: "1:726051856412:web:2fccbaf79d57682058ffd9",
//   measurementId: "G-NWKMFG0C20"
// };


// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyAzGf_dDf8WcjI2UZb6pFsQZYcnpeDB5Tk",
  authDomain: "react-native-app-25dab.firebaseapp.com",
  projectId: "react-native-app-25dab",
  storageBucket: "react-native-app-25dab.appspot.com",
  messagingSenderId: "726051856412",
  appId: "1:726051856412:web:2fccbaf79d57682058ffd9",
  measurementId: "G-NWKMFG0C20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// // Initialize Firebase
// console.log("1");
// firebase.initializeApp(firebaseConfig);
// console.log("2");
// const db = firebase.firestore();
// console.log("3");
// const analytics = getAnalytics(app);



export function Home({navigation}) {
  // const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState(new Date().toISOString())
  const [occupation, setOccupation] = useState('');
  const [company, setCompany] = useState('');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate.toISOString());
  };

  const showMode = (currentMode) => {
    setShow(true);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  

  const handleButtonPress = async () => {
    //Push captured details to Firebase Firestore
    try {
        const docRef = await addDoc(collection(db, "data"), {
          firstName:firstName,
          lastName:lastName,
          date:date,
          occupation:occupation,
          company:company,
        });
        console.log("Document written with ID: ", docRef.id);
            navigation.navigate('Page2', {
          firstName,
          lastName,
          date,
          occupation,
          company,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    //   db
    //   .collection('data')
    //   .add({
    //     firstName:firstName,
    //     lastName:lastName,
    //     dateofBirth:dateOfBirth,
    //     occupation:occupation,
    //     company:company,
    //   })
    //   .then(() => {
    //     console.log('User details saved successfully!');
    //     // Navigate to Page2
    //     navigation.navigate('Page2', {
    //       firstName,
    //       lastName,
    //       date,
    //       occupation,
    //       company,
    //     });
    //  })
    //   .catch((error) => {
    //     console.error('Error saving user details:', error);
    //   });
  };

 return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      
      <TextInput
        style={styles.input}
        placeholder="Occupation"
        value={occupation}
        onChangeText={setOccupation}
      />
      <TextInput
        style={styles.input}
        placeholder="Company"
        value={company}
        onChangeText={setCompany}
      />
      <SafeAreaView>
<Button onPress={showDatepicker} title="Date of Birth" />
<Text style={styles.input} >selected: {new Date(date).toLocaleDateString()}</Text>
{show && (
  <DateTimePicker
    testID="dateTimePicker"
    value={new Date(date)}
    // is24Hour={true}
    onChange={onChange}
  />
)}
</SafeAreaView>

      <Button title="Submit" onPress={handleButtonPress} />
    


</View>
  );
 }

export function Page2({route}) {
  // const route = useRoute();
  const { firstName, lastName, date, occupation, company } = route.params;

  // Calculate age based on the date of birth
  const currentDate = new Date();
  const birthDate = new Date(date);
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {firstName} {lastName} is {age} years old and working as a {occupation} in {company}.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
