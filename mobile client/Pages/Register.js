import React,{useState} from 'react'
import { StyleSheet, Text, TextInput, View,ScrollView} from 'react-native';
import { Button } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';


const Register = ({navigation}) => {

  const [pass, changePass] = React.useState('')

  // function setpass(e) {
  //   changePass(e);
  //   console.log(e.nativeEvent.text);

  // }

  

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
    <TextInput style={styles.text}  maxLength={20} placeholder='First Name'></TextInput>
    <TextInput style={styles.text}  maxLength={20}  placeholder='Last Name'></TextInput>
    <TextInput style={styles.text}  maxLength={255} placeholder='Email'></TextInput>
    <TextInput  keyboardType='numeric' style={styles.text} maxLength={2} placeholder='Age'></TextInput>
    <TextInput name="pass1" secureTextEntry={true} style={styles.text}  maxLength={64}  placeholder='Password'  value={pass}  onChange={changePass} ></TextInput>
    <TextInput secureTextEntry={true} style={styles.text}  maxLength={64} placeholder='Confirm password'></TextInput>
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