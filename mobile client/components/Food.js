import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { renderers } from 'react-native-popup-menu';
import { useSelector, useDispatch } from "react-redux";
import { setTGC } from "../state";
import { useNavigation } from '@react-navigation/native';





const Food = (props) => {
  const URL = useSelector(state => state.url.URL);

  const navigation = useNavigation();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  let trigger = useSelector((state) => state.tgc);
  const dispatch = useDispatch();

  const delentry = () =>{

    fetch(`${URL}/api/delentry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        id:props.data.id
      }),
    }) .then((response) => response.json())
    .then((data) => {
      dispatch(setTGC())
      console.log(trigger)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const open = () =>{
    navigation.navigate("Entry",props);
  }

  return (
    // <View style={styles.containerF}>
    //   <Image
    //     style={styles.tinyLogoF}
    //     source={{
    //       uri: `${props.data.imgurl}`,
    //     }}
    //   ></Image>
    //   <Text style={styles.title}>{props.data.name}</Text>
    //   <Text style={styles.weight} >{props.data.weight}g</Text>
    //   <Text style={styles.calorie} >{props.data.calories} cal</Text>
    // </View>
    <View style={styles.containerF}>
      <Menu renderer={renderers.ContextMenu} >
        <MenuTrigger>
          <View style={styles.containerF}>
            <Image
              style={styles.tinyLogoF}
              source={{
                uri: `${props.data.imgurl}`,
              }}
            ></Image>
            <Text style={styles.title}>{props.data.name}</Text>
            <Text style={styles.weight}>{props.data.weight}g</Text>
            <Text style={styles.calorie}>{props.data.calories} cal</Text>
          </View>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={()=>{open()}} value={1} text="Open" />
          <MenuOption onSelect={()=>{delentry()}} value={3}>
            <Text style={{ color: "red" }}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Food;
