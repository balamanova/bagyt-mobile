import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {getMajorById} from '../../server/MajorsApi';
import {allScreenStyle} from '../../util/Constants';
import {description, subject_to_select, university} from '../../util/texts';
import {getUniversityById} from '../../server/UniversityApi';
import UniversityItem from '../../components/UniversityItem';
import {getItem} from '../../util/AsyncStorage';

export default class MajorDetailed extends React.Component {
  state = {
    major: '',
  };

  async componentDidMount() {
    const {id} = this.props.route.params;
    var myArray = await getItem();
    await getMajorById(id).then((major) =>
      this.setState({
        myArray,
        major,
      }),
    );
  }

  navigateToDetailUniversity = async (id) => {
    await getUniversityById(id).then((res) => {
      this.props.navigation.navigate(university, {
        item: res,
      });
    });
  };

  render() {
    const {major, myArray} = this.state;
    return (
      <SafeAreaView style={[allScreenStyle]}>
        <ScrollView>
          <Text style={styles.name}>{major.name}</Text>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Text style={styles.boldText}>{subject_to_select}: </Text>
            <Text>
              {major.subject}, {major.profilSubject}
            </Text>
          </View>

          <Text style={styles.boldText}>{description}</Text>
          <Text>{major.description}</Text>
          <Text style={{marginVertical: 10}}>{major.object}</Text>

          {major.universities && (
            <FlatList
              ItemSeparatorComponent={this.renderSeparator}
              extraData={major.universities}
              data={major.universities}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index, separators}) => (
                <UniversityItem
                  isFavourite={myArray
                    .map((univer) => univer._id === item._id)
                    .includes(true)}
                  item={item}
                  navigateToDetailUniversity={(id) =>
                    this.navigateToDetailUniversity(id)
                  }
                />
              )}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
  renderSeparator = () => {
    return <View style={[styles.separator]} />;
  };
}

const styles = StyleSheet.create({
  name: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
