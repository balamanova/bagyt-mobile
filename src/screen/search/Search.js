import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import FloatingLabelInput from '../../components/FloatingLableInput';
import CustomCheckbox from '../../components/CustomCheckbox';
import {
  write_point,
  kazakh_school,
  rus_school,
  sel_kvota,
  find,
  search_result,
} from '../../util/texts';
import {allScreenStyle, greyMain, width} from '../../util/Constants';
import {filterByPoint} from '../../server/MajorsApi';

export default class Search extends React.Component {
  state = {
    kazSchool: true,
    rusSchool: false,
    selKvota: false,
    loading: false,
  };

  handleTextChange = (newText) =>
    newText <= 140 && this.setState({value: newText});

  onKazSchoolChange = () =>
    this.setState({
      kazSchool: !this.state.kazSchool,
      rusSchool: !this.state.rusSchool,
    });

  onSelKvotaChange = () => this.setState({selKvota: !this.state.selKvota});

  onSearchButtonClicked = () => {
    this.setState({
      loading: true,
    });
    const {value, kazSchool, selKvota} = this.state;

    filterByPoint(kazSchool, selKvota, value)
      .then((universityList) => {
        this.setState(
          {
            loading: false,
          },
          () => {
            this.props.navigation.navigate(search_result, {universityList});
          },
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    const {kazSchool, rusSchool, selKvota, loading} = this.state;

    return (
      <SafeAreaView style={[allScreenStyle]}>
        {/* <View style={{width: '90%', alignItems: 'flex-start'}}> */}
        {/* <Text style={{color: 'grey', fontSize: 12}}>
            *Данная страница предназначена для приблизительного поиска грантов в
            университетах.{' '}
          </Text>
          <Text style={{color: 'grey', fontSize: 12}}>
            *Данные о минимальных баллах ЕНТ для приобретения гранта взяты с
            прошлых годов.
          </Text>
        </View> */}
        <View style={styles.container}>
          <FloatingLabelInput
            label={write_point}
            value={this.state.value}
            onChangeText={this.handleTextChange}
          />
          <CustomCheckbox
            name={kazakh_school}
            value={kazSchool}
            onChange={() => this.onKazSchoolChange()}
          />
          <CustomCheckbox
            name={rus_school}
            value={rusSchool}
            onChange={() => this.onKazSchoolChange()}
          />
          <CustomCheckbox
            name={sel_kvota}
            value={selKvota}
            onChange={() => this.onSelKvotaChange()}
          />
          <TouchableOpacity
            onPress={() => this.onSearchButtonClicked()}
            style={{
              backgroundColor: greyMain,
              padding: 8,
              borderRadius: 20,
              width: width * 0.26,
              alignSelf: 'center',
              marginTop: 10,
              shadowColor: greyMain, // IOS
              elevation: 3,
              flexDirection: 'row',
              justifyContent: loading ? 'space-between' : 'center',
              shadowOffset: {height: 1, width: 1}, // IOS
              shadowOpacity: 1, // IOS
              shadowRadius: 1,
            }}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 14}}>
              {find.toUpperCase()}
            </Text>
            {loading && <ActivityIndicator />}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 30, justifyContent: 'center'},
});
