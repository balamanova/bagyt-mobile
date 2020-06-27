import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {greyMain, width} from '../util/Constants';

export default class MajorName extends React.Component {
  state = {
    focusStyle: {
      padding: width * 0.07,
      borderColor: greyMain,
      borderRadius: 20,
      borderWidth: 0.5,
      margin: 6,
    },
    simpleStyle: {
      padding: width * 0.07,
      margin: 6,
      backgroundColor: 'white',
    },
    isFocused: false,
  };

  onFocus = () => {
    this.setState({isFocused: !this.state.isFocused});
  };

  render() {
    const {item, navigateToMajorDetailed} = this.props;
    const {isFocused, simpleStyle, focusStyle} = this.state;
    return (
      <TouchableOpacity
        hasTVPreferredFocus={true}
        underlineColorAndroid="#BDBDBD"
        style={isFocused ? focusStyle : simpleStyle}
        onPress={() => navigateToMajorDetailed(item._id)}
        onPressIn={() => this.onFocus()}
        onLongPress={() => this.onFocus()}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }
}
