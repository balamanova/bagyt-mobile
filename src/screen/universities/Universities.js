import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import UniversityItem from '../../components/UniversityItem';
import {search, filterScreen, university} from '../../util/texts';
import {allScreenStyle, greyMain} from '../../util/Constants';
import {getUniversityList, getUniversityById} from '../../server/UniversityApi';
import Icon from 'react-native-vector-icons/AntDesign';
import {getItem} from '../../util/AsyncStorage';

class Universities extends Component {
  state = {
    searchText: '',
    myArray: [],
    refreshing: false,
    loadingData: true
  };

  onRefresh = async () => {
    var myArray = await getItem();
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.setState({
          myArray,
          refreshing: false,
        });
      },
    );
  };

  async componentDidMount() {
    await getUniversityList(1, '').then((res) => this.setDate(res));
    this.onRefresh();
  }

  setDate = (list) => {
    this.setState({
      data: list.universityList,
      loadingData: false
    });
  };

  navigateToFilter = () => {
    this.props.navigation.navigate(filterScreen, {
      setDate: (list) => this.setDate(list),
    });
  };

  _onChangeSearch = (query) =>
    this.setState({searchText: query, loadingData: true}, () => {
        getUniversityList(1, query).then((res) => this.setDate(res));
    });

  navigateToDetailUniversity = async (id) => {
    await getUniversityById(id).then((res) => {
      this.props.navigation.navigate(university, {
        item: res,
      });
    });
  };

  render() {
    const {searchText, data, myArray, loadingData} = this.state;
    return (
      <SafeAreaView style={[allScreenStyle]}>
        <ScrollView>
          <View style={{flexDirection: 'row'}}>
            <View style={style.searchBar}>
              <Icon
                name="search1"
                style={style.iconStyle}
                size={18}
                color="rgba(0, 0, 0, 0.75)"
              />
              <TextInput
                placeholder={search}
                onChangeText={(query) => {
                  this._onChangeSearch(query);
                }}
                value={searchText}
                inputStyle={style.inputStyle}
              />
            </View>
            <View>
              <Icon
                onPress={() => this.navigateToFilter()}
                name="filter"
                style={style.iconStyle}
                size={22}
                color={greyMain}
              />
            </View>
          </View>
          {loadingData ? (
            <ActivityIndicator />
          ): (
            <FlatList
              ItemSeparatorComponent={this.renderSeparator}
              extraData={data}
              data={data}
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
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
          ) }
        </ScrollView>
      </SafeAreaView>
    );
  }

  renderSeparator = () => {
    return <View style={[style.separator]} />;
  };
}

const style = StyleSheet.create({
  searchBar: {
    borderBottomColor: 'rgba(0, 0, 0, 1)',
    borderBottomWidth: 0.3,
    height: 40,
    width: '93%',
    marginBottom: 15,
    flexDirection: 'row',
  },
  separator: {
    marginVertical: 10,
  },
  iconStyle: {
    marginTop: 10,
  },
  inputStyle: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: 'rgba(196, 196, 196, 1)',
  },
});

export default Universities;
