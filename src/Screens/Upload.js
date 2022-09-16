import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  Text,
  ScrollView,
  isLoading,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import CButton from "../Components/CButton";
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import actions from '../Redux/actions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {UPLOAD} from '../Config/urls';
import {showError, showSuccess} from '../Utils/Flash';
import AwesomeLoading from 'react-native-awesome-loading';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';

const windowWidth = Dimensions.get('window').width;

const Upload = ({navigation}) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const storeData =  useSelector((state)=> state);
  console.log("store data", storeData);
  let userData = storeData.auth.userData;
  let session = userData.session;
  const [isSpin, setSpin] = useState(false);
  console.log("UPLOAD URL", UPLOAD);
  const RNFS = require('react-native-fs');

  navigation.setOptions({
    headerShown: isSpin ? false : true
  });

  useEffect(() => {
    setImages(storeData.upload?.uploadImages);
  },[storeData.upload])

  useFocusEffect(
    React.useCallback(() => {
      console.log("inside useFocusEffect", route?.params);
      if(route?.params){
        let vehicle_movement = route?.params;
        try {
          const res = actions.vehicle({
            vehicle_movement,
          }, 'vehicle_movement');
        } catch (error) {
          console.log("error", error);
        }
      }
    }, [route?.params])
  );

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  // const captureImage = async () => {
    // let options = {
    //   mediaType: 'photo',
    //   quality: 1,
    // };
    // let isCameraPermitted = await requestCameraPermission();
    // let isStoragePermitted = await requestExternalWritePermission();
    // if (isCameraPermitted && isStoragePermitted) {
    //   launchCamera(options, async(response) => {
    //     console.log('Response = ', response);
    //     if (response.didCancel) {
    //       // alert('User cancelled camera picker');
    //       return;
    //     } else if (response.errorCode == 'camera_unavailable') {
    //       alert('Camera not available on device');
    //       return;
    //     } else if (response.errorCode == 'permission') {
    //       alert('Permission not satisfied');
    //       return;
    //     } else if (response.errorCode == 'others') {
    //       alert(response.errorMessage);
    //       return;
    //     }
    //     setIsLoading(true);
    //     const resizedArray = [];
    //     const data = response.assets.map(async(image, index) => {
    //       console.log("image size", image.fileSize / 1000000);
    //       if(image.fileSize / 1000000 > 2){
    //         console.log("greater");
    //         let uri = image.uri;
    //         const resizedImage = await ImageResizer.createResizedImage(
    //           uri,
    //           1200,
    //           1200,
    //           'JPEG',
    //           100, //takes a value between 0 and 100
    //         );
    //         resizedArray.push(resizedImage);
    //         console.log("resized image size", resizedImage.size, resizedArray);
    //       }else{
    //         resizedArray.push(image);
    //       }
    //     })

    //     await Promise.all(data);
    //     setImages([...images, ...resizedArray]);
    //     setTimeout(() => {
    //       setIsLoading(false)
    //     }, 3000);
    //   });
    // }
    // ImagePicker.openCamera({
    //   width: 300,
    //   height: 400,
    //   cropping: false,
    //   multiple: true
    // }).then(image => {
    //   console.log(image);
    // });
  // };

  const chooseFile = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 5
    };
    launchImageLibrary(options, async(response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        // alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setIsLoading(true);
      const resizedArray = [];
      const data = response.assets.map(async(image, index) => {
        console.log("image file size", image.fileSize / 1000000);
        if(image.fileSize / 1000000 > 2){
          console.log("greater");
          let uri = image.uri;
          const resizedImage = await ImageResizer.createResizedImage(
            uri,
            1200,
            1200,
            'JPEG',
            50, //takes a value between 0 and 100
          );
          resizedArray.push(resizedImage);
          console.log("resize file", resizedImage.name);
        }else{
          console.log("smaller");
          resizedArray.push(image);
        }
      })

      await Promise.all(data);
      console.log("promise done");
      setImages([...images, ...resizedArray]);
      setTimeout(() => {
        setIsLoading(false)
      }, 3000);
    });
  };

  const captureImage = async () => {
    await actions.uploadImages(images);
    navigation.navigate('CCamera');
  };

  const removeImage = (index) => {
    setImages(images.filter((item, i) => index !== i));
  }

  const submit = async() => {
    setSpin(true)
    const formData = new FormData();
    console.log("storeData upload booking_ref", storeData?.vehicle?.booking_ref?.booking_ref)
    let booking_no = storeData?.vehicle?.booking_ref?.booking_ref ?? '';
    let reg_no = storeData?.vehicle?.registration_no?.regno ?? '';
    let vehicle_movement = storeData?.vehicle?.vehicle_action?.vehicle_action == 'collected' ? 1 : (storeData?.vehicle?.vehicle_action?.vehicle_action == 'movement' ? 2 : 3);
    console.log("booking_no", booking_no, "reg no", reg_no);

    formData.append('booking_ref', booking_no);
    formData.append('booking_reg', reg_no);
    formData.append('session', session);
    formData.append('driver_id', storeData?.auth?.userData?.id);
    formData.append('vehicle_movment_id', vehicle_movement);

    if(vehicle_movement != 2){
      formData.append('terminal', "terminal " + storeData?.vehicle?.terminal?.selectedItem?.TerminalId);
    }

    if(vehicle_movement != 1 && vehicle_movement != 3){
      formData.append('yard_code', storeData?.yard?.yardData?.yard_code);
    }
    formData.append('is_cash_booking', storeData?.vehicle?.is_cash_booking?.is_cash_booking);

    images.map((image, i) => {
      let temp = {
        uri: image.uri,
        name: 'image_'+i+'.jpeg',
        type: 'image/jpg'
      };

      formData.append(`inspection_images[]`, temp);
    });

    try {
      const res = await actions.upload(formData);
      console.log('res==>>>>>', res);
      if (res.code) {
        if (res?.code == 200) {
          setSpin(false)
          showSuccess(res.message);

          images.map(image => {
            RNFS.exists(image.uri)
              .then((result) => {
                  console.log("result before", result)
                  if (result) {
                      return RNFS.unlink(image.uri).then(() => {
                          console.log('FILE DELETED');
                      })
                      .catch((err) => {
                        console.log(err.message);
                      });
                  }
              })
              .catch((err) => {
                  console.log(err.message);
              });
          });

          actions.uploadImages([]);
          actions.vehicle({}, 'terminal');

          navigation.replace('Vehicledetails', 'upload');
        }else{
          setSpin(false)
          showError(res.message);
        }
      } else {
        setSpin(false)
        showError(error.message);
      }
      //await actions.getCommunityList();
    } catch (error) {
      console.log('error raised', error.message);
      showError(error.message);
      setSpin(false)
    }
  }

  return(
    <View style={styles.container}>
      {
        isSpin && <AwesomeLoading indicatorId={10} size={100} isActive={true} text="Uploading Images..." style={{backgroundColor: 'red'}}/>
      }

      <View style={styles.container_view}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar />

          <Text style={styles.header}>Upload</Text>

          {!images.length > 0 &&
            <View style={[styles.car_image_view, windowWidth > 600 && {marginBottom: 50}]}>
              <Image
                source={windowWidth > 600 ? require("../assets/images/multi_image_large.png") : require("../assets/images/multi_image.png")}
                resizeMode="contain"
                style={[styles.car_image, windowWidth > 600 && {height: 400}]}
              ></Image>
            </View>
          }

          {images.length > 0 &&
            <View style={styles.image_container}>
                {images.map((image, index) => {
                  return(
                    <View style={styles.imageParent}>
                      <Image
                        source={{
                          uri: image.uri,
                        }}
                        style={styles.imageStyle}
                      />
                      <TouchableOpacity onPress={() => removeImage(index)}>
                        <Image
                          source={require("../assets/images/close.png")}
                          style={styles.removeImage}
                        />
                      </TouchableOpacity>
                    </View>
                  )
                })}
            </View>
          }

          <View style={styles.action_btn_view}>
            <CButton
              onPress={captureImage}
              buttonText="Use Camera"
              type="CAMERA"
              isCamera={true}
              pStyle={styles.camera_picker_btn}
            ></CButton>

            {/* <CButton
              onPress={chooseFile}
              buttonText="Select From Gallery"
              type="CAMERA"
              isGallery={true}
              pStyle={styles.image_picker_btn}
            ></CButton> */}
          </View>

          <CButton
            onPress={submit}
            buttonText="Submit"
            type="LIGHT"
            pStyle={styles.materialButtonDanger}
            isLoading={isLoading}
          ></CButton>
        </ScrollView>
      </View>
    </View>
  )
};

// define your styles
const styles = StyleSheet.create({
  action_btn_view: {
    flexDirection: 'row',
    marginBottom: 40,
    // flexWrap: 'wrap',
    // justifyContent: 'space-between'
  },
  // image_picker_btn:{
  //   width: '55%'
  // },
  camera_picker_btn:{
    width: '100%'
  },
  car_image:{
    width: '100%',
  },
  car_image_view:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header:{
    color: '#000',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  container_view:{
    paddingHorizontal: 24
  },
  imageStyle: {
    width: windowWidth > 600 ? '85%' : 100,
    height: windowWidth > 600 ? 150 : 100,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  image_container:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#70147F',
    padding: 10,
  },
  imageParent:{
    position: 'relative',
    width: '33%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  removeImage:{
    width: 22,
    height: 22,
    position: 'absolute',
    top: -8,
    right: 0
  },
});

export default Upload;
