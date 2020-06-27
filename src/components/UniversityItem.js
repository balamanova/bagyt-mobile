import React, {useState} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import {height, greyMain} from '../util/Constants';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {setItem} from '../util/AsyncStorage';

export default function UniversityItem(props) {
  const {item, isFavourite} = props;
  const [isFav, setIsFav] = useState(isFavourite);

  const onItemPress = (id) => {
    props.navigateToDetailUniversity(id);
  };

  const favButtonClicked = () => {
    setIsFav(!isFav);
    setItem(item);
  };

  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => onItemPress(item._id)}>
      <Image
        source={{
          uri: item.photo
            ? item.photo
            : 'http://www.turan-edu.kz/wp-content/uploads/2017/06/94191.jpg',
        }}
        style={style.mainView}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <View style={style.cityView}>
          <EvilIcons
            name="location"
            size={16}
            color={'white'}
            style={{
              marginTop: 4,
            }}
          />
          <Text style={style.cityName}>{item.city}</Text>
        </View>
        <TouchableOpacity
          style={style.favouriteView}
          onPress={() => favButtonClicked()}>
          {isFav ? (
            <FontAwesome name="heart" color={'red'} size={20} />
          ) : (
            <FontAwesome name="heart" color={'white'} size={20} />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <Text style={style.textName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    borderRadius: 10,
    flex: 1,
    paddingBottom: 15,
    height: height * 0.27,
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  textName: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  mainView: {
    borderRadius: 10,
    width: '100%',
    height: height * 0.27,
    opacity: 0.5,
    padding: 10,
    shadowColor: 'grey',
    position: 'absolute',
    resizeMode: 'cover',
  },
  cityView: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'flex-start',
  },
  cityName: {
    fontSize: 14,
    color: 'white',
  },
  favouriteView: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: greyMain,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
