import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import {greyMain} from '../../util/Constants';
import {setSplashHaveSeen} from '../../util/AsyncStorage';
import {main_root} from '../../util/texts';

export default class SplashScreen extends Component {
  goToMainScren = async () => {
    setSplashHaveSeen();
    this.props.navigation.navigate(main_root);
  };

  render() {
    return (
      <Swiper
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}>
        <View style={styles.container}>
          <View style={styles.circle}>
            <Image
              style={styles.circleImage}
              source={require('./images/swiper1.png')}
            />
          </View>
          <Text style={styles.paragraph}>
            Верный помощник при выборе университета
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.circle}>
            <Image
              style={styles.circleImage}
              source={require('./images/swiper2.png')}
            />
          </View>
          <Text style={styles.paragraph}>
            Гид по специальностям в Казахстане
          </Text>
        </View>
        <View showsPagination={false} style={styles.container}>
          <View style={styles.circle}>
            <Image
              style={styles.circleImage}
              source={require('./images/swiper3.png')}
            />
          </View>
          <Text style={styles.paragraph}>
            Психологические тесты для выбора специальности
          </Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => this.goToMainScren()}>
            <Text style={styles.nextText}>Начать</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFF',
  },
  activeDot: {
    backgroundColor: greyMain,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  circleImage: {
    width: '50%',
    height: '50%',
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  circle: {
    width: 235,
    height: 235,
    borderRadius: 235 / 2,
    backgroundColor: greyMain,

    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    width: '35%',
    height: '8%',
    position: 'absolute',
    bottom: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: greyMain,
    zIndex: 5,
  },
  nextText: {
    color: 'white',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: greyMain,
  },
});
