import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Authstack from './Authstack';
import Mainstack from './Mainstack';
import { useSelector } from 'react-redux';

const Routes = () => {
  const Stack = createStackNavigator();
  const userData = useSelector((state)=> state.auth.userData)
  const verify = useSelector((state)=> state?.verify?.verifyurl) 
  console.log("access token :",userData);
  return (    
      <>
        {!!userData && (userData?.active == '1') && verify ? Mainstack(Stack, userData)
                    : Authstack(Stack)
                }
      </>
  );
};

//make this component available to the app
export default Routes;
