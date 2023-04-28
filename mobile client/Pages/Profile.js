import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { Button } from "react-native-paper";

const Profile = ({navigation}) => {
  const URL = useSelector((state) => state.url.URL);
  let auth = useSelector((state) => state.auth);
  const [userdata, setdata] = useState({
    data1: [
      {
        email: "",
        fname: "",
        lname: "",
        mobile: "",
        password: "",
        userid: 0,
      },
    ],
    data2: [
      { gender: null, height: null, tcal: null, userid: 0, weight: null },
    ],
  });

  useEffect(() => {
    fetch(`${URL}/api/userdata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        uid: auth.user,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.name}>
          <Text style={styles.nameText}>{userdata.data1[0].fname}</Text>
          <Text style={styles.nameText}>{userdata.data1[0].lname}</Text>
        </View>
        <Text>{userdata.data1[0].email}</Text>
        <Text>{userdata.data1[0].mobile}</Text>
      </View>
      <View>
        <View style={styles.Details}><Text style={{fontSize:20}} >Target Calories:   {userdata.data2[0].tcal}</Text><Text style={{fontSize:15,alignSelf:"center"}} >cal</Text></View>
        <View style={styles.Details}><Text style={{fontSize:20}} >Height:                      {userdata.data2[0].height}</Text><Text style={{fontSize:15,alignSelf:"center"}} >m</Text></View>
        <View style={styles.Details}><Text style={{fontSize:20}} >Weight:                      {userdata.data2[0].weight}</Text><Text style={{fontSize:15,alignSelf:"center"}} >kg</Text></View>
        <View style={styles.Details}><Text style={{fontSize:20}} >Gender:                     {userdata.data2[0].gender}</Text></View>
        <View style={styles.Details}><Text style={{fontSize:20}} >BMI:                            {((userdata.data2[0].weight/((userdata.data2[0].height/100)))/(userdata.data2[0].height/100)).toFixed(2)}</Text></View>

      </View>
      <Button
          style={styles.add}
          mode="contained"
          icon="pencil-outline"
          labelStyle={styles.logo}
          onPress={()=>{navigation.navigate("EditProfile",{props:userdata})}}
        ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height:"100%"
  },
  name: {
    flexDirection: "row",
  },
  nameText: {
    fontSize: 30,
  },
  Details:{
    flexDirection:"row",
    fontSize:25,
    paddingVertical:15
  },
  add: { 
    width: 80,
    alignSelf: "flex-end",
    height: 80,
    marginRight: 15,
    marginBottom: 15,
    marginTop: 250,

  },
  logo: {
    fontSize: 50,
    marginLeft: 10,
  },
});

export default Profile;
