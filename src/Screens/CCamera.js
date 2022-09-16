import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { showError } from '../Utils/Flash';
import actions from '../Redux/actions';
import { useSelector } from 'react-redux';
import ImageResizer from 'react-native-image-resizer';

const CCamera = ({navigation}) => {
    const storeData =  useSelector((state)=> state);
    const rnCamera = useRef(null);
    const [images, setImages] = useState([]);
    const RNFS = require('react-native-fs');
    navigation.setOptions({
        headerShown: false
    });

    useEffect(() => {
        setImages(storeData.upload?.uploadImages);
    },[storeData.upload])

    const takePicture = async () =>
    {
        if (rnCamera) {
            const options = { quality: 0.4, base64: false, pictureSize: '1' };
            const data = await rnCamera.current.takePictureAsync(options);
            console.log("data.............", data);

            const resizedImage = await ImageResizer.createResizedImage(
              data.uri,
              1200,
              1200,
              'JPEG',
              60,
            );
            console.log("resize file", resizedImage);
            let selected_images = images.filter(image => image.selected == true);

            if(selected_images.length < 8){
                resizedImage.selected = true;
            }else{
                resizedImage.selected = false;
            }

            setImages([...images, resizedImage]);

            // RNFS.stat(data.uri).then((result) => {
            //     console.log("image result", result);
            // })

            // RNFS.exists(data.uri)
            //     .then((result) => {
            //         console.log("result before", result)
            //         if (result) {
            //             return RNFS.unlink(data.uri).then(() => {
            //                 console.log('FILE DELETED');
            //             })
            //             .catch((err) => {
            //             console.log(err.message);
            //             });
            //         }
            //     })
            //     .catch((err) => {
            //         console.log(err.message);
            // });
        }
    };

    const selectImage = (index) => {
        let clicked_image = images.find((image, i) => i == index);
        if(clicked_image.selected){
            clicked_image.selected = !clicked_image.selected;

            let newImages = [...images];
            newImages[index] = clicked_image;
            setImages(newImages)
        }else{
            let selected_images = images.filter(image => image.selected == true);

            if(selected_images.length < 8){
                clicked_image.selected = !clicked_image.selected;

                let newImages = [...images];
                newImages[index] = clicked_image;
                setImages(newImages)
            }else{
                showError("Maximum of 8 images are allowed")
            }
        }
    }

    const confirm = () => {
        try {
            let selected_images = images.filter(image => image.selected == true);
            let unselected_images = images.filter(image => image.selected == false);
            actions.uploadImages(selected_images);
            unselected_images.map(image => {
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
            navigation.navigate('Upload');
        } catch (error) {
            console.log("error", error);
        }
    }

    const cancel = () => {
        navigation.navigate('Upload');
    }

    return (
        <View style={styles.container}>
            {
                images.length > 0 &&
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.ScrollView} contentContainerStyle={{alignItems: 'center', paddingHorizontal: 10}}>
                        <View style={styles.image_slide}>
                            {
                                images.map((image, i) => {
                                    return(
                                        <TouchableOpacity style={styles.previewImageView} onPress={() => selectImage(i)}>
                                            <Image
                                                key={i}
                                                source={{
                                                    uri: image.uri,
                                                }}
                                                style={styles.previewImage}
                                            />
                                            {
                                                image?.selected && <Image
                                                    source={require("../assets/images/image_tick.png")}
                                                    style={styles.tickImage}
                                                />
                                            }
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
            }

            <RNCamera style={styles.cameraContainer}
                ref={rnCamera}
                captureAudio={false}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
            />

            <View style={{ position: 'absolute', zIndex: 100, bottom: 30, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', width: Dimensions.get('window').width }}>
                <TouchableOpacity onPress={cancel}>
                    <Image
                        source={require("../assets/images/close_circle.png")}
                        style={styles.cancel}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={takePicture}>
                    <Image source={require("../../src/assets/images/camera_shutter.png")} style={styles.captureButton}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={confirm}>
                    <Image
                        source={require("../assets/images/confirm_circle.png")}
                        style={styles.confirm}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: undefined,
        // width: '100%',
        // aspectRatio: 9/16
    },
    captureButton: {
        width: 75,
        height: 75
    },
    cameraContainer: {
        flex: 1,
    },
    ScrollView:{
        position: 'absolute',
        bottom: 130,
        height: 70,
        zIndex: 100,
        backgroundColor: '#00000050',
        width: '100%',
    },
    image_slide:{
        width: '100%',
        height: 50,
        zIndex: 100,
        flexDirection: 'row'
    },
    previewImageView:{
        position: 'relative',
        height: 50,
        width: 50,
        marginRight: 10
    },
    previewImage:{
        height: 50,
        width: 50,
    },
    tickImage:{
        position: 'absolute',
        height: 30,
        width: 30,
        top: 11,
        left: 11
    },
    cancel:{
        width: 60,
        height: 60
    },
    confirm:{
        width: 60,
        height: 60,
    }
});

export default CCamera;
