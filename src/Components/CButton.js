import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  Image
} from 'react-native';

function CButton({isLoading, pStyle, buttonText, onPress, type, isScan, isCamera, isGallery, ...props}) {
  return (
    <TouchableOpacity
    onPress={onPress}
    disabled={isLoading}
    style={[styles.container, pStyle, styles[`container_${type}`]]}>
      {(isScan || isCamera || isGallery) && 
      <>
       {isScan && 
            <View style={styles.scan_left_icon_view}>
            <Image
              source={require("../assets/images/qrcode.png")}
              resizeMode="contain"
              style={styles.scan_icon_left}
            ></Image>
            </View>
          }
          {isCamera && 
            <View style={styles.scan_left_icon_view1}>
            <Image
              source={require("../assets/images/camera.png")}
              resizeMode="contain"
              style={styles.scan_icon_left}
            ></Image>
            </View>
          }
          {isGallery && 
            <View style={styles.scan_left_icon_view1}>
            <Image
              source={require("../assets/images/gallery.png")}
              resizeMode="contain"
              style={styles.scan_icon_left}
            ></Image>
            </View>
          }
      </>
      } 
      
      { !!isLoading ? <ActivityIndicator size="large" color="black" /> : 
        <Text style={[styles.button, styles[`button_${type}`]]}>
        {buttonText || 'BUTTON'}
        </Text> 
      }
        
      {isScan && 
        <View style={styles.scan_right_icon_view}>
          <Image
            source={require("../assets/images/right_arrow.png")}
            resizeMode="contain"
            style={styles.scan_icon_right}
          ></Image>
        </View>
      }   
     </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scan_icon_left:{
    width: 30,
    height: 20,
  },
  scan_icon_right:{
    width: 30,
    height: 30,
  },
  scan_right_icon_view:{
    marginLeft: 'auto'
  },
  scan_left_icon_view:{
    marginRight: 12
  },
  scan_left_icon_view1:{
    marginRight: 5
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
    position: 'relative'
  },
  container_WHITE: {
    backgroundColor: '#FFF',
    borderColor: '#70147F',
    borderWidth: 2,
    borderRadius: 10,
    height: 60,
  },
  container_CAMERA: {
    backgroundColor: '#FFF',
    borderColor: '#70147F',
    borderWidth: 2,
    borderRadius: 10,
    height: 60,
  },
  container_DANGER: {
    backgroundColor: '#70147F',
    height: 60
  },
  container_LINK: {
    backgroundColor: '#70147F',
    height: 60
  },

  container_LINKWITHOUTUNDERSCORE: {
    backgroundColor: '#70147F',
    height: 60,
  },
  container_Invite: {
    backgroundColor: '#70147F',
    height: 60,
    borderRadius: 5,
    color: '#000',
  },

  container_Manage: {
    backgroundColor: '#70147F',
    height: 60,
    borderRadius: 5,
    color: '#000',
  },

  container_DARK: {
    backgroundColor: '#70147F',
    height: 60
  },
  container_DARK1: {
    backgroundColor: '#70147F',
    height: 60
  },
  container_LIGHT: {
    backgroundColor: '#70147F',
    height: 60
  },
  container_GREEN: {
    backgroundColor: '#70147F',
    height: 60,
    color: '#fff',
  },
  container_GREY: {
    backgroundColor: '#70147F',
    height: 60
  },
  container_Invite: {
    backgroundColor: '#70147F',
    height: 60
  },

  button: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  button_LINK: {
    textDecorationLine: 'underline',
  },
  button_WHITE: {
    color: '#000',
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  button_CAMERA: {
    color: '#000',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 14,
  },
  button_LIGHT: {
    color: '#fff',
  },
  button_View: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#80001F',
    textDecorationLine: 'underline',
  },
  button_invite: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '700',
    color: '#000',
  },

  button_LINKWITHOUTUNDERSCORE: {
    textDecorationLine: 'none',
    fontFamily: 'Roboto',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CButton;
