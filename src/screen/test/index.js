import React from 'react';
import TestList from './TestList';
import TestMain from './TestMain';
import TestAnswer from './TestAnswer';
import {tests, test_answer, test_question} from '../../util/texts';
import {createStackNavigator} from '@react-navigation/stack';
import {options, backOptionBackTitleNotVisible} from '../../util/Constants';

const Stack = createStackNavigator();

function QuizNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={tests} component={TestList} options={options} />
      <Stack.Screen
        name={test_question}
        component={TestMain}
        options={backOptionBackTitleNotVisible}
      />
      <Stack.Screen
        name={test_answer}
        component={TestAnswer}
        options={backOptionBackTitleNotVisible}
      />
    </Stack.Navigator>
  );
}

export default QuizNavigator;
