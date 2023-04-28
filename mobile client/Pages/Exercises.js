import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";

const Exercises = (props) => {
  const data = props.route.params.props;
  console.log(data);
  return (
    <ScrollView style={styles.containerF}>
      <Text style={styles.title}>{data.name}</Text>
      <Image
        style={styles.tinyLogoF}
        source={{
          uri: `${data.gifurl}`,
        }}
      ></Image>
      <View style={styles.container}>
        <View style={styles.recipe}>
          <Text>Target:</Text>
          <Text>{data.target}</Text>
        </View>
        <View style={styles.ingredients}>
          <Text>Body-Part:</Text>
          <Text>{data.bodypart}</Text>
        </View>
        <View style={styles.ingredients}>
          <Text>Equipment:</Text>
          <Text>{data.equipment}</Text>
        </View>
      </View>

      <View style={styles.recipe}>
        <Text>Instructions:</Text>
        <Text>
          Begin by warming up your body with a few minutes of light cardio, such
          as jogging in place or jumping jacks. Choose an exercise that targets
          the muscle group you want to work on, such as squats for your legs or
          push-ups for your chest and arms. Start with a light weight or a
          modified version of the exercise to ensure proper form and technique.
          Breathe deeply and focus on your movements, keeping your core engaged
          and your joints aligned. Perform 8-12 repetitions of the exercise, or
          as many as you can while maintaining good form. Rest for 30-60 seconds
          between sets, depending on your fitness level and the intensity of the
          exercise. Gradually increase the weight or difficulty of the exercise
          as you become stronger and more confident. Incorporate a variety of
          exercises into your routine to challenge your body and prevent
          boredom. Cool down with some stretching and deep breathing to help
          your muscles recover and prevent injury. Remember to stay hydrated and
          listen to your body, adjusting your workout as needed to avoid pain or
          discomfort.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerF: {
    padding: 10,
    paddingLeft: 15,
  },
  container: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  tinyLogoF: {
    width: 400,
    height: 400,
    marginRight: 25,
  },
  title: {
    fontSize: 20,
    width: "90%",
    padding: 5,
  },
  title1: {},
  ingredients: {
    padding: 25,
  },
  recipe: {
    padding: 25,
  },
});

export default Exercises;
