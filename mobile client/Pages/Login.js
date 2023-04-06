import React from 'react'
import { StyleSheet, Text, TextInput, View,ToastAndroid} from 'react-native';
import { Button } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import { setLogin } from '../state';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';




const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);


  const submit = async (data) => {
    const loggedInResponse = await fetch('http://192.168.0.101:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
      email:data.email,
      password:data.password,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if(data=="invalid"){
        ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
      }else{
        dispatch(setLogin({
          user:data.uid,
          token:data.token,
          name:data.name
        }))
        ToastAndroid.show('Login successful', ToastAndroid.SHORT);
        toHome();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });


  };


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
  function toHome() {
    navigation.navigate("Home");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const print = (data) =>
  console.log(data);



  return (
    <View style={styles.container}>
    <Text>{token}</Text>
    {/* EMAIL FIELD */}
    <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is required",
            },
            maxLength: {
              value: 50,
              message: "email is too long",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.text}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="email"
              autoCapitalize="none"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

     {/* PASSWORD  FIELD */}
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is required",
            },
            minLength: {
              value: 8,
              message: "password is too short",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.text}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="password"
              secureTextEntry={true}

            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}




    <Button style={styles.button} mode="contained" onPress={handleSubmit(submit)}>login</Button>

    <View><Text>Don't have an account?</Text><Button onPress={()=> toregister()} >Click here</Button></View>
    <View><Button onPress={()=> toHome()} >Demo</Button></View>


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
    fontSize: 25,
    marginVertical:10
  },
  button:{
    marginVertical:50
  },
  error: {
    color: "red",
    fontSize: 14,
  },
});
export default Login