import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {getQuizById} from '../../server/QuizApi';
import {ActivityIndicator} from 'react-native-paper';
import * as Progress from 'react-native-progress';
import {allScreenStyle, greyMain} from '../../util/Constants';
import {test_answer} from '../../util/texts';

export default class TestMain extends React.Component {
  state = {
    questionNum: 0,
    current: 0,
    Progress_Value: 0,
    score: 0,
    type: '',
    completed: false,
    ansArr: [],
  };

  async componentDidMount() {
    const {id} = this.props.route.params;
    await getQuizById(id).then((test) => {
      this.setState({
        questions: test.questions,
        questionNum: test.questionNum - 1,
        type: test.type,
        testResults: test.testResults,
      });
    });
  }

  navigateToAnswer = (score) => {
    const {testResults} = this.state;
    this.props.navigation.navigate(test_answer, {testResults, score});
  };

  submitAnswer = (answer) => {
    const {type, questionNum, Progress_Value, ansArr} = this.state;
    let {score, current} = this.state;

    current++;
    if (type === 'LETTER') {
      let a = 0,
        h = 0;
      let objects = [...ansArr, answer];
      objects.forEach((item) => {
        h = 0;
        objects.forEach((item2) => {
          item2 === item && h++;
        });
        if (a <= h) {
          (score = item), (a = h);
        }
      });
    } else {
      score += answer;
    }

    if (current === questionNum) this.navigateToAnswer(score);
    else
      this.setState({
        current: current,
        score: score,
        completed: current === questionNum,
        ansArr: [...ansArr, answer],
        Progress_Value: Progress_Value + 1 / questionNum,
      });
  };

  renderSeparator = () => {
    return <View style={{margin: 8}} />;
  };

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.submitAnswer(item.point)}>
        <Text style={styles.textQuestion}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {questions, current, Progress_Value} = this.state;
    return (
      <SafeAreaView style={[allScreenStyle]}>
        {questions ? (
          <ScrollView style={styles.questionView}>
            <View style={styles.progress}>
              <Progress.Bar
                progress={Progress_Value}
                width={250}
                height={25}
                color={greyMain}
                useNativeDriver={true}
                animationType={'timing'}
              />
            </View>

            <Text
              style={{
                marginVertical: '10%',
                marginHorizontal: 5,
                color: 'rgba(0, 0, 0, 1)',
                fontSize: 14,
                textAlign: 'center',
              }}>
              {questions[current].question}
            </Text>

            <FlatList
              alwaysBounceVertical={true}
              data={questions[current].answers}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.renderSeparator}
              keyExtractor={(item, index) => index}
            />
          </ScrollView>
        ) : (
          <ActivityIndicator />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  questionView: {
    flex: 1,
    paddingVertical: '5%',
  },
  question: {
    marginVertical: '10%',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  progress: {
    alignSelf: 'center',
  },
  textQuestion: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: greyMain,
    borderRadius: 10,
  },
});
