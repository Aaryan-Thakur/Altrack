import React, { useState } from "react";

import { StyleSheet, Text, TextInput, View, ScrollView,ToastAndroid } from "react-native";
import { Button } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";

const Register = ({ navigation }) => {
  const user = useSelector(state => state.user)
  const token = useSelector(state => state.token)

  const [pass, changePass] = React.useState("");

  const [emailerr, setemailerr] = React.useState(false);
  const [numerr, setnumerr] = React.useState(false);

  function toLogin() {
    navigation.navigate("Login");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  }

  const submit = async (data) => {
    const loggedInResponse = await fetch('http://192.168.0.104:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
      firstName:data.firstName,
      lastName:data.lastName,
      email:data.email,
      password:pass,
      mobile:data.mobile
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if(data=='users_email_key'){
        setemailerr(true)
      }
      else if(data=='users_mobile_key'){
        setnumerr(true)
      }
      else{
        ToastAndroid.show('Registered Successfully', ToastAndroid.SHORT);
        toLogin();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  };



  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const print = (data) =>
    console.log({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: pass,
      mobile: data.mobile
    });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text>{user}</Text>
      <Text>{token}</Text> */}
      <View style={styles.register}>
        {/* FIRST NAME FIELD */}
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is required",
            },
            maxLength: {
              value: 50,
              message: "name is too long",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.text}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="First Name"
            />
          )}
          name="firstName"
        />
        {errors.firstName && (
          <Text style={styles.error}>{errors.firstName.message}</Text>
        )}

        {/* LAST NAME FIELD */}
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is required",
            },
            maxLength: {
              value: 50,
              message: "name is too long",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.text}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Last Name"
            />
          )}
          name="lastName"
        />
        {errors.lastName && (
          <Text style={styles.error}>{errors.lastName.message}</Text>
        )}

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
              onChangeText={e=>{onChange(e);setemailerr(false)}}
              value={value}
              placeholder="Email"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
          
        )}
        {emailerr && (
          <Text style={styles.error}>This email is already in use</Text>
        )}


        {/* AGE FIELD */}
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is required",
            },
            maxLength: {
              value: 2,
              message: "invalid age",
            },
            validate: {
              check: (value) =>
                (!isNaN(value) && parseInt(value) >= 18) || "invalid age",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              inputMode="numeric"
              style={styles.text}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Age"
            />
          )}
          name="age"
        />
        {errors.age && <Text style={styles.error}>{errors.age.message}</Text>}

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
              onChangeText={(value) => {
                onChange(value), changePass(value);
              }}
              value={value}
              placeholder="Password"
              secureTextEntry={true}
            />
          )}
          name="pass1"
        />
        {errors.pass1 && (
          <Text style={styles.error}>{errors.pass1.message}</Text>
        )}

        {/* CONFIRM PASSWORD FIELD */}
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is required",
            },
            maxLength: {
              value: 50,
              message: "name is too long",
            },
            validate: {
              confirm: (value) => value === pass || "passwords don't match",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.text}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Confirm Password"
              secureTextEntry={true}
            />
          )}
          name="pass2"
        />
        {errors.pass2 && (
          <Text style={styles.error}>{errors.pass2.message}</Text>
        )}

        {/* MOBILE FIELD */}
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is required",
            },
            minLength: {
              value: 10,
              message: "number is too short",
            },
            maxLength: {
              value: 10,
              message: "number is too long",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.text}
              onBlur={onBlur}
              onChangeText={e=>{onChange(e);setnumerr(false)}}
              value={value}
              placeholder="Mobile"
            />
          )}
          name="mobile"
        />
        {errors.mobile && (
          <Text style={styles.error}>{errors.mobile.message}</Text>
        )}
        {numerr && (
        <Text style={styles.error}>This number is already in use</Text>)}
      </View>

      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSubmit(submit)}
      >
        register
      </Button>
      <View>
        <Text>Already have an account?</Text>
        <Button onPress={() => toLogin()}>Click here</Button>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  register: {
    flex: 0,
    width: "100%",
    paddingHorizontal: "10%",
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
  button: {
    marginVertical: 50,
  },
  error: {
    color: "red",
    fontSize: 14,
  },
  inverror: {
    color: "red",
    fontSize: 14,
    
  },
});

export default Register;
