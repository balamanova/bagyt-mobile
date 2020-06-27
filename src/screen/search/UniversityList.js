import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import UniversityItem from '../../components/UniversityItem';
import {allScreenStyle} from '../../util/Constants';
import {university} from '../../util/texts';
import {getUniversityById} from '../../server/UniversityApi';
import {getItem} from '../../util/AsyncStorage';

class Universities extends Component {
  state = {
    myArray: [],
  };

  async componentDidMount() {
    var myArray = await getItem();
    this.setState({
      myArray,
    });
  }

  navigateToDetailUniversity = async (id) => {
    await getUniversityById(id).then((res) => {
      this.props.navigation.navigate(university, {
        item: res,
      });
    });
  };

  render() {
    const {universityList} = this.props.route.params;
    const {myArray} = this.state;
    return (
      <SafeAreaView style={[allScreenStyle]}>
        <ScrollView>
          {universityList ? (
            <FlatList
              ItemSeparatorComponent={this.renderSeparator}
              extraData={universityList}
              data={universityList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index, separators}) =>
                item && (
                  <UniversityItem
                    isFavourite={myArray
                      .map((univer) => univer._id === item._id)
                      .includes(true)}
                    item={item}
                    navigateToDetailUniversity={(id) =>
                      this.navigateToDetailUniversity(id)
                    }
                  />
                )
              }
            />
          ) : (
            <ActivityIndicator />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  renderSeparator = () => {
    return <View style={[style.separator]} />;
  };
}

const style = StyleSheet.create({
  separator: {
    marginVertical: 10,
  },
});

export default Universities;
