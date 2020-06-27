import React, {Component} from 'react';
import {FlatList, SafeAreaView, ActivityIndicator, View} from 'react-native';
import UniversityItem from '../../components/UniversityItem';
import {getItem} from '../../util/AsyncStorage';
import {allScreenStyle} from '../../util/Constants';
import {university} from '../../util/texts';
import {getUniversityById} from '../../server/UniversityApi';

class FavouriteUniversityList extends Component {
  state = {
    searchText: '',
    refreshing: false,
    data: [],
  };

  getData = async () => {
    const data = await getItem();
    this.setState({data});
  };

  navigateToDetailUniversity = (id) => {
    getUniversityById(id).then((res) => {
      this.props.navigation.navigate(university, {
        item: res,
      });
    });
  };

  async componentDidMount() {
    this.getData();
  }

  render() {
    const {data} = this.state;

    return (
      <SafeAreaView style={[allScreenStyle]}>
        {data ? (
          <FlatList
            ItemSeparatorComponent={this.renderSeparator}
            extraData={data}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refreshing}
            onRefresh={() =>
              this.setState(
                {
                  refreshing: true,
                },
                () => {
                  this.getData();
                  this.setState({
                    refreshing: false,
                  });
                },
              )
            }
            renderItem={({item, index, separators}) => (
              <UniversityItem
                isFavourite={true}
                item={item}
                navigateToDetailUniversity={(id) =>
                  this.navigateToDetailUniversity(id)
                }
              />
            )}
          />
        ) : (
          <ActivityIndicator />
        )}
      </SafeAreaView>
    );
  }

  renderSeparator = () => {
    return <View style={{marginVertical: 10}} />;
  };
}

export default FavouriteUniversityList;
