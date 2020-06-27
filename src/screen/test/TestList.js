import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {getAllQuiz} from '../../server/QuizApi';
import {greyMain, width, allScreenStyle} from '../../util/Constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {test_question} from '../../util/texts';

const window = Dimensions.get('window');

export default class TestList extends Component {
  state = {
    cardsPan: new Animated.ValueXY(),
    cardsStackedAnim: new Animated.Value(0), // add this statement
    currentIndex: 1,
  };

  cardsPanResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (event, gestureState) => {
      this.state.cardsPan.setValue({
        x: gestureState.dx,
        y: this.state.cardsPan.y,
        cardsStackedAnim: new Animated.Value(0), // add this statement
        currentIndex: 0,
      });
    },
    onPanResponderTerminationRequest: () => false,
    onPanResponderRelease: (event, gestureState) => {
      Animated.timing(this.state.cardsPan, {
        toValue: 0,
        duration: 800,
      }).start();
      Animated.timing(this.state.cardsStackedAnim, {
        toValue: 1,
        duration: 300,
      }).start(() => {
        this.state.cardsStackedAnim.setValue(0);
        this.setState({
          currentIndex:
            this.state.currentIndex === 2 ? 0 : this.state.currentIndex + 1,
        });
      });
    },
  });

  async componentDidMount() {
    await getAllQuiz().then((quizList) => {
      this.setState({quizList});
    });
  }

  createDots = (size) => {
    const {currentIndex} = this.state;
    let table = [];
    for (let i = 0; i < size; i++) {
      table.push(
        <Entypo
          color={currentIndex === i ? greyMain : 'rgba(196, 196, 196, 1)'}
          name="dot-single"
          size={24}
        />,
      );
    }
    return table;
  };

  navigateToTestMain = (id) =>
    this.props.navigation.navigate(test_question, {id});

  render() {
    const {quizList, currentIndex} = this.state;
    return (
      <SafeAreaView style={[allScreenStyle]}>
        <View style={styles.container}>
          {quizList ? (
            quizList.map((item) => (
              <Animated.View
                useNativeDriver={true}
                {...this.cardsPanResponder.panHandlers}
                onPress={() =>
                  this.navigateToTestMain(quizList[currentIndex]._id)
                }
                style={{
                  flex: 1,
                  width: '100%',
                  height: window.height * 0.7 + quizList.indexOf(item) * 10,
                  position: 'absolute',
                  zIndex: quizList.indexOf(item),
                  opacity: this.state.cardsStackedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.3],
                  }),
                  transform: [
                    {translateX: this.state.cardsPan.x},
                    {
                      scale: this.state.cardsStackedAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.9],
                      }),
                    },
                  ],
                }}>
                <View style={styles.main}>
                  <View style={styles.imageView}>
                    <Image
                     onPress={() =>
                      this.navigateToTestMain(quizList[currentIndex]._id)
                    }
                      style={styles.image}
                      source={{
                        uri: quizList[currentIndex].photo
                          ? quizList[currentIndex].photo
                          : 'https://moeobrazovanie.ru/data/ckfinder/images/K%20chemu%20lezhit%20vasha%20dusha.jpg',
                      }}
                    />
                  </View>
                  <View style={styles.textView}>
                    <Text style={styles.text}>
                      {quizList[currentIndex].name}
                    </Text>
                  </View>
                  <View style={styles.questView}>
                    <Text style={quizList.quest}>
                      {quizList[currentIndex].questionNum} вопросов
                    </Text>
                  </View>
                </View>
                <View style={styles.indexDots}>
                  {currentIndex === quizList.indexOf(item) && (
                    <React.Fragment>
                      {this.createDots(quizList.length)}
                    </React.Fragment>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    this.navigateToTestMain(quizList[currentIndex]._id)
                  }>
                  <Text style={styles.startTest}>{'Начать'.toUpperCase()}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: 'white',
    padding: 30,
  },
  startTest: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
  indexDots: {
    height: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 3,
  },
  main: {
    flex: 0.9,
    marginBottom: '7%',
    backgroundColor: greyMain,
    borderRadius: 10,
  },
  button: {
    backgroundColor: greyMain,
    marginTop: 15,
    width: '30%',
    height: 26,
    alignSelf: 'center',
    borderRadius: 20,
  },
  imageView: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: '60%',
    width: '90%',
  },
  questView: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  image: {
    height: '90%',
    width: '100%',
  },
  textView: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    color: '#FFF',
    marginVertical: 10,
    fontWeight: 'bold',

    textAlign: 'center',
    justifyContent: 'center',
  },
});
