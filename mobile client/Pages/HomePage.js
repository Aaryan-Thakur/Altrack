import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { setDate, setFood, setLogin, setFoodData } from "../state";
import { parse, subDays, format, addDays, compareAsc } from "date-fns";
import { useState, useEffect } from "react";
import { CommonActions } from "@react-navigation/native";
import Food from "../components/Food";
import { MenuProvider } from "react-native-popup-menu";

export default function HomePage({ navigation }) {
  const dispatch = useDispatch();
  const data1 = useSelector((state) => state.getfood.data);

  const delcount = useSelector((state) => state.tgc);

  let [cal, setcal] = useState(0);

  useEffect(() => {
    fetch("http://192.168.0.104:3000/api/getfood")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setFoodData({ data: data }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // DATE CONFIG
  const date = useSelector((state) => state.date.date);

  const prevdate = () => {
    const prevday = format(
      subDays(parse(date, "dd/MM/yy", new Date()), 1),
      "dd/MM/yy"
    );
    dispatch(setDate({ date: prevday }));
  };

  const nextdate = () => {
    const currentdate = new Date().getTime();
    const nextday = addDays(parse(date, "dd/MM/yy", new Date()), 1);
    const nextdayf = format(nextday, "dd/MM/yy");
    if (compareAsc(nextday, currentdate) == 1) {
    } else {
      dispatch(setDate({ date: nextdayf }));
    }
  };

  //FOOD CONFIG
  let food = useSelector((state) => state.food.food);
  let auth = useSelector((state) => state.auth);

  function getfood() {
    fetch("http://192.168.0.104:3000/api/food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        auth: auth,
        date: date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setFood({ food: data.food }));

        setcal(data.tcal);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getfood();
  }, []);

  useEffect(() => {
    getfood();
  }, [date]);


  let trigger = useSelector((state) => state.tgc);
  useEffect(() => {
    getfood();
  }, [trigger]);

  //Status bar config
  setStatusBarBackgroundColor("white");

  //Functions
  function tocamera() {
    navigation.navigate("Camera");
  }

  function toPPage() {
    navigation.navigate("PPage");
  }

  function toFoodB() {
    navigation.navigate("FoodB");
  }

  function toRecipeB() {
    navigation.navigate("RecipeB");
  }

  function toAddFood() {
    navigation.navigate("AddFood");
  }

  //Profile Menu
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  //LOGOUT FUNCTION
  function toLogin() {
    navigation.navigate("Login");

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );

    dispatch(
      setLogin({
        user: "null",
        token: "null",
        name: "null",
      })
    );
  }

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.datecontainer}>
            <Button
              onPress={prevdate}
              icon="chevron-left"
              labelStyle={styles.datearrow}
            ></Button>
            <Text style={styles.date}>{date}</Text>
            <Button
              onPress={nextdate}
              icon="chevron-right"
              labelStyle={styles.datearrow}
            ></Button>
          </View>

          <View style={styles.rcal}>
            <Text style={styles.rcalt1}>Total Cal Count</Text>
            <Text style={styles.rcalt2}>{cal}</Text>
            <Text></Text>
          </View>

          <MenuProvider>
            <View>
              {food.breakfast.length > 0 ? (
                <View style={styles.card}>
                  <View style={styles.titlecard}>
                    <Text style={styles.title}>Breakfast</Text>
                  </View>
                  {food.breakfast.map((item) => (
                    <Food data={item} key={item.id} />
                  ))}
                </View>
              ) : (
                <View></View>
              )}

              {food.brunch.length > 0 ? (
                <View style={styles.card}>
                  <View style={styles.titlecard}>
                    <Text style={styles.title}>Brunch</Text>
                  </View>
                  {food.brunch.map((item) => (
                    <Food data={item} key={item.id} />
                  ))}
                </View>
              ) : (
                <View></View>
              )}

              {food.lunch.length > 0 ? (
                <View style={styles.card}>
                  <View style={styles.titlecard}>
                    <Text style={styles.title}>Lunch</Text>
                  </View>
                  {food.lunch.map((item) => (
                    <Food data={item} key={item.id} />
                  ))}
                </View>
              ) : (
                <View></View>
              )}

              {food.snacks.length > 0 ? (
                <View style={styles.card}>
                  <View style={styles.titlecard}>
                    <Text style={styles.title}>Snacks</Text>
                  </View>
                  {food.snacks.map((item) => (
                    <Food data={item} key={item.id} />
                  ))}
                </View>
              ) : (
                <View></View>
              )}

              {food.dinner.length > 0 ? (
                <View style={styles.card}>
                  <View style={styles.titlecard}>
                    <Text style={styles.title}>Dinner</Text>
                  </View>
                  {food.dinner.map((item) => (
                    <Food data={item} key={item.id} />
                  ))}
                </View>
              ) : (
                <View></View>
              )}

              {food.supper.length > 0 ? (
                <View style={styles.card}>
                  <View style={styles.titlecard}>
                    <Text style={styles.title}>Supper</Text>
                  </View>
                  {food.supper.map((item) => (
                    <Food data={item} key={item.id} />
                  ))}
                </View>
              ) : (
                <View></View>
              )}
            </View>
          </MenuProvider>
        </ScrollView>
        <Button
          style={styles.add}
          mode="contained"
          icon="plus"
          labelStyle={styles.logo}
          onPress={toAddFood}
        ></Button>

        <View style={styles.footer}>
          <View style={styles.button}>
            <Button
              style={styles.buttontextacc}
              mode="contained-tonal"
              onPress={() => toFoodB()}
              icon="food-apple"
            ></Button>
          </View>
          <View style={styles.button}>
            <Button
              style={styles.buttontext}
              mode="contained-tonal"
              onPress={() => toRecipeB()}
              title="Rec"
            >
              Rec
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              icon="camera-iris"
              style={styles.buttontextacc}
              mode="contained-tonal"
              onPress={() => toPPage()}
              title="Food+"
            ></Button>
          </View>
          <View style={styles.button}>
            <Button
              style={styles.buttontext}
              mode="contained-tonal"
              title="Exer"
            >
              Exe
            </Button>
          </View>

          <View style={styles.button}>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Button
                  icon="account-circle"
                  style={styles.buttontextacc}
                  mode="contained"
                  onPress={openMenu}
                ></Button>
              }
            >
              <Menu.Item
                titleStyle={styles.menuName}
                onPress={() => {}}
                title={auth.name}
              />
              <Divider />
              <Menu.Item
                titleStyle={styles.menuProfile}
                onPress={() => {}}
                title="Profile"
              />
              <Menu.Item
                titleStyle={styles.menuSettings}
                onPress={() => {}}
                title="Settings"
              />
              <Menu.Item
                titleStyle={styles.menuLogout}
                onPress={() => toLogin()}
                title="Logout"
              />
            </Menu>
          </View>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: 50,
  },
  button: {
    width: 90,
    padding: 6,
    color: "#FFF4D2",
  },

  add: {
    width: 80,
    alignSelf: "flex-end",
    height: 80,
    marginRight: 20,
    marginBottom: 15,
  },
  logo: {
    fontSize: 50,
    marginLeft: 10,
  },

  buttontext: {
    borderRadius: 8,
  },
  buttontextacc: {
    paddingLeft: 15,
    borderRadius: 8,
  },

  datecontainer: {
    backgroundColor: "#756a8f",
    height: 45,
    marginTop: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  datearrow: {
    fontSize: 50,
    color: "#FFF4D2",
  },
  date: {
    color: "#FFF4D2",
    fontSize: 20,
  },
  rcal: {
    flex: 0,
    backgroundColor: "#ccbcfa",
    height: 150,
    alignItems: "center",
  },

  rcalt1: {
    flex: 1,
    alignSelf: "center",
  },

  rcalt2: {
    fontSize: 70,
    flex: 5,
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
  nameF: {
    fontSize: 35,
  },
  menuName: {},
  menuProfile: {},
  menuSettings: {},
  menuLogout: {
    color: "red",
  },
});
