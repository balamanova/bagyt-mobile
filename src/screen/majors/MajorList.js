import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getMajorsBySubject} from '../../server/MajorsApi';
import {width, allScreenStyle, greyMain} from '../../util/Constants';
import {see_statisticts, major_detailed, statistics} from '../../util/texts';
import MajorName from '../../components/MajorName';

export default class MajorList extends React.Component {
  state = {
    majors: [],
  };

  async componentDidMount() {
    const {subject} = this.props.route.params;
    await getMajorsBySubject(subject).then((majors) => {
      this.setState({
        majors,
      });
    });
  }

  renderButton = (item) => {
    return (
      <TouchableHighlight
        style={styles.major_view}
        onFocus={() => this.onFocus()}>
        <Text>major_view</Text>
      </TouchableHighlight>
    );
  };

  navigateToMajorDetailed = (id) =>
    this.props.navigation.navigate(major_detailed, {id});

  navigateToStatistics = () => {
    const {subject} = this.props.route.params;
    this.props.navigation.navigate(statistics, {subject});
  };

  render() {
    const {majors} = this.state;

    return (
      <SafeAreaView style={[allScreenStyle]}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => this.navigateToStatistics()}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginVertical: 10,
            }}>
            <Text style={styles.see_statisticts}>{see_statisticts}</Text>
            <FontAwesome name="bar-chart-o" size={20} color={greyMain} />
          </TouchableOpacity>

          {majors ? (
            <FlatList
              ItemSeparatorComponent={this.renderSeparator}
              extraData={majors}
              data={majors}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index, separators}) => (
                <MajorName
                  item={item}
                  navigateToMajorDetailed={(id) =>
                    this.navigateToMajorDetailed(id)
                  }
                />
              )}
            />
          ) : (
            <ActivityIndicator />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
