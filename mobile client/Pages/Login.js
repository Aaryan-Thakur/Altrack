import React from 'react'
import { StyleSheet, Text, TextInput, View} from 'react-native';
import { Button } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';



const Login = ({navigation}) => {

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

  function toregister() {
    navigation.navigate('Register')
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Register' },
        ],
      })
    );
  }

  return (
    <View style={styles.container}>
    <TextInput style={styles.text} placeholder='email'></TextInput>
    <TextInput secureTextEntry={true} style={styles.text} placeholder='password'></TextInput>
    <Button style={styles.button} mode="contained" onPress={()=> onsubmit()}>login</Button>
    <View><Text>Don't have an account?</Text><Button onPress={()=> toregister()} >Click here</Button></View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: 30,
    marginVertical:10
  },
  button:{
    marginVertical:50
  }
});
export default Login