import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {splash_screen, main_root} from '../../util/texts';
import {getSplashHaveSeen} from '../../util/AsyncStorage';

export default class TextBagyt extends Component {
  componentDidMount() {
    this.setTimer();
  }
  setTimer = async () => {
    const nextScreen =
      (await getSplashHaveSeen()) === 'true' ? main_root : splash_screen;
    this.timeoutHandle = setTimeout(() => {
      this.props.navigation.navigate(nextScreen);
    }, 2000);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bagytText}>Bagyt</Text>
        <Image
          style={styles.bagytImage}
          source={require('./images/bagytStudents.png')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#6DAD9D',
  },
  bagytText: {
    fontFamily: 'Rufina-Bold',
    margin: 30,
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'normal',
    resizeMode: 'cover',
    fontSize: 68,
  },
  bagytImage: {
    alignSelf: 'center',
    resizeMode: 'cover',
    overflow: 'visible',
  },
  circleImage: {
    width: 100,
    height: 100,
  },
});
