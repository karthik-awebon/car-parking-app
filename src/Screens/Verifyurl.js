import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  Text,
  ScrollView,
  isLoading,
} from 'react-native';
import MaterialFixedLabelTextbox from "../Components/MaterialFixedLabelTextbox";
import CButton from "../Components/CButton";
import Validations from '../Utils/Validations';
import {showError, showSuccess} from '../Utils/Flash';
import actions from '../Redux/actions';

const Verifyurl = ({navigation}) => {
  const [state, setState] = useState({
    isLoading: false,
    url: '',
  });

  const {isLoading, url} = state;
  const updateState = data => setState(() => ({...state, ...data}));
  const onChangeUrl = url => updateState({url});

  const isValidData = () => {
    const error = Validations({
      url,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onVerify = async () => {
    const checkValid = isValidData();
    if (checkValid) {
      updateState({isLoading: true});
      try {
        const res = await actions.verifyurl({
          url,
        });
        console.log('res==>>>>>', res, !res.data);
        if(res?.data?.verified){
          showSuccess(res.message);
          navigation.navigate('Login');
        }else{
          showError(res.message);
        }

        updateState({isLoading: false});
      } catch (error) {
        console.log('error raised', error.message);
        showError(error.message);
        updateState({isLoading: false});
      }
    }
  };
  
  return(
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar />
        
        <Image
        source={require("../assets/images/verify.png")}
        resizeMode="contain"
        style={styles.image}
        ></Image>

      <Text style={styles.header}>Verify URL</Text>

      <View style={styles.content_view}>
        <MaterialFixedLabelTextbox
            style={styles.firstTextBox}
            placeholder="https://"
            value={url}
            setValue={onChangeUrl}
            textLabel="Verify URL"
          ></MaterialFixedLabelTextbox>

        <CButton
          onPress={onVerify}
          buttonText="Save"
          type="LIGHT"
          pStyle={styles.materialButtonDanger}
          isLoading={isLoading}
        ></CButton>
      </View>
      </ScrollView>
    </View>    
  )
};

// define your styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 24
    },
    content_view:{
     
    },
    header:{
      color: '#000',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 26,
      textAlign: 'center'
    },
    image: {
      width: 66,
      height: 82,
      marginTop: 90,
      marginBottom: 48,
      alignSelf: 'center',
    },
    firstTextBox: {
      marginTop: 43,
    },
    materialButtonDanger: {
      height: 60,
      marginTop: 20,
    },
});

export default Verifyurl;
