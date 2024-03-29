import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TextInput,
  ToastAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Searchbar, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { compose } from "@reduxjs/toolkit";
import { parse } from "date-fns";


const AddFood = (props) => {
  const navigation = useNavigation();

  let data = useSelector((state) => state.getfood.data);
  const date = useSelector((state) => state.date.date);
  const auth = useSelector((state) => state.auth);
  const URL = useSelector((state) => state.url.URL);

  const [selectedFood, setselectedFood] = React.useState([
    false,
    "",
    -1,
    "",
    "",
    {},
  ]);

  const [pickervalues, setpickervalues] = React.useState([
    { key: 1, label: "Auto", value: "Auto" },
    { key: 2, label: "Breakfast", value: "BRF" },
    { key: 3, label: "Brunch", value: "BRU" },
    { key: 4, label: "Lunch", value: "LUN" },
    { key: 5, label: "Snacks", value: "SNK" },
    { key: 6, label: "Dinner", value: "DIN" },
    { key: 7, label: "Supper", value: "SUP" },
  ]);

  let [udata, setuData] = React.useState([]);




  const onChangeSearch = (query) => {
    setselectedFood([query.length > 0, query, -1, "", "", {}]);
  };

  const filteredData = data.filter((item) =>
    item.food.toLowerCase().includes(selectedFood[1].toLowerCase())
  );

  const onSelect = (props) => {
    setselectedFood([
      false,
      props.food,
      props.id,
      props.imgurl,
      props.stdc,
      props.ndata,
    ]);
  };

  const checkifalreadyexists = (id) => {
    const result = udata.find((obj) => obj.id === id);
    return result ? true : false;
  };

  if (!(props.route.params == undefined)) {
    if(!checkifalreadyexists(props.route.params.item.id)){
      console.log("asodniandiasndsi");
      item = props.route.params.item;
      // const currentTime = new Date();
      // const formattedTime = currentTime.toLocaleTimeString([], {
      //   hour: "2-digit",
      //   minute: "2-digit",
      //   second: "2-digit",
      // });

      let currentDate = new Date();
      let currentTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

      udata.push({
        id: item.id,
        food: item.food,
        imgurl: item.url,
        weight: 0,
        cal: 0,
        stdc: item.cal,
        date: date,
        time: currentTime,
        slot: "Auto",
        ndata: { c: item.carb, p: item.protein, f: item.fat },
        carbs: 0,
        protiens: 0,
        fats: 0,
      });
    }
  }

  const onAdd = (props) => {
    console.log(props.ndata);
    if (
      !selectedFood[0] &&
      props.food != "" &&
      !checkifalreadyexists(props.id)
    ) {
      // const currentTime = new Date();
      // const formattedTime = currentTime.toLocaleTimeString();
      let currentDate = new Date();
      let currentTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

      setselectedFood([false, "", -1, "", "", {}]);

      udata.push({
        id: props.id,
        food: props.food,
        imgurl: props.imgurl,
        weight: 0,
        cal: 0,
        stdc: props.stdc,
        date: date,
        time: currentTime,
        slot: "Auto",
        ndata: props.ndata,
        carbs: 0,
        protiens: 0,
        fats: 0,
      });
    }
  };

  const clear = () => {
    setuData([]);
  };

  const onWeightUpdate = (props) => {
    const regex = /^\d{0,4}(\.\d{0,1})?$/;
    const isValid = regex.test(props.value);
    if (isValid) {
      const updatedData = udata.map((item) => {
        if (item.id === props.id) {
          return {
            ...item,
            weight: props.value,
            cal: Math.round(item.stdc * props.value * 0.01),
            carbs: Math.round(item.ndata.c * 0.01 * props.value),
            protiens: Math.round(item.ndata.p * 0.01 * props.value),
            fats: Math.round(item.ndata.f * 0.01 * props.value),
          };
        }
        return item;
      });
      setuData(updatedData);
      console.log(updatedData);
    }
  };

  const onSlotUpdate = (props) => {
    const updatedData = udata.map((item) => {
      if (item.id === props.id) {
        return {
          ...item,
          slot: props.picked,
        };
      }
      return item;
    });
    setuData(updatedData);
  };

  function toHome() {
    navigation.navigate("Home");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  }

  const submit = () => {
    let valid = true
    udata.map((item) => {
      if (item.weight == "") {
        ToastAndroid.show(
          "Please enter weights for all entries",
          ToastAndroid.SHORT
        );
        valid = false
      } else if (item.weight == 0) {
        ToastAndroid.show(
          "Please enter weights for all entries",
          ToastAndroid.SHORT
        );
        valid = false
      } else {
        
        valid=true;
      }
    });
    if(valid){
      fetch(`${URL}/api/addfood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          id: auth.user,
          data: udata,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data == "added") {
            ToastAndroid.show(
              "Entries Addded Successfully",
              ToastAndroid.SHORT
            );
            toHome();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const [day, setday] = useState(days[parse(date, "dd/MM/yy", new Date()).getDay()])

  return (
    <KeyboardAvoidingView style={styles.maincontainer}>
      <View>
        <View style={styles.datecontainer}>
          <Text style={styles.date}>{date}     {day}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={selectedFood[1]}
          style={styles.search}
        />
        <Button
          style={styles.addbtn}
          labelStyle={styles.addbtnl}
          icon="plus"
          mode="contained"
          onPress={() =>
            onAdd({
              food: selectedFood[1],
              id: selectedFood[2],
              imgurl: selectedFood[3],
              stdc: selectedFood[4],
              ndata: selectedFood[5],
            })
          }
          onLongPress={() => clear()}
        ></Button>
      </View>
      {selectedFood[0] && (
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <KeyboardAvoidingView>
              <Button
                style={styles.listitem}
                onPress={() =>
                  onSelect({
                    food: item.food,
                    id: item.id,
                    imgurl: item.url,
                    stdc: item.cal,
                    ndata: { c: item.carb, p: item.protein, f: item.fat },
                  })
                }
              >
                {item.food}
              </Button>
            </KeyboardAvoidingView>
          )}
          style={styles.list}
        />
      )}
      <ScrollView style={styles.scrollcontainer}>
        {udata.map((item) => (
          <View style={styles2.card} key={item.id}>
            <Picker
              style={styles.picker}
              selectedValue={item.slot}
              onValueChange={(picker) =>
                onSlotUpdate({ picked: picker, id: item.id })
              }
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

            <View style={styles2.containerF}>
              <Image
                style={styles2.tinyLogoF}
                source={{
                  uri: `${item.imgurl}`,
                }}
              ></Image>
              <Text style={styles2.title}>{item.food}</Text>

              <View style={styles2.weight}>
                <TextInput
                  value={item.weight.toString()}
                  onChangeText={(value) =>
                    onWeightUpdate({ value: value, id: item.id })
                  }
                  keyboardType="numeric"
                  style={styles2.weightinput}
                ></TextInput>
                <Text>g</Text>
              </View>
              <View style={styles2.calorie}>
                <Text>{`${Math.round(
                  item.weight * item.stdc * 0.01
                )} cal`}</Text>
              </View>
            </View>
            <View style={styles2.ncount}>
              <Text>Carb:{Math.round(item.ndata.c * 0.01 * item.weight)}</Text>
              <Text>
                Protein:{Math.round(item.ndata.p * 0.01 * item.weight)}
              </Text>
              <Text>Fat:{Math.round(item.ndata.f * 0.01 * item.weight)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      {udata.length > 0 && (
        <Button
          onPress={() => submit()}
          style={styles.submit}
          mode="contained-tonal"
        >
          Submit
        </Button>
      )}
    </KeyboardAvoidingView>
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
  container: {
    display: "flex",
    flexDirection: "row",
  },
  search: {
    margin: 10,
    width: "75%",
  },
  weight: {
    margin: 10,
    width: "22%",
  },
  addbtn: {
    margin: 10,
    width: "15%",
    paddingLeft: 12,
  },
  addbtnl: {
    fontSize: 25,
  },
  list: {
    marginHorizontal: 10,
    width: "75%",
    paddingHorizontal: 10,
    backgroundColor: "#f3edf7",
    maxHeight: "50%",
  },
  listitem: {
    fontSize: 25,
  },
  picker: {
    width: "36%",
    padding: 0,
    margin: 0,
    overflow: "hidden",
    borderWidth: 0,
    // height:50
  },
  pickeritem: {
    fontSize: 15,
    paddingRight: 0,
    margin: 0,
  },
  scrollcontainer: {
    marginBottom: 172,
  },
  submit: {
    position: "absolute",
    top: 780,
    width: "100%",
  },
});

const styles2 = StyleSheet.create({
  card: {
    minHeight: 100,
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
  },
  weightinput: {
    backgroundColor: "#e8e1ed",
    borderBottomWidth: 1,
    borderBottomColor: "#a691cf",
    fontSize: 15,
    marginRight: 5,
    height: 40,
    width: 60,
    textAlign: "right",
    padding: 5,
  },
  calorie: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 72,
  },
  ncount: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default AddFood;
