import React from 'react'
import { StyleSheet, Text, TextInput, View,Button,ScrollView,Image  } from 'react-native';


const Food = () => {
  return (
    <View style={styles.container}>
        <Image style={styles.tinyLogo} source={{uri:'https://media.discordapp.net/attachments/761611417761611776/1067865181524328559/FnSYQ4SX0AAPxkk.png?width=712&height=701'}}></Image>
        <Text style={styles.name} >Food</Text>
        <Text>serv</Text>
        <Text>Calories</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:"row",
    width:'90%',
    justifyContent:"space-between",
    alignItems:"center",
    paddingVertical:10
    },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  name: {
    fontSize:35
    },
});

export default Food