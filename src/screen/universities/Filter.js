import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import FilterParameter from '../../components/FilterParameter';
import {
  greyMain,
  actionSheet,
  width,
  allScreenStyle,
  cityKey,
  subjectsKey,
  majorsKey,
} from '../../util/Constants';
import {
  getAllCities,
  getUniversityListFromFilterPage,
} from '../../server/UniversityApi';
import {getAllSubjects, getMajors} from '../../server/MajorsApi';
import {save, universities} from '../../util/texts';
import {getAsyncItem, setAsyncItem} from '../../util/AsyncStorage';

const initialState = {
  city: 'Все',
  subject: 'Все',
  major: 'Все',
  initialActionSheet: [],
  initialState: '',
  showActionSheet: false,
  initialActionSheetName: '',
  onLoading: true,
  findLoading: false,
};

export default class FilterScreen extends React.Component {
  state = initialState;
  
  showActionSheet = (item) => {
    this.setState(
      {
        showActionSheet: true,
        initialActionSheet: item.array,
        initialState: item.initialState,
        initialActionSheetName: item.name,
      },
      () => {
        this.ActionSheet.show();
      },
    );
  };

  constructField = (actionSheetList, text) => actionSheetList.map((field) => 
    <Text style={{color: greyMain, fontSize: 16}}>{field.name}</Text>
    )
    
  async componentDidMount() {
    let cities = await getAsyncItem(cityKey);
    let subjects = await getAsyncItem(subjectsKey);
    let majorList = await getAsyncItem(majorsKey);
    if (!cities || !majorList || !subjects) {
      cities = actionSheet.concat(await getAllCities());
      subjects = actionSheet.concat(await getAllSubjects());
      majorList = actionSheet.concat(await getMajors());
      setAsyncItem(cityKey, cities);
      setAsyncItem(subjectsKey, subjects);
      setAsyncItem(majorsKey, majorList);
    }
    this.setState({
      majorList,
      cities,
      subjects,
      onLoading: false,
      filterFields: [
        {
          name: 'Город',
          iconName: 'location-city',
          array: this.constructField(cities, 'cities'),
          initialValue: 'Все',
          initialState: 'city',
        },
        {
          name: 'Предмет',
          iconName: 'find-in-page',
          array: this.constructField(subjects, 'subjects'),
          initialValue: 'Все',
          initialState: 'subject',
        },
        {
          name: 'Специальность',
          iconName: 'contacts',
          filterMajor: majorList,
          array: this.constructField(majorList, 'majorList'),
          initialValue: 'Все',
          initialState: 'major',
        },
      ],
    });
  }

  saveButtonClicked = () => {
    const {filterFields} = this.state;
    const city =
      filterFields[0].initialValue === actionSheet[1].name
        ? ''
        : filterFields[0].initialValue;
    const major =
      filterFields[2].initialValue === actionSheet[1].name
        ? ''
        : filterFields[2].initialValue;
    const subject =
      filterFields[1].initialValue === actionSheet[1].name
        ? ''
        : filterFields[1].initialValue;
    this.setState({
      findLoading: true
    }, () => {
       getUniversityListFromFilterPage(city, major, subject)
      .then((res) => {
        this.props.route.params.setDate(res);
        this.props.navigation.navigate(universities);
        this.setState(initialState)
      })
      .catch((err) => {
        console.error(err);
      });
    })
   
  };

  render() {
    const {filterFields, onLoading, initialActionSheetName, initialActionSheet, showActionSheet, findLoading} = this.state;
    return (
      <SafeAreaView style={[allScreenStyle]}>
        <React.Fragment>
            {onLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View>
              <FlatList
                data={filterFields}
                keyExtractor={(_, index) => index}
                numColumns={1}
                extraData={filterFields}
                renderItem={({item}) => (
                  <FilterParameter
                    item={item}
                    showActionSheet={(item) => this.showActionSheet(item)}
                  />
                )}
              />
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => this.saveButtonClicked()}>
              <Text style={styles.saveText}>{save.toUpperCase()}</Text>
              {findLoading && 
              <ActivityIndicator color = {"white"}/>
              }
            </TouchableOpacity> 
            {
              showActionSheet && <ActionSheet
              ref={(o) => (this.ActionSheet = o)}
              title={
                <Text style={{color: 'grey', fontSize: 16}}>
                  {initialActionSheetName}
                </Text>
              }
              options={initialActionSheet}
              cancelButtonIndex={0}
              styles={styles.actionsSheet}
              destructiveButtonIndex={4}
              onPress={(index) => {
                var {filterFields, majorList, cities, subjects} = this.state;
                if (initialActionSheetName === 'Город') {
                  const city = cities[index].name;
                  if (city !== actionSheet[0].name)
                    filterFields[0].initialValue = city;
                } else if (initialActionSheetName === 'Предмет') {
                  const subject = subjects[index].name;
                  if (subject !== actionSheet[0].name) {
                    filterFields[1].initialValue = subject;
                    var filterMajor = majorList.filter((item) => {
                      return item.subject === subject;
                    });
                    filterFields[2].array = this.constructField(filterMajor);
                    filterFields[2].filterMajor = filterMajor;
                  }
                } else if (initialActionSheetName === 'Специальность') {
                  const major = filterFields[2].filterMajor[index].name;
                  if (major !== actionSheet[0].name)
                    filterFields[2].initialValue = major;
                }
                this.setState({
                  filterFields,
                });
              }}
            />
            }
          
            
          </View>
        )}
        </React.Fragment>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  saveButton: {
    marginVertical: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: width * 0.35,
    padding: 10,
    backgroundColor: greyMain,
    flexDirection: 'row'
  },
  saveText: {
    textAlign: 'center',
    color: 'white',
    marginRight: 5,
  },
  actionsSheet: {
    borderRadius: 10,
  },
});
