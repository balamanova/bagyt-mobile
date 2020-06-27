import React from 'react';
import FavouriteUniversityList from './FavouriteUniversityList';
import {favourites, university} from '../../util/texts';
import {createStackNavigator} from '@react-navigation/stack';
import {options, backOption} from '../../util/Constants';
import UniversityDetail from '../universities/UniversityDetail';

const Stack = createStackNavigator();

function FavouriteUniversityNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={favourites}
        component={FavouriteUniversityList}
        options={options}
      />
      <Stack.Screen
        name={university}
        component={UniversityDetail}
        options={backOption}
      />
    </Stack.Navigator>
  );
}

export default FavouriteUniversityNavigator;
