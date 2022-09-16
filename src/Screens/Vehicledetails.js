import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import MaterialFixedLabelTextbox from "../Components/MaterialFixedLabelTextbox";
import CButton from "../Components/CButton";
import {showError, showSuccess} from '../Utils/Flash';
import actions from '../Redux/actions';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Vehicledetails = ({navigation}) => {
  const [isScanned, setIsScanned] = useState(false);
  const route = useRoute();
  const [checked, setChecked] = useState(false);
  const [regno, setRegNo] = useState('');
  const [validCode, setValidCode] = useState(false);

  let storeData =  useSelector((state)=> state);
  console.log("store data", storeData);
  let userData = storeData.auth.userData;
  let session = userData.session;
  let phone_number = userData?.phone_number;

  const [state, setState] = useState({
    isLoading: false,
    booking_ref: "",
  });

  useEffect(() => {
    console.log("checked", checked);
    let is_cash_booking = checked ? '1' : '0';
    try {
      const res = actions.vehicle({
        is_cash_booking,
      }, 'is_cash_booking');
      console.log('res==>>>>>', res);
      if (res?.data?.booking_id) {

      } else {
        showError(error.message);
        updateState({isLoading: false});
      }
      updateState({isLoading: false});
    } catch (error) {
      updateState({isLoading: false});
    }
  }, [checked])

  useFocusEffect(
    React.useCallback(() => {
      if(route?.params && route?.params != 'upload'){
        console.log("route params", route?.params)
        setState({...state, booking_ref : route?.params});
        setIsScanned(!isScanned);
      }else{
        setState({...state, booking_ref : ""});
      }
    }, [route?.params])
  );

  useEffect(() => {
    if(route?.params){
      onVerify();
    }
  }, [isScanned]);

  useEffect(() => {
    if(!checked){
      setRegNo('');
    }
  }, [checked]);

  const scanBarcode = async () => {
    navigation.navigate('BarcodeScanner');
  };

  const next = () => {
    console.log("checked123", checked);
    let is_cash_booking = checked ? '1' : '0';
    const res = actions.vehicle({
      is_cash_booking,
    }, 'is_cash_booking');
    actions.vehicle({
      regno : regno,
    }, 'registration_no');
    actions.vehicle({
      booking_ref : booking_ref,
    }, 'booking_ref');

    if(checked){
      if(regno.trim() == ''){
        showError('Please add the registration number');
      }else{
        if(booking_ref.trim() == ''){
          navigation.navigate('VehicleAction')
        }else{
          if(validCode){
            navigation.navigate('VehicleAction')
          }else{
            showError("Please enter a valid booking reference code");
          }
        }
      }
    }else{
      if(booking_ref.trim() == ''){
        showError('Please add the booking reference number');
      }else{
        if(validCode){
          navigation.navigate('VehicleAction')
        }else{
          showError("Please enter a valid code");
        }
      }
    }
  }

  const {isLoading, booking_ref} = state;
  const updateState = data => setState(() => ({...state, ...data}));
  const onChangeReference = booking_ref => updateState({booking_ref});
  const onChangeReg = registration_no => setRegNo(registration_no);

  async function onVerify(){
    if(booking_ref.trim() !== ''){
      updateState({isLoading: true});
      try {
        const res = await actions.booking({
          booking_ref,
          session
        });
        updateState({isLoading: false});
        if(res.code == 200){
          setValidCode(true);
          actions.vehicle({
            booking_ref : booking_ref,
          }, 'booking_ref');
        }else if(res.code == 401){
          // await actions.logout({
          //   phone_number,
          // });
          setValidCode(false);
          showError(res?.message);
        }else{
          showError(res?.message);
          setValidCode(false);
        }
      } catch (error) {
        console.log('error raised2', error.message);
        setValidCode(false);
        showError(error.message);
        updateState({isLoading: false});
      }
    }
  };

  return(
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar />

          <Text style={styles.header}>Enter Vehicle Details</Text>

          <CButton
            onPress={scanBarcode}
            buttonText="Scan Barcode"
            type="WHITE"
            pStyle={styles.materialButtonDanger}
            isScan={true}
          ></CButton>

          <View style={styles.line_view}>
            <View style={styles.line_view1}></View>
            <Text style={styles.line_text}>or</Text>
            <View style={styles.line_view2}></View>
          </View>

          <MaterialFixedLabelTextbox
            style={styles.firstTextBox}
            placeholder=""
            value={booking_ref}
            setValue={onChangeReference}
            setBlur={onVerify}
            textLabel="Enter Reference Number"
          ></MaterialFixedLabelTextbox>

          <MaterialFixedLabelTextbox
            style={styles.secondTextBox}
            placeholder=""
            value={regno}
            setValue={onChangeReg}
            textLabel="Enter Registration"
            isEditable={checked ? true : false}
          ></MaterialFixedLabelTextbox>

          <View style={styles.check_container}>
            <Checkbox.Android
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
              color="#70147F"
            />
            <Text style={styles.check_text}>Is cash booking ?</Text>
          </View>

          <CButton
            onPress={next}
            buttonText="Next"
            type="LIGHT"
            pStyle={styles.materialButtonDanger}
            isLoading={isLoading}
          ></CButton>
      </ScrollView>
    </View>
  )
};

// define your styles
const styles = StyleSheet.create({
  check_container:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  check_text:{
    color: '#000',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '500',
  },
  line_view:{
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginTop: 30
  },
  line_view1:{
    width: '40%',
    borderBottomWidth: 2,
    borderColor: '#70147F20'
  },
  line_view2:{
    width: '40%',
    borderBottomWidth: 2,
    borderColor: '#70147F20'
  },
  line_text:{
    width: 'auto',
    fontSize: 24,
    color: '#00000030',
    fontFamily: 'Roboto',
    marginBottom: -12
  },
  header:{
    color: '#000',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center'
  },
  checkbox: {
    alignSelf: "center",
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24
  },
  firstTextBox: {
    marginTop: 43
  },
  secondTextBox: {
    marginTop: 20
  },
  materialButtonDanger: {
    height: 54,
    marginTop: 43
  },
});

export default Vehicledetails;
