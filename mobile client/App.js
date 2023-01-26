
// import { StyleSheet, Text, TextInput, View,Button  } from 'react-native';
// // import { Camera, CameraType } from 'expo-camera';


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>I an App</Text>
//       <TextInput placeholder='type here bozo'></TextInput>
//       <Button title='tap me to die'/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text:{
//     color: 'blue'
     
//   }
// });


import React from "react";
import { StyleSheet, Text, TextInput, View,Button  } from 'react-native';
import HomePage from "./Pages/HomePage";
import CameraPage from "./Pages/CameraPage";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PPage from "./Pages/PPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";



export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home"  component={HomePage}   options={{ headerBackVisible:false }} />
        <Stack.Screen name="Camera" component={CameraPage}/>
        <Stack.Screen name="PPage" component={PPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}