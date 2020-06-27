import React from 'react';
import Search from './Search';
import UniversityList from './UniversityList';
import UniversityDetail from '../universities/UniversityDetail';
import {search_by_point, university, search_result} from '../../util/texts';
import {createStackNavigator} from '@react-navigation/stack';
import {options, backOptionBackTitleNotVisible} from '../../util/Constants';

const Stack = createStackNavigator();

function SearchNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={search_by_point}
        component={Search}
        options={options}
      />
      <Stack.Screen
        name={search_result}
        component={UniversityList}
        options={backOptionBackTitleNotVisible}
      />
      <Stack.Screen
        name={university}
        component={UniversityDetail}
        options={backOptionBackTitleNotVisible}
      />
    </Stack.Navigator>
  );
}

export default SearchNavigator;
