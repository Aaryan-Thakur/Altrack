import * as React from "react";
import { Button } from "react-native-paper";
import { View, Text, ScrollView, Image, TextInput } from "react-native";
import { set } from "date-fns";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import FoodItem from "./FoodItem";

import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setTGC } from "../state";

const Entry = (props) => {
  let trigger = useSelector((state) => state.tgc);
  const dispatch = useDispatch();
  const URL = useSelector((state) => state.url.URL);

  const navigation = useNavigation();

  const data = props.route.params.data;
  console.log(data);
  const date = useSelector((state) => state.date.date);

  const [pickervalues, setpickervalues] = React.useState([
    { key: 1, label: "Breakfast", value: "BRF" },
    { key: 2, label: "Brunch", value: "BRU" },
    { key: 3, label: "Lunch", value: "LUN" },
    { key: 4, label: "Snacks", value: "SNK" },
    { key: 5, label: "Dinner", value: "DIN" },
    { key: 6, label: "Supper", value: "SUP" },
  ]);

  const [Weight, setWeight] = useState(data.weight);
  const [Slot, setSlot] = useState(data.slot);

  const [fetchdata, setfetchdata] = useState({
    food: "",
    cal: 0,
    unit: "",
    ingredients: "",
    recipe: "",
    url: "https://res.cloudinary.com/dn7xzx3gy/image/upload/v1679733347/photo-1546069901-ba9599a7e63c_rzgbxd.jpg",
    id: "",
  });

  const onWeightUpdate = (props) => {
    const regex = /^\d{0,4}(\.\d{0,1})?$/;
    const isValid = regex.test(props);
    if (isValid) {
      setWeight(props);
    }
  };

  useEffect(() => {
    fetch(`${URL}/api/entry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        id: data.foodid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setfetchdata(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const toHome = () => {
    navigation.navigate("Home");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  };

  const update = () => {
    fetch(`${URL}/api/uentry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        id: data.foodid,
        weight: Weight,
        cal: Weight * fetchdata.cal * 0.01,
        slot: Slot,
        carb: Math.round(Weight * fetchdata.carb * 0.01),
        protein: Math.round(Weight * fetchdata.protein * 0.01),
        fat: Math.round(Weight * fetchdata.fat * 0.01),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toHome();
        dispatch(setTGC());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={styles.datecontainer}>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Picker
          style={styles.picker}
          selectedValue={Slot}
          onValueChange={(picker) => {
            setSlot(picker);
          }}
        >
          {pickervalues.map((item) => (
            <Picker.Item
              key={item.key}
              label={item.label}
              value={item.value}
              style={styles.pickeritem}
            />
          ))}
        </Picker>

        <View style={styles.containerF}>
          <View style={styles.weight}>
            <TextInput
              value={Weight}
              onChangeText={(value) => onWeightUpdate(value)}
              keyboardType="numeric"
              style={styles.weightinput}
            ></TextInput>
            <Text style={{ fontSize: 20 }}>g</Text>
          </View>
          <View style={styles.calorie}>
            <Text style={{ fontSize: 20 }}>{`${Math.round(
              Weight * fetchdata.cal * 0.01
            )} cal`}</Text>
          </View>
          <Button
            mode="contained"
            icon="check"
            style={styles.button}
            labelStyle={styles.buttonL}
            onPress={() => {
              update();
            }}
          ></Button>
        </View>

        <View style={styles.ncount}>
          <Text>Carb:{Math.round(Weight * fetchdata.carb * 0.01)}</Text>
          <Text>Protein:{Math.round(Weight * fetchdata.protein * 0.01)}</Text>
          <Text>Fat:{Math.round(Weight * fetchdata.fat * 0.01)}</Text>
        </View>
      </View>
      <FoodItem data={fetchdata} />
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    minHeight: "100%",
  },
  datecontainer: {
    backgroundColor: "#756a8f",
    height: 45,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  date: {
    color: "#FFF4D2",
    fontSize: 20,
  },
  card: {
    minHeight: 150,
    alignItems: "center",
    backgroundColor: "#f0e9f3",
    borderColor: "black",
    borderWidth: 0.2,
  },
  titlecard: {},
  title: {
    fontSize: 20,
    width: 165,
    padding: 5,
  },
  containerF: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  tinyLogoF: {
    width: 65,
    height: 65,
    marginRight: 25,
  },
  weight: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    width: 70,
    marginRight: 5,
    justifyContent: "flex-end",
    marginLeft: 15,
  },
  ncount: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  weightinput: {
    backgroundColor: "#e8e1ed",
    borderBottomWidth: 1,
    borderBottomColor: "#a691cf",
    fontSize: 15,
    marginRight: 5,
    height: 40,
    width: 70,
    textAlign: "right",
    fontSize: 20,
  },
  calorie: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 100,
    fontSize: 20,
    marginLeft: -30,
  },
  picker: {
    width: "36%",
    padding: 0,
    margin: 0,
    overflow: "hidden",
    borderWidth: 0,
  },
  pickeritem: {
    fontSize: 15,
    paddingRight: 0,
    margin: 0,
  },
  button: {
    height: 60,
    marginBottom: 15,
    marginLeft: 15,
    padding: 0,
  },
  buttonL: {
    marginRight: 10,
    marginBottom: 10,
    fontSize: 25,
  },
});

export default Entry;
