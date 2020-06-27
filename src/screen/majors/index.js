import React from 'react';
import Majors from './Majors';
import MajorList from './MajorList';
import MajorDetailed from './MajorDetailed';
import StatisticMajor from './StatisticMajor';
import UniversityDetail from '../universities/UniversityDetail';
import {
  majors,
  major_detailed,
  university,
  statistics,
  subject_to_select,
} from '../../util/texts';
import {createStackNavigator} from '@react-navigation/stack';
import {options, backOption} from '../../util/Constants';

const Stack = createStackNavigator();

function MajorsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={subject_to_select}
        component={Majors}
        options={options}
      />
      <Stack.Screen name={majors} component={MajorList} options={options} />
      <Stack.Screen
        name={statistics}
        component={StatisticMajor}
        options={backOption}
      />
      <Stack.Screen
        name={major_detailed}
        component={MajorDetailed}
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

export default MajorsNavigator;
