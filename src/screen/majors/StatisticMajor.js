import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {getStatistics} from '../../server/MajorsApi';
import {width, allScreenStyle, greyMain} from '../../util/Constants';

const colorChecker = (rate) => {
  if (rate < 0.1) return 'rgba(32, 174, 169, 0.51)';
  if (rate < 0.8) return 'rgba(32, 174, 169, 0.8)';
  if (rate <= 1.3) return 'rgba(65, 151, 148, 1)';
  return 'rgba(47, 128, 125, 1)';
};

const CityWithStatistics = ({major}) => {
  return (
    <React.Fragment>
      <View style={styles.cityView}>
        <Text style={styles.text}>{major.city}</Text>
      </View>
      <FlatList
        extraData={major.statisticMajors}
        data={major.statisticMajors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index, separators}) => {
          const rate = (item.numberOfVacancies * 6.25) / major.vacancies;

          return (
            <View style={styles.statisticBarView}>
              <View style={{flex: 0.5, justifyContent: 'center'}}>
                <Text
                  numberOfLines={2}
                  style={[{textAlign: 'right', marginRight: 15}]}>
                  {item.majorName}
                </Text>
              </View>

              <View style={styles.statisticBar}>
                <View
                  style={{
                    backgroundColor: colorChecker(rate),
                    flex: rate,
                    marginVertical: 12,
                  }}
                />
                <Text
                  style={[styles.text, {marginLeft: 10, alignSelf: 'center'}]}>
                  {(rate * 16).toFixed(1)}%
                </Text>
              </View>
            </View>
          );
        }}
      />
    </React.Fragment>
  );
};

export default class StatisticMajor extends React.Component {
  state = {};

  async componentDidMount() {
    const {subject} = this.props.route.params;
    await getStatistics(subject).then((statisticMajorByCity) => {
      this.setState({
        statisticMajorByCity,
      });
    });
  }

  render() {
    const {statisticMajorByCity} = this.state;
    return (
      <SafeAreaView style={[allScreenStyle]}>
        {statisticMajorByCity ? (
          <ScrollView style={styles.content}>
            <FlatList
              ItemSeparatorComponent={this.renderSeparator}
              extraData={statisticMajorByCity}
              data={statisticMajorByCity}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <CityWithStatistics major={item} />}
            />
          </ScrollView>
        ) : (
          <View>
            <ActivityIndicator />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  text: {fontSize: 16, color: 'rgba(0, 0, 0, 1)'},
  statisticBar: {
    flexDirection: 'row',
    flex: 0.7,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(0, 0, 0, 1)',
  },
  statisticBarView: {
    height: 40,
    flexDirection: 'row',
    // marginVertical: 10,
  },
  cityView: {
    borderBottomColor: 'rgba(0, 0, 0, 1)',
    borderBottomWidth: 0.5,
    padding: 5,
    marginVertical: 20,
  },
  chart: {
    backgroundColor: 'white',
    transform: [{rotate: '90deg'}],
  },
  content: {
    marginHorizontal: 15,
  },
  see_statisticts: {
    fontSize: 14,
    color: greyMain,
    marginRight: 8,
  },
  major_view: {
    padding: width * 0.1,
    borderRadius: 20,
    borderWidth: 0.5,
  },
});
