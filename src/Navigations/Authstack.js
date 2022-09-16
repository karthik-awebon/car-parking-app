//import liraries
import React, { Component } from 'react';
import Login from '../Screens/Login';
import Verifyurl from '../Screens/Verifyurl';

// create a component
const Authstack = (Stack) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Verifyurl" component={Verifyurl} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
};

//make this component available to the app
export default Authstack;
