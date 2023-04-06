import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  Image,
} from "react-native";

const NewFood = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.titlecard}>
        <Text style={styles.title}>Lunch</Text>
      </View>
      <View style={styles.containerF}>
        <Image
          style={styles.tinyLogoF}
          source={{
            uri: `${props.data.imgurl}`,
          }}
        ></Image>
        <Text style={{ fontSize: 25 }}>{props.data.name}</Text>
        <Text>{props.data.weight}g</Text>
        <Text>{props.data.calories} cal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 120,
    alignItems: "center",
    backgroundColor: "#f0e9f3",
    borderColor: "black",
    borderWidth: 0.2,
  },
  titlecard: {},
  title: {
    fontSize: 15,
  },
  containerF: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  tinyLogoF: {
    width: 50,
    height: 50,
  },
});

export default NewFood;
