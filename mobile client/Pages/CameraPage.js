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
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Svg, { Circle } from "react-native-svg";

export default function CameraPage({ navigation }) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
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
          console.log(response.data.predictions);
          prediction = response.data.predictions;
        })
        .catch(function (error) {
          console.log(error.message);
        });

      if (prediction == []) {
        toHome();
      }
      else{
        navigation.navigate("AddFood", { prediction });
      }

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

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="Share" onPress={sharePic} />
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
