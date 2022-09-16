//import liraries
import React, { Component } from 'react';
import Vehicledetails from '../Screens/Vehicledetails';
import { View, Text, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import actions from '../Redux/actions';
import BarcodeScanner from '../Screens/BarcodeScanner';
import VehicleAction from '../Screens/VehicleAction';
import VehicleMovement from '../Screens/VehicleMovement';
import Upload from '../Screens/Upload';
import CCamera from '../Screens/CCamera';

const Mainstack = (Stack, userData) => {
    let phone_number = userData.phone_number;
    return (
        <Stack.Navigator screenOptions={({navigation}) => ({
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
                shadowColor : '#fff',
                shadowOffset: {
                    height: 0,
                },
                shadowRadius: 0,
            },
            headerBackVisible:false,
            headerShadowVisible: false,
            headerLeft: ()=> null,
            headerRight: ()=>(
                <TouchableOpacity style={{marginRight : 10, backgroundColor: 'transparent'}} onPress={() => 
                    Alert.alert(
                        "",
                        "Are you sure want to logout ?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: async () => {
                                try {
                                    const res = await actions.logout({
                                        phone_number,
                                    });
                                    
                                    console.log('res==>>>>>', res);
                                } catch (error) {
                                    console.log('error raised1', error);
                                }
                            } 
                          }
                        ]
                    )}>
                    <Image source={require("../assets/images/logout.png")} style={{width: 24, height: 24, marginRight: 12}} resizeMode="contain"/>
                </TouchableOpacity>
             ),
        })}>
            <Stack.Screen name="Vehicledetails" component={Vehicledetails} options={{title: ''}}/>
            <Stack.Screen name="VehicleAction" component={VehicleAction} options={{title: ''}}/>
            <Stack.Screen name="VehicleMovement" component={VehicleMovement} options={{title: ''}}/>
            <Stack.Screen name="Upload" component={Upload} options={{title: ''}}/>
            <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} options={{title: ''}}/>
            <Stack.Screen name="CCamera" component={CCamera} options={{title: ''}}/>
        </Stack.Navigator>
    );
};

//make this component available to the app
export default Mainstack;
