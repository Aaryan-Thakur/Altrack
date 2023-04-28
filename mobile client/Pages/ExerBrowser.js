import * as React from "react";
import { DataTable } from "react-native-paper";
import { View, Button, ScrollView, FlatList,Pressable,Text } from "react-native";
import { set } from "date-fns";
import { useSelector } from "react-redux";
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from "react-native";
import FoodItem from "./FoodItem";

const ExerBrowser = ({navigation}) => {
  const [page, setpage] = React.useState(0);

  const URL = useSelector((state) => state.url.URL);
  const data = useSelector((state) => state.exer.exerdata);

  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const filteredData = data.filter((item) =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase())
);

function toExer(item) {
    navigation.navigate("Exercises",{props:item});
  }

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <FlatList
        data={filteredData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Pressable style={styles.button} onPress={()=>{toExer(item)}}><Text style={styles.label}>{item.name}</Text></Pressable>}
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
    justifyContent:"center",
  },
  label:{
    fontSize:15
  },
  title:{
    flexDirection:"row",
    justifyContent:"space-between",
    padding:10
  }

});



export default ExerBrowser;
