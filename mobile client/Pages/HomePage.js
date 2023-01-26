
import { StyleSheet, Text, TextInput, View,Button  } from 'react-native';

import axios from 'axios';

// import { Camera, CameraType } from 'expo-camera';
export default function HomePage({navigation}) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Alltrack</Text>
      <Button title='Predict Food' onPress={()=> navigation.navigate('Camera')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: 'blue'
     
  }
});

