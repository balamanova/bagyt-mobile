import React from 'react';
import {View, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {greyMain, width} from '../util/Constants';

export default class CustomCheckbox extends React.Component {
  render() {
    const {name, value, onChange} = this.props;
    return (
      <View
        style={{
          marginVertical: 10,
          flexDirection: 'row',
          alignSelf: 'center',
          backgroundColor: greyMain,
          borderRadius: 20,
          paddingHorizontal: 5,
          paddingVertical: 3,
          width: width * 0.55,
        }}>
        <CheckBox
          value={value}
          onChange={() => onChange()}
          disabled={false}
          tintColors={{true: 'white'}}
        />
        <Text
          style={{
            alignSelf: 'center',
            color: 'white',
            fontSize: 14,
            marginLeft: 5,
          }}>
          {name.toUpperCase()}
        </Text>
      </View>
    );
  }
}
