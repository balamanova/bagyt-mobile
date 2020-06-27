import React from 'react';
import {Universities, Majors, Search, Quiz, Favourites, TextBagyt, SplashScreen} from './src'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {universities, specializations, search, favourites, tests, bagyt, splash_screen, main_root} from './src/util/texts'
import { options, optionHeaderNull } from './src/util/Constants';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={bagyt}
        component={TextBagyt}
        options={optionHeaderNull}
      />
      <Stack.Screen
        name={splash_screen}
        component={SplashScreen}
        options={optionHeaderNull}
      />
        <Stack.Screen
        name={main_root}
        component={MyTabs}
        options={optionHeaderNull}
      />
    </Stack.Navigator>
  );
}

 function MyTabs() {
  return (
    <Tab.Navigator
    initialRouteName={universities}
    activeColor="rgba(32, 174, 169, 0.8)"
    inactiveColor="rgba(0, 0, 0, 0.5)"
    barStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen name={universities} component={Universities}
      options={{
        tabBarLabel: 'Универы',
        tabBarIcon: ({ color,  }) => (
          <Fontisto name="nav-icon-grid-a" size={21} color = {color}/>
        ),
      }}
      /> 
      <Tab.Screen name= {specializations} component={Majors}
      options={{
        tabBarLabel: specializations,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account-circle-outline" size={25} color = {color}/>
        ),
      }}
      />
         <Tab.Screen name={search} component={Search}
      options={{
        tabBarLabel: search,
        tabBarIcon: ({ color }) => (
          <Fontisto name="search" size={22} color = {color}/>
        ),
      }}
      />
            <Tab.Screen name={favourites} component={Favourites}
      options={{
        tabBarLabel: favourites,
        tabBarIcon: ({ color }) => (
          <Fontisto name="heart" size={21} color = {color}/>
        ),
      }}
      />
            <Tab.Screen name={tests} component={Quiz}
      options={{
        tabBarLabel: tests,
        tabBarIcon: ({ color }) => (
          <SimpleLineIcons name="note" size={21} color = {color}/>
        ),
      }}
      />
    </Tab.Navigator>
  );
}

export default function AppMain() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

