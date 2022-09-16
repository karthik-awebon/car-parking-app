//import liraries
import React, {Component, useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Routes from './src/Navigations/Routes';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import { getUserData } from './src/Utils/Utils';
import { saveUserData } from './src/Redux/actions/auth';
import SplashScreen from  "react-native-splash-screen";
//import { LogBox } from 'react-native';

// create a component
const App = () => {
  //LogBox.ignoreAllLogs();
  useEffect(()=>{
    (async()=>{
      const userData = await getUserData()
      //console.log("user data App.js",userData)
      if(!!userData){
        saveUserData(userData)
      }  
    })();
  },[])

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };

  //Hide Splash screen on app load.
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <NavigationContainer theme={navTheme}>
        <Routes />
        <FlashMessage position="top"/>
      </NavigationContainer>
    </Provider>   
  );
};

//make this component available to the app
export default App;
