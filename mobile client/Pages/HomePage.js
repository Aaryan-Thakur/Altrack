
import { StyleSheet, Text, TextInput, View,Button  } from 'react-native';

import axios from 'axios';

// import { Camera, CameraType } from 'expo-camera';
export default function HomePage({navigation}) {

  return(
    <View>
      <View style={styles.rcal}>
      <Text style={styles.rcalt1}>Count</Text>
      <Text style={styles.rcalt2}>2000</Text>
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
  rcal:{
    flex :0,
    backgroundColor:"cyan",
    height:'40%',
    
  },

  rcalt1:{
    flex:1,
    alignSelf:"center" 
  },
  
  rcalt2:{
    fontSize:20,
    flex:1,
    alignSelf:"center" 
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


