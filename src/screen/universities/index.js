import React from 'react';
import Universities from './Universities';
import Filter from './Filter';
import {universities, filterScreen, university} from '../../util/texts';
import {createStackNavigator} from '@react-navigation/stack';
import UniversityDetail from './UniversityDetail';
import {options, backOption} from '../../util/Constants';

const Stack = createStackNavigator();

function UniversitiesNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={universities}
        component={Universities}
        options={options}
      />
      <Stack.Screen
        name={filterScreen}
        component={Filter}
        options={backOption}
      />
      <Stack.Screen
        name={university}
        component={UniversityDetail}
        options={backOption}
      />
    </Stack.Navigator>
  );
}

export default UniversitiesNavigator;
