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
import { useSelector } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import actions from '../Redux/actions';
import {showError, showSuccess} from '../Utils/Flash';

const VehicleMovement = ({navigation}) => {
  const storeData =  useSelector((state)=> state);
  const [title, setTitle] = useState('');
  const [term, setTerm] = useState(0);
  console.log("term now", term);
  const scanBarcode = async () => {
    if(title != 'Move'){
      if(term != 0){
        navigation.navigate('Upload');
      }else{
        showError("Please select a terminal");
      }
    }else{
      navigation.navigate('BarcodeScanner', {next_page : 'Upload'});
    }
  };

  const [terminals, setTerminals] = useState([]);

  useEffect(() => {
    let vehicle_movement = storeData?.vehicle?.vehicle_action?.vehicle_action == 'collected' ? 'Collect' : (storeData?.vehicle?.vehicle_action?.vehicle_action == 'movement' ? 'Move' : 'Return');
    setTitle(vehicle_movement);
  },[storeData.vehicle?.vehicle_action])
  
  useEffect(() => {
    // getTerminal()
    (async()=>{
      try {
        const res = await actions.getTerminals();
        console.log("terminal list", res.data);
        if(res.code == 200){
          setTerminals(res.data);
          return true;
        }else{
          showError(res?.message);
          return false;
        }
      }catch (error) {
        console.log('error raised', error.message);
        return false;
      }
    })();  
  },[])

  return(
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar />
        
        <Text style={styles.header}>{title}</Text>

        { 
          title != 'Move' &&
            <>
              <Text style={styles.text_label}>Select Terminal</Text>
              <SelectDropdown 
                dropdownStyle={styles.select_text}
                buttonStyle={styles.drop_down}
                data={terminals}
                defaultValueByIndex={term}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  try {
                    const res = actions.vehicle({
                      selectedItem,
                    }, 'terminal');
                    setTerm(parseInt(selectedItem?.Terminal?.replace(/[^0-9]/g,'')));
                    console.log("terminal res", res);
                  } catch (error) {
                    console.log("error", error);
                  }
                }}
                defaultButtonText = "Select Terminal"
                buttonTextStyle = {styles.buttonTextStyle}
                renderDropdownIcon = {() => { return  <Image
                  source={require("../assets/images/dropdown-icon.png")}
                  resizeMode="contain"
                  style={styles.image11}
                ></Image> }}
                dropdownIconPosition = "right"
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.Terminal
                }}
                rowTextForSelection={(item, index) => {
                  return item.Terminal
                }}
                selectedRowTextStyle={styles.select_text}
                rowTextStyle={styles.select_text}
                selectedRowStyle={styles.select_text}
                rowStyle={styles.select_text}
              />
            </>
        }

        { 
          title == 'Move' &&
          <>
            <Text style={styles.sub_header}>Scan Parking-yard Barcode</Text>
            <View style={styles.barcode_image_view}>
              <Image
                source={require("../assets/images/barcode.png")}
                resizeMode="contain"
                style={styles.barcode_image}
              ></Image>
            </View>
          </>
        }

        <CButton
          onPress={scanBarcode}
          buttonText={title != 'Move' ? "Proceed" : "Scan Barcode"}
          type="LIGHT"
          pStyle={[styles.materialButtonDanger, title != 'Move' ? styles.btnCollect : '']}
          isLoading={isLoading}
        ></CButton>
        
      </ScrollView>
    </View>    
  )
};

// define your styles
const styles = StyleSheet.create({
  text_label: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
  drop_down:{
    color: '#000',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '500',
    // flex: 1,
    textAlign: 'left',
    backgroundColor: 'rgba(112, 20, 127,0.08)',
    borderRadius: 10,
    height: 60,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%'
  },
  buttonTextStyle:{
    textAlign: 'left',
  },
  select_text:{
    textAlign: 'left',
    borderRadius: 10,
    paddingHorizontal: 5
  },
  barcode_image_view:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 30
  },
  barcode_image: {
    width: 250,
    height: 350,
  },
  sub_header:{
    color: '#000',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 30,
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
    materialButtonDanger:{
      width: '100%',
      marginTop: '-10%'
    },
    btnCollect: {
      marginTop: 20
    }
});

export default VehicleMovement;
