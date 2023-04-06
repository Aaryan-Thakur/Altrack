import * as React from "react";
import { DataTable, TextInput } from "react-native-paper";
import { View, Text, ScrollView, Image } from "react-native";
import { set } from "date-fns";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
const Entry = (props) => {
  const data = props.route.params.data;
  const date = useSelector((state) => state.date.date);

  const [pickervalues, setpickervalues] = React.useState([
    { key: 1, label: "Auto", value: "Auto" },
    { key: 2, label: "Breakfast", value: "BRF" },
    { key: 3, label: "Brunch", value: "BRU" },
    { key: 4, label: "Lunch", value: "LUN" },
    { key: 5, label: "Snacks", value: "SNK" },
    { key: 6, label: "Dinner", value: "DIN" },
    { key: 7, label: "Supper", value: "SUP" },
  ]);

  console.log(data);
  return (
    <View>
      <View>
        <View style={styles.datecontainer}>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Picker
          style={styles.picker}
          selectedValue={data.slot}
          onValueChange={(picker) => console.log(picker)}
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
              value={data.weight}
              onChangeText={(value) => console.log(value)}
              keyboardType="numeric"
              style={styles.weightinput}
            ></TextInput>
            <Text>g</Text>
          </View>
          <View style={styles.calorie}>
            <Text>{`${Math.round(data.weight * 25 * 0.01)} cal`}</Text>
          </View>
        </View>
      </View>
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
    minHeight: 120,
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
    width: 100,
    textAlign: "right",
  },
  calorie: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 72,
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
});

export default Entry;
