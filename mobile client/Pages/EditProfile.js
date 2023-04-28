import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from "@react-navigation/native";



const EditProfile = (props) => {
    const URL = useSelector((state) => state.url.URL);
    const navigation = useNavigation();

  console.log(props.route.params.props);
  userdata = props.route.params.props;
  const [fname, setfname] = useState(userdata.data1[0].fname);
  const [lname, setlname] = useState(userdata.data1[0].lname);

  const [TCAL, setTCAL] = useState(userdata.data2[0].tcal);
  const [Height, setHeight] = useState(userdata.data2[0].height);
  const [Weight, setWeight] = useState(userdata.data2[0].weight);
  const [Gender, setGender] = useState(userdata.data2[0].gender);

  const submit = () => {
    fetch(`${URL}/api/updateUserData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        uid: userdata.data1[0].userid,
        fname:fname,
        lname:lname,
        height:Height,
        weight:Weight,
        gender:Gender,
        tcal:TCAL
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    navigation.navigate("Profile")
    navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "Home" },{ name: "Profile" }],
        })
      );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          value={fname}
          onChangeText={(value) => {
            setfname(value);
          }}
        ></TextInput>
      </View>

      <View style={styles.container1}>
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={lname}
          onChangeText={(value) => {
            setlname(value);
          }}
        ></TextInput>
      </View>

      <View style={styles.container1}>
        <Text>Target Calories:</Text>
        <TextInput
          style={styles.input}
          value={TCAL.toString()}
          onChangeText={(value) => {
            setTCAL(value);
          }}
          inputMode="numeric"
        ></TextInput>
      </View>

      <View style={styles.container1}>
        <Text>Height(in meters):</Text>
        <TextInput
          style={styles.input}
          value={Height.toString()}
          onChangeText={(value) => {
            setHeight(value);
          }}
          inputMode="numeric"
        ></TextInput>
      </View>

      <View style={styles.container1}>
        <Text>Weight(in kilogram):</Text>
        <TextInput
          style={styles.input}
          value={Weight.toString()}
          onChangeText={(value) => {
            setWeight(value);
          }}
          inputMode="numeric"
        ></TextInput>
      </View>

      <View style={styles.container1}>
        <Text>Gender:</Text>
        <TextInput
          style={styles.input}
          value={Gender}
          onChangeText={(value) => {
            setGender(value);
          }}
        ></TextInput>
      </View>
      <Button mode="contained" onPress={()=>{submit()}}>Save</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  name: {
    flexDirection: "row",
  },
  nameText: {
    fontSize: 30,
  },
  Details: {
    flexDirection: "row",
    fontSize: 25,
  },
  input: {
    width: 200,
    height: 50,
  },
  label: {},
  container1: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default EditProfile;
