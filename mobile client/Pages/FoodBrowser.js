import * as React from "react";
import { DataTable } from "react-native-paper";
import { View, Button, ScrollView, FlatList,Pressable,Text } from "react-native";
import { set } from "date-fns";
import { useSelector } from "react-redux";
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from "react-native";
import FoodItem from "./FoodItem";

const FoodBrowser = ({navigation}) => {
  const [page, setpage] = React.useState(0);

  const URL = useSelector((state) => state.url.URL);
  const data = useSelector((state) => state.getfood.data);

  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const filteredData = data.filter((item) =>
  item.food.toLowerCase().includes(searchQuery.toLowerCase())
);

function toFoodItem(item) {
  navigation.navigate("FoodItemTest",{props:item});
}

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.bar}
      />
      <Pressable style={styles.title}><Text>name</Text><Text>calories</Text></Pressable>
      <FlatList
        data={filteredData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Pressable style={styles.button} onPress={()=>{toFoodItem(item)}}><Text style={styles.label}>{item.food}</Text><Text style={styles.label}>{item.cal}</Text></Pressable>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor:"#f0e9f3",
    padding:10,
    margin:2,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  label:{
    fontSize:20
  },
  title:{
    flexDirection:"row",
    justifyContent:"space-between",
    padding:10
  },
  bar:{
  }

});



export default FoodBrowser;
