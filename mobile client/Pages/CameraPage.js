// import axios from 'axios';
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Svg, { Circle } from "react-native-svg";
import { useSelector } from "react-redux";

export default function CameraPage({ navigation }) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  let data = useSelector((state) => state.getfood.data);
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      height: 1920,
      width: 1080,
      quality: 0.5,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = async () => {
      // shareAsync(photo.uri).then(() => {
      //   setPhoto(undefined);
      // });

      let prediction = null;
      console.log("ratio");
      await axios({
        method: "POST",
        // url: "https://detect.roboflow.com/indian-food-recogniiton/1?api_key=U1FVNiso8UhFC69emg6I",
        url: "https://detect.roboflow.com/mini-project-i3tnm/3?api_key=4ts8PBhYe2AwGYeTfz1p",

        data: photo.base64,
      })
        .then(function (response) {
          prediction = response.data.predictions[0].class;
          if (prediction == "Bhatura") {
            console.log("Bhatura");
            const fooditem = data.find((item) => item.food === "bhatura");
            toAddFood(fooditem);
          } 
          else if (prediction == "BhindiMasala") {
            console.log("BhindiMasala");
            const fooditem = data.find((item) => item.food === "bhindi masala");
            toAddFood(fooditem);

          }
           else if (prediction == "Biryani") {
            console.log("Biryani");
            const fooditem = data.find((item) => item.food === "Biryani");
            toAddFood(fooditem);
          }
           else if (prediction == "Chole") {
            console.log("Chole");
            const fooditem = data.find((item) => item.food === "chole");

            toAddFood(fooditem);
          }
           else if (prediction == "Dhokla") {
            console.log("Dhokla");
            const fooditem = data.find((item) => item.food === "dhokla");

            toAddFood(fooditem);
          
          } else if (prediction == "Jalebi") {
            console.log("Jalebi");
            const fooditem = data.find((item) => item.food === "jalebi");
            toAddFood(fooditem);
          }
           else if (prediction == "ShahiPaneer") {
            console.log("ShahiPaneer");
            const fooditem = data.find((item) => item.food === "shahi paneer");
            toAddFood(fooditem);
          }
           else if (prediction == "dal") {
            console.log("dal");
            const fooditem = data.find((item) => item.food === "dal");
            toAddFood(fooditem);
            // } else if (prediction == "dosa") {
            //   console.log("dosa");
          }
           else if (prediction == "gulab_jamun") {
            console.log("gulab_jamun");
            const fooditem = data.find((item) => item.food === "gulab jamun");
            toAddFood(fooditem);
          }
           else if (prediction == "idli") {
            console.log("idli");
            const fooditem = data.find((item) => item.food === "idli");
            toAddFood(fooditem);
            // } else if (prediction == "palak_paneer") {
            //   console.log("palak_paneer");
          }
           else if (prediction == "poha") {
            console.log("poha");
            const fooditem = data.find((item) => item.food === "poha");
            toAddFood(fooditem);
          } 
          else if (prediction == "rice") {
            console.log("rice");
            const fooditem = data.find((item) => item.food === "rice");
            toAddFood(fooditem);
          } 
          else if (prediction == "roti") {
            console.log("roti");
            const fooditem = data.find((item) => item.food === "roti");
            toAddFood(fooditem);
          } 
          else if (prediction == "samosa") {
            console.log("samosa");
            const fooditem = data.find((item) => item.food === "samosa");
            toAddFood(fooditem);
          } 
          else {
            ToastAndroid.show(
              "Unable to recognize food",
              ToastAndroid.SHORT
            );          }
        })
        .catch(function (error) {
          ToastAndroid.show(
            "Unable to recognize food",
            ToastAndroid.SHORT
          );
          console.log(error.message);
        });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    function toHome() {
      navigation.navigate("Home");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    }

    function toAddFood(props) {
      navigation.navigate("AddFood",{item:props});
    }

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="Add" onPress={sharePic} />
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef}>
        <StatusBar style="auto" />
      </Camera>

      <View style={styles.buttonContainer}>
        {/* <Button style={styles.button} title="Take Pic" onPress={takePic}/> */}

        <TouchableOpacity style={styles.touch} onPress={takePic}>
          <Svg>
            <Circle stroke="#2162cc" cx="50%" cy="40%" r="30" fill="#2162cc" />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  topbar: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
    height: "10%",
  },
  camera: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "white",
    height: "20%",
  },
  button: {
    height: "20%",
  },
  touch: {},
  icon: {
    marginTop: "20%",
    height: "10%",
    width: "30%",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
