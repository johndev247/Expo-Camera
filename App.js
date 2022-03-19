import React, {useEffect, useState, useRef} from "react";
import {Camera} from "expo-camera";
import MaskedView from "@react-native-community/masked-view";
import {StyleSheet, Text, View, Dimensions, StatusBar} from "react-native";
const {width, height} = Dimensions.get("window");

const PREVIEW_SIZE = width * 0.7;
const PREVIEW_RECT = {
  minX: width - PREVIEW_SIZE / 0.824,
  minY: height * 0.04,
  width: PREVIEW_SIZE,
  height: PREVIEW_SIZE,
};

const styles = StyleSheet.create({
  mask: {
    borderRadius: PREVIEW_SIZE / 0.824,
    height: PREVIEW_SIZE - 2,
    width: PREVIEW_SIZE - 2,
    marginTop: PREVIEW_RECT.minY,
    alignSelf: "center",
    backgroundColor: "white",
  },
  camera: {
    height: PREVIEW_SIZE + 100,
    width: PREVIEW_SIZE,
    alignSelf: "center",
    position: "relative",
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.AndroidSafeArea}>
      <Text>Hello</Text>
      <MaskedView maskElement={<View style={styles.mask} />}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={Camera.Constants.Type.front}
          // onFacesDetected={handleFaceDetection}
          // faceDetectorSettings={{
          //   mode: FaceDetector.FaceDetectorMode.fast,
          //   detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          //   runClassifications:
          //     FaceDetector.FaceDetectorClassifications.none,
          //   minDetectionInterval: 700,
          //   tracking: true,
        />
      </MaskedView>
    </View>
  );
}
