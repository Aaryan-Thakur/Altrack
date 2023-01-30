
import { StyleSheet, Text, TextInput, View,Button,ScrollView,Image,But  } from 'react-native';

import axios from 'axios';
import { useState } from 'react';
import { setStatusBarBackgroundColor, setStatusBarStyle, StatusBar } from 'expo-status-bar';

import Food from '../components/Food';

// import { Camera, CameraType } from 'expo-camera';
export default function HomePage({navigation}) {

  const [date, setfirst] = useState(new Date().toLocaleDateString())
  setStatusBarBackgroundColor('white');
  return(
    <View style={{flex: 1}}>
    <ScrollView>
      
      <View style={styles.date}>
          <Text>{date}</Text>
      </View>



      <View style={styles.rcal}>
        <Text style={styles.rcalt1}>Count</Text>
        <Text style={styles.rcalt2}>2000</Text>
      </View>

      <View>

        <View style={styles.card}>
          <View style={styles.titlecard}>
            <Text style={styles.title} >Breakfast</Text>
          </View>
          <Food/>
        </View>

        <View style={styles.card}>
          <View style={styles.titlecard}>
            <Text style={styles.title} >Lunch</Text>
          </View>
          <Food/>
        </View>

        <View style={styles.card}>
          <View style={styles.titlecard}>
            <Text style={styles.title} >Snacks</Text>
          </View>
          <Food/>
        </View>

        <View style={styles.card}>
          <View style={styles.titlecard}>
            <Text style={styles.title} >Dinner</Text>
          </View>
          <Food/>
        </View>

      </View>




    </ScrollView>
    <View style={styles.footer}>
        <View  style={styles.button}><Button  title='ADD +'></Button></View>
        <View  style={styles.button}><Button title='ADD +'></Button></View>
        <View  style={styles.button}><Button title='ADD +'></Button></View>
        <View  style={styles.button}><Button title='ADD +'></Button></View>
        <View  style={styles.button}><Button title='ADD +'></Button></View>
      </View>
</View>

  );



  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.text}>Alltrack</Text>
  //     <Button title='Predict Food' onPress={()=> navigation.navigate('Camera')}/>
  //   </View>
  // );
}

const styles= StyleSheet.create({
  footer:{
    flexDirection:"row",
    width:"100%",
    height:50
  },
  button:{
    width:72,
    padding:6
  },
  date:{
    backgroundColor:'#756a8f',
    height:35,
    marginTop:27,
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
  },
  rcal:{
    flex :0,
    backgroundColor:"#ccbcfa",
    height:150,
    alignItems:"center"    
  },

  rcalt1:{
    flex:1,
    alignSelf:"center" 
  },
  
  rcalt2:{
    fontSize:70,
    flex:5,
  },
  
  card:{
    minHeight:120,
    alignItems:"center",
    backgroundColor:"#f0e9f3",
    borderColor:"black",
    borderWidth:0.2 
  },
  titlecard: {
  },
  title:{
    fontSize:15
  }


})

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text:{
//     color: 'blue'
     
//   }
// });


