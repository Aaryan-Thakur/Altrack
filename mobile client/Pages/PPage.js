// import { StyleSheet, Text,  View } from "react-native";
// import axios from "axios";
// import { Searchbar,TextInput,Button } from "react-native-paper";

// // import { Camera, CameraType } from 'expo-camera';

// export default function PPage(props) {

//   // if (props["route"]["params"]["prediction"]["predictions"].length == 0) {
//   //   return (
//   //     <View style={styles.container}>
//   //       <Text style={styles.text}>Cannot Predict</Text>
//   //       <Button
//   //         title="Done"
//   //         onPress={() => props.navigation.navigate("Home")}
//   //       />
//   //     </View>
//   //   );
//   // }

//   // console.log(
//   //   "params are: ",
//   //   props["route"]["params"]["prediction"]["predictions"]
//   // );

//   // const prediction = props["route"]["params"]["prediction"]["predictions"][0];
//   // const item = prediction["class"];
//   // let items = [
//   //   "besan_cheela",
//   //   "dosa",
//   //   "gulab_jamun",
//   //   "idli",
//   //   "palak_paneer",
//   //   "poha",
//   //   "samosa",
//   // ];
//   // let calories = 0;

//   // if (item == items[0]) calories = 269;
//   // if (item == items[1]) calories = 170;
//   // if (item == items[2]) calories = 175;
//   // if (item == items[3]) calories = 120;
//   // if (item == items[4]) calories = 84;
//   // if (item == items[5]) calories = 150;
//   // if (item == items[6]) calories = 308;

//   return (
//     // <View style={styles.container}>
//     //   <Text style={styles.text}>{'Food Item: '+prediction['class']}</Text>
//     //   <Text style={styles.text}>{'Confidence:' + prediction['confidence']*100+'%'}</Text>
//     //   <Text style={styles.text}>{'Approximate Calories: '+calories+' per 100g'}</Text>
//     //   <Button title='Done' onPress={()=> props.navigation.navigate('Home')} />
//     // </View>
//     <View>
//       <View>
//         <Text>Breakfast</Text>
//         <View style={styles.container}>
//           <Searchbar style={styles.search} placeholder="Search" />
//           <TextInput style={styles.cal} placeholder="g"/>
//           <Button style={styles.button} icon="plus" mode="contained"/>
//         </View>
//       </View>
//       <View>
//         <Text>Lunch</Text>
//         <View style={styles.container}>
//           <Searchbar style={styles.search} placeholder="Search" />
//           <TextInput style={styles.cal} placeholder="g"/>
//           <Button style={styles.button} icon="plus" mode="contained"/>
//         </View>
//       </View>
//       <View>
//         <Text>Snacks</Text>
//         <View style={styles.container}>
//           <Searchbar style={styles.search} placeholder="Search" />
//           <TextInput style={styles.cal} placeholder="g"/>
//           <Button style={styles.button} icon="plus" mode="contained"/>
//         </View>
//       </View>
//       <View>
//         <Text>Dinner</Text>
//         <View style={styles.container}>
//           <Searchbar style={styles.search} placeholder="Search" />
//           <TextInput style={styles.cal} placeholder="g"/>
//           <Button style={styles.button} icon="plus" mode="contained"/>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection:"row",
//     justifyContent:"space-around"
//   },
//   text: {
//     color: "blue",
//   },
//   search:{
//     width:250,
//   },
//   cal:{
//     width:70,
//     inputMode:"numeric"



//   },
//   button:{

//     padding:10,
//     paddingLeft:23,
//     width:6
//   }
// });
