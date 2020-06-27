import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {tests, pass_another_test, test_results} from '../../util/texts';
import {allScreenStyle, greyMain} from '../../util/Constants';

export default class TestAnswer extends Component {
  state = {
    result: '',
  };

  componentDidMount() {
    const {score, testResults} = this.props.route.params;

    testResults.forEach((ans) => {
      ans.scoreMax >= score && ans.scoreMin <= score
        ? this.setState({
            result: ans.result,
            resultDes: ans.resultDes,
          })
        : null;
    });
  }

  render() {
    const {result, resultDes} = this.state;
    return (
      <SafeAreaView style={[allScreenStyle]}>
        <ScrollView style={styles.container}>
          <Text style={styles.resultText}>{test_results.toUpperCase()}</Text>
          {resultDes && resultDes !== 'null' && (
            <Text style={styles.answerView}>{resultDes.toUpperCase()}</Text>
          )}
          <Text style={styles.resultDesText}>{result}</Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate(tests)}>
            <Text style={{color: 'white'}}>{pass_another_test}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: 'white',
  },
  resultDesText: {
    alignItems: 'center',
    margin: '3%',
    fontSize: 14,
    color: greyMain,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  answerView: {
    textAlign: 'center',
    marginTop: '7%',
    marginBottom: '3%',
    fontSize: 12,
    color: greyMain,
  },
  buttonStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '60%',
    marginVertical: 20,
    backgroundColor: greyMain,
    padding: 10,
    borderColor: 'transparent',
    borderRadius: 20,
  },
});
