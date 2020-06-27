import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {greyMain} from '../util/Constants';

const FilterParameter = (props) => {
  const {item} = props;
  return (
    <TouchableOpacity
      style={styles.opacity}
      onPress={() => props.showActionSheet(item)}>
      <View style={styles.searchView1}>
        <View style={styles.searchView2}>
          <MaterialIcons name={item.iconName} size={26} color={greyMain} />
          <Text style={styles.text}>{item.name}</Text>
        </View>
        <View style={styles.searchView3}>
          <Text style={styles.initalValue}>
            {item.initialValue.substring(0, 17)}
          </Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={26}
            color={greyMain}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  opacity: {
    height: '10%',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    flex: 1,
  },
  searchView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,

    marginVertical: '3.5%',
  },
  searchView2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {marginLeft: 10, fontSize: 16, color: greyMain},
  searchView3: {
    flexDirection: 'row',
  },
  initalValue: {
    color: 'grey',
    marginVertical: 4,
    fontSize: 15,
    marginHorizontal: 5,
  },
});

export default FilterParameter;
