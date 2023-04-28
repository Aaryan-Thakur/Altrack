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
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import HomePage from "./Pages/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer, { authSlice } from "./state";
import FoodBrowser from "./Pages/FoodBrowser";
import RecipeB from "./Pages/RecipeB";
import AddFood from "./Pages/AddFood";
import Entry from "./Pages/Entry";
import CameraPage from "./Pages/CameraPage";
import FoodItemTest from "./Pages/FoodItemTest";
import ExerBrowser from "./Pages/ExerBrowser";
import Exercises from "./Pages/Exercises";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
const store = configureStore({
  reducer: rootReducer,
});

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FoodB"
            component={FoodBrowser}
            options={{ title: "Recipe Browser" }}
          />
          <Stack.Screen name="RecipeB" component={RecipeB} />
          <Stack.Screen
            name="AddFood"
            component={AddFood}
            options={{ title: "Log Food" }}
          />
          <Stack.Screen name="Entry" component={Entry} />
          <Stack.Screen name="Camera" component={CameraPage} />
          <Stack.Screen
            name="FoodItemTest"
            component={FoodItemTest}
            options={{ title: "Food" }}
          />
          <Stack.Screen
            name="ExerBrowser"
            component={ExerBrowser}
            options={{ title: "Exercises" }}
          />
          <Stack.Screen name="Exercises" component={Exercises} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
