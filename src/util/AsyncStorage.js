import {AsyncStorage} from 'react-native';

export const setSplashHaveSeen = async () => {
  try {
    await AsyncStorage.setItem('@Splash:key', JSON.stringify('true'));
  } catch (error) {
    console.error('Error in setItem to AsyncStorage');
  }
};

export const getSplashHaveSeen = async () => {
  try {
    const splash = await AsyncStorage.getItem('@Splash:key');
    return splash !== null ? JSON.parse(splash) : 'false';
  } catch (error) {
    console.error('Error in getItem from AsyncStorage');
  }
};

export const setItem = async (item) => {
  var myArray = await getItem();
  if (myArray.map((univer) => univer._id === item._id).includes(true)) {
    myArray = myArray.filter(function (obj) {
      return obj._id !== item._id;
    });
  } else {
    myArray = [...myArray, item];
  }

  try {
    await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(myArray));
  } catch (error) {
    console.error('Error in setItem to AsyncStorage');
  }
};

export const getItem = async () => {
  try {
    const myArray = await AsyncStorage.getItem('@MySuperStore:key');
    return myArray !== null ? JSON.parse(myArray) : [];
  } catch (error) {
    console.error('Error in getItem from AsyncStorage');
  }
};

export const setAsyncItem = async (key, item) => {
  try {
    await AsyncStorage.setItem(`@MySuperStore:${key}`, JSON.stringify(item));
  } catch (error) {
    console.error('Error in setItem to AsyncStorage');
  }
};

export const getAsyncItem = async (key) => {
  try {
    const myArray = await AsyncStorage.getItem(`@MySuperStore:${key}`);
    return myArray !== null ? JSON.parse(myArray) : null;
  } catch (error) {
    console.error('Error in getItem from AsyncStorage');
  }
};
