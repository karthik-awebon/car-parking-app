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

// create a component
const Login = ({navigation}) => {
  const [state, setState] = useState({
    isLoading: false,
    phone_number: '',
    password: '',
    isSecure: true,
  });

  const {isLoading, phone_number, password, isSecure} = state;
  const updateState = data => setState(() => ({...state, ...data}));

  const onChangeUsername = phone_number => updateState({phone_number});
  const onChangePassword = password => updateState({password});

  const isValidData = () => {
    const error = Validations({
      phone_number,
      password,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onLogin = async () => {
    const checkValid = isValidData();
    if (checkValid) {
      updateState({isLoading: true});
      try {
        const res = await actions.login({
          phone_number,
          password,
        });
        console.log('res==>>>>>', res);
        if (res.active) {
          if (res?.active == 1) {
            navigation.navigate('Vehicledetails');
          }else{
            showError(res.message);
          }
        } else {
          showError(error.message);
          updateState({isLoading: false});
        }
        updateState({isLoading: false});
        //await actions.getCommunityList();
      } catch (error) {
        console.log('error raised', error.message);
        showError(error.message);
        updateState({isLoading: false});
      }
    }
  };

  const onRegister = () => {
    navigation.navigate('Signup');
  };

  const onForgetPassword = () => {
    navigation.navigate('Signup');
  }

  return (

    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar />
        <Image
          source={require("../assets/images/verify.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>

        <Text style={styles.header}>Login Account</Text>

        <MaterialFixedLabelTextbox
          style={styles.firstTextBox}
          placeholder=""
          value={phone_number}
          setValue={onChangeUsername}
          textLabel="Phone Number"
        ></MaterialFixedLabelTextbox>

        <MaterialFixedLabelTextbox
          placeholder=""
          value={password}
          setValue={onChangePassword}
          secureTextEntry={isSecure}
          isPassword={true}
          textLabel="Enter Password"
        ></MaterialFixedLabelTextbox>

        <CButton
          onPress={onLogin}
          buttonText="LOGIN"
          type="LIGHT"
          pStyle={styles.materialButtonDanger}
          isLoading={isLoading}
        ></CButton>
      </ScrollView>
    </View>    
  );
};

// define your styles
const styles = StyleSheet.create({
  header:{
    color: '#000',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24
  },
  image: {
    width: 66,
    height: 82,
    marginTop: 90,
    marginBottom: 48,
    alignSelf: 'center',
  },
  firstTextBox: {
    marginTop: 40
  },
  materialButtonDanger: {
    height: 54,
    marginTop: 25
  },
});

//make this component available to the app
export default Login;
