import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";

const FoodItemTest = (props) => {
  const data = props.route.params.props
  return (
    <ScrollView>
      <View style={styles.containerF}>
        <Image
          style={styles.tinyLogoF}
          source={{
            uri: `${data.url}`,
          }}
        ></Image>
        <Text style={styles.title}>{data.food}</Text>
      </View>
      <View style={styles.ingredients}>
        <Text>Ingredients</Text>
        <Text>{data.ingredients}</Text>
      </View>
      <View style={styles.recipe}>
        <Text>Recipe</Text>
        <Text>{data.recipe}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerF: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent:"space-around"
  },
  tinyLogoF: {
    width: 100,
    height: 100,
    marginRight: 25,
  },
  title: {
    fontSize: 20,
    width: 165,
    padding: 5,
  },
  title1:{

  },
  ingredients:{
    padding:25
  },
  recipe:{
    padding:25
  }
});

export default FoodItemTest;
