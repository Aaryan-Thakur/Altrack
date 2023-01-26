import React from 'react'
import { StyleSheet, Text, TextInput, View,ScrollView} from 'react-native';
import { Button } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';


const Register = ({navigation}) => {

  function onsubmit() {
    navigation.navigate('Home')
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Home' },
        ],
      })
    );
  }

  function noaccount() {
    navigation.navigate('Login')
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Login' },
        ],
      })
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.register}>
    <TextInput style={styles.text} placeholder='First Name'></TextInput>
    <TextInput style={styles.text} placeholder='Last Name'></TextInput>
    <TextInput style={styles.text} placeholder='Email'></TextInput>
    <TextInput style={styles.text} placeholder='Date of Birth'></TextInput>
    <TextInput secureTextEntry={true} style={styles.text} placeholder='Password'></TextInput>
    <TextInput secureTextEntry={true} style={styles.text} placeholder='Confirm password'></TextInput>
    </View>
    <Button style={styles.button} mode="contained" onPress={()=> onsubmit()}>register</Button>
    <View><Text>Already have an account?</Text><Button onPress={()=> noaccount()} >Click here</Button></View>

    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
      },
  register:{
    flex:0,
    width: '100%',
    paddingHorizontal:'10%'
  },
  text:{
    fontSize: 20,
    marginVertical:10
  },
  button:{
    marginVertical:50
  }
});
export default Register