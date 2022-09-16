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
import CButton from "../Components/CButton";
import actions from '../Redux/actions';
import SwitchWithIcons from "react-native-switch-with-icons";

const VehicleAction = ({navigation}) => {
  const [isSwitchOn, setIsSwitchOn] = useState(1);

  useEffect(() => {
    if(isSwitchOn != 0){
      let vehicle_action = isSwitchOn == 1 ? 'collected' : (isSwitchOn == 2 ? 'movement' : 'return');
      try {
        const res = actions.vehicle({
          vehicle_action,
        }, 'vehicle_action');
      } catch (error) {
      
      }
    }
  }, [isSwitchOn]);

  const next = () => {
    if(isSwitchOn != 0){
      navigation.navigate('VehicleMovement')
    }
  }

  return(
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar />
        
        <Text style={styles.header}>Vehicle Action</Text> 
        
        <View style={styles.actions}>
          <View style={styles.card_text_wrap}>
            <Image
              source={require("../assets/images/car1.png")}
              resizeMode="contain"
              style={styles.car_image}
            ></Image>
            <Text style={styles.actionsText}>Collect</Text>
          </View>
          <SwitchWithIcons value={isSwitchOn == 1 ? true : false} onValueChange={() => setIsSwitchOn(isSwitchOn == 1 ? 0 : 1)}
            iconColor={{true: "#70147F", false: "lightgrey"}}
            trackColor={{true: "#70147F", false: "lightgrey"}}
            thumbColor={{true: "#fff", false: "#fff"}}
          />
        </View>

        <View style={styles.actions}>
          <View style={styles.card_text_wrap}>
            <Image
              source={require("../assets/images/car2.png")}
              resizeMode="contain"
              style={styles.car_image}
            ></Image>
            <Text style={styles.actionsText}>Move</Text>
          </View>
          <SwitchWithIcons value={isSwitchOn == 2 ? true : false} onValueChange={() => setIsSwitchOn(isSwitchOn == 2 ? 0 : 2)} 
            iconColor={{true: "#70147F", false: "lightgrey"}}
            trackColor={{true: "#70147F", false: "lightgrey"}}
            thumbColor={{true: "#fff", false: "#fff"}}
          />
        </View>

        <View style={styles.actions}>
          <View style={styles.card_text_wrap}>
            <Image
              source={require("../assets/images/car3.png")}
              resizeMode="contain"
              style={styles.car_image}
            ></Image>
            <Text style={styles.actionsText}>Return</Text>
          </View>
          <SwitchWithIcons value={isSwitchOn == 3 ? true : false} onValueChange={() => setIsSwitchOn(isSwitchOn == 3 ? 0 : 3)} 
            iconColor={{true: "#70147F", false: "lightgrey"}}
            trackColor={{true: "#70147F", false: "lightgrey"}}
            thumbColor={{true: "#fff", false: "#fff"}}
          />
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
  card_text_wrap:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  car_image:{
    width: 100,
    height: 72
  },
  header:{
    color: '#000',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 24
  },
  actions:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#70147F',
    width: '100%',
    padding: 10
  },
  actionsText:{
    color: '#000',
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 24,
    marginLeft: 10
  },
  materialButtonDanger:{
    marginTop: 50
  }
});

export default VehicleAction;
