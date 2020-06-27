import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {greyMain} from '../util/Constants';

class FloatingLabelInput extends React.Component {
  state = {
    isFocused: this.props.value,
  };

  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => !this.props.value && this.setState({isFocused: false});

  render() {
    const {label, ...props} = this.props;
    const {isFocused} = this.state;
    const labelStyle = {
      position: 'absolute',
      left: !isFocused ? 10 : 4,
      top: !isFocused ? 8 : -10,
      backgroundColor: 'white',
      fontSize: !isFocused ? 16 : 14,
      marginHorizontal: 2,
      color: !isFocused ? '#aaa' : greyMain,
    };
    return (
      <View style={styles.container}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput
          {...props}
          textContentType={'creditCardNumber'}
          keyboardType={'numeric'}
          style={styles.textInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: greyMain,
    marginBottom: 10,
  },
  textInput: {
    padding: 8,
    height: 44,
    fontSize: 16,
    alignItems: 'center',
    color: 'black',
  },
});

export default FloatingLabelInput;
