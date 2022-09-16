import React, {Component, useEffect, useState, forwardRef, useImperativeHandle} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

const MaterialFixedLabelTextbox = forwardRef(({
  setBlur,
  setValue,
  value,
  textLabel,
  secureTextEntry,
  style,
  placeholder,
  labelStyle,
  isPassword,
  handleConfirm,
  childFunc,
  isEditable = true,
  ...props
}, ref) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text_label, labelStyle]}>{textLabel}</Text>
      <View style={styles.input_container}>

        <TextInput
          editable={isEditable}
          value={value}
          onChangeText={setValue}
          onBlur={setBlur}
          placeholder={placeholder}
          placeholderTextColor={'#00000060'}
          style={[styles.inputStyle, isPassword ? styles.password_style : null, !isEditable ? styles.disabled : null]}
          secureTextEntry={isPassword ? (!isPasswordVisible ? true : false) : false}
          {...props}
        />   

        {isPassword && 
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.password_image_view}>
            <Image
              source={!isPasswordVisible ? require("../assets/images/eye_slash.png") : require("../assets/images/eye.png")}
              resizeMode="contain"
              style={styles.password_image}
            ></Image>
          </TouchableOpacity>
        }
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  input_container:{
    position: 'relative'
  },
  password_image_view:{
    position: 'absolute',
    right: 20,
    top: 28
  },
  password_image:{
    width: 24,
    height: 24,
  },
  container: {
    backgroundColor: 'transparent',
    marginTop: 15,
    marginBottom: 12
  },
  inputStyle: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '500',
    flex: 1,
    textAlign: 'left',
    alignSelf: 'center',
    backgroundColor: 'rgba(112, 20, 127,0.08)',
    borderRadius: 10,
    height: 60,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    minWidth: '100%'
  },
  text_label: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
  password_style: {
    paddingRight: 50,
  },
  image2: {
    top: -34,
    right: 10,
    width: 20,
    height: 20,
    position: "absolute"
  },
  disabled:{
    opacity: 0.5
  }
});

export default MaterialFixedLabelTextbox;
