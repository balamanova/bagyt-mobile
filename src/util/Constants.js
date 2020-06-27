import React from 'react';
import {Dimensions, Text} from 'react-native';
export const {width, height} = Dimensions.get('window');
export const API_URL = 'https://bagyt-api.herokuapp.com';
// export const API_URL = 'http://172.20.10.6:8080';
export const greyMain = 'rgba(32, 174, 169, 1)';
export const allScreenStyle = {
  padding: 10,
  backgroundColor: '#fff',
  flex: 1,
};

export var cities = [];

export const actionSheet = [{name: 'Назад'}, {name: 'Все'}];

export const options = {
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: greyMain,
    fontSize: 16,
  },
  cardOverlayEnabled: false,
  headerStyle: {
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
    borderBottomWidth: 0.4,
    borderBottomColor: greyMain,
  },
};

export const optionHeaderNull = {
  headerShown: false,
};

export const backOption = {
  title: '',
  cardOverlayEnabled: false,
  headerStyle: {
    elevation: 2, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
  },
  headerBackTitleVisible: true,
  headerBackTitleStyle: {
    color: greyMain,
    fontSize: 16,
  },
  headerTintColor: greyMain,
};

export const backOptionBackTitleNotVisible = {
  cardOverlayEnabled: false,
  headerStyle: {
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
    borderBottomWidth: 0.4,
    borderBottomColor: greyMain,
  },
  title: '',
  headerBackTitleStyle: {
    color: greyMain,
    fontSize: 16,
  },
  headerTintColor: greyMain,
};

export const cityKey = 'cityKey';
export const subjectsKey = 'subjectsKey';
export const majorsKey = 'majorsKey';
