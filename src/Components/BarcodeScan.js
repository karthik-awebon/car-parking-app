import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions 
} from 'react-native';
import { RNCamera } from 'react-native-camera';

const BarcodeScan = ({setBarcode}) => {
  console.log("BarcodeScan", setBarcode)
  return (
    <RNCamera style={styles.camera}
      captureAudio={false}
      onGoogleVisionBarcodesDetected={(data) => { console.log("scanning barcode", data); data?.barcodes.length > 0 ? setBarcode(data) : ''}}
      googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.ALL}
    />
  );
}

const styles = StyleSheet.create({
  camera:{
    flex: 1,
    height: 200
  },
  closeIcon:{
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1000,
    color: '#fff'
  },
  cameraStyle:{
    height: Dimensions.get('window').height,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default BarcodeScan;
