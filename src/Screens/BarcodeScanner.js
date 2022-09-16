import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import BarcodeScan from '../Components/BarcodeScan';
import { useRoute } from '@react-navigation/native';
import AwesomeLoading from 'react-native-awesome-loading';
import actions from '../Redux/actions';
import {showError, showSuccess} from '../Utils/Flash';

const BarcodeScanner = ({navigation}) => {
  navigation.setOptions({ 
    headerShown: false
  });
  const [isSpin, setSpin] = useState(false);
  const [barcode, setBarcode] = useState([]);
  const route = useRoute();

  const routes = navigation.getState()?.routes;
  const [prevRoute, setPrevRoute] = useState(routes[routes.length - 2]);

  const closeScanner = () => {
    navigation.navigate(prevRoute?.name);
  }

  useEffect(() => {
    console.log("barcode", barcode);
    console.log("route?.params?.next_page", route?.params?.next_page);
    if(barcode?.barcodes){
      if(route?.params?.next_page){
        onVerify(barcode?.barcodes[0]?.data);
        // navigation.replace(route?.params?.next_page, barcode?.barcodes[0]?.data);
      }else{
        navigation.navigate(prevRoute?.name, barcode?.barcodes[0]?.data);
      }
    }
  }, [barcode]);

  async function onVerify(barcode){
    console.log("inside barcode verify");
    setSpin(true);
    try {
      const res = await actions.yard({
        yard_code : barcode,  
      });
      
      if(res.code == 200){
        navigation.replace('Upload');
        setSpin(false);
      }else{
        navigation.navigate('VehicleMovement');
        setSpin(false);
      }
      console.log('res==>>>>>', res);
    } catch (error) {
      showError(error?.message);
      console.log('error raised2', error.message);
      navigation.navigate('VehicleMovement');
      setSpin(false);
    }
  };

  console.log("barcode scanner")
  return(
    <>
      {
        isSpin && <AwesomeLoading indicatorId={10} size={100} isActive={true} text="Fetching information..." style={{backgroundColor: 'red'}}/>
      }

      {!isSpin && 
        <View style={styles.container}>
          <Text style={styles.closeIcon} onPress={closeScanner}>Close</Text>
          <BarcodeScan setBarcode={setBarcode}></BarcodeScan>
        </View>  
      } 
    </> 
  )
};
  
// define your styles
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#80001f',
      height: Dimensions.get('window').height,
    },
    closeIcon:{
      position: 'absolute',
      top: 15,
      right: 15,
      zIndex: 1000,
      color: '#fff'
    },
});

export default BarcodeScanner;
