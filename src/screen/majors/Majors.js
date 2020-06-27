import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {getAllSubjects} from '../../server/MajorsApi';
import {width} from '../../util/Constants';
import {majors} from '../../util/texts';

export default class Majors extends React.Component {
  state = {
    subjects: [],
  };

  async componentDidMount() {
    await getAllSubjects().then((subjects) =>
      this.setState({
        subjects,
      }),
    );
  }

  toListSpecialists = (subject) =>
    this.props.navigation.navigate(majors, {subject});

  render() {
    const {subjects} = this.state;

    return (
      <View style={styles.content}>
        <FlatList
          data={subjects}
          keyExtractor={(_, index) => index}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                transform="scale(0.5, 0.5)"
                style={styles.button}
                onPress={() => {
                  this.toListSpecialists(item.name);
                }}>
                <ImageBackground
                  source={{uri: item.photo}}
                  style={styles.backImage}
                  imageStyle={{borderRadius: 20}}>
                  {/* <Image source={item.logo} style={styles.logo} /> */}
                  <Text style={styles.text}> {item.name} </Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 2 - 15,
    height: width / 2 - 15,
    borderRadius: 20,
    marginHorizontal: 6,
    marginVertical: 10,
    overflow: 'visible',
    shadowColor: 'grey',
    shadowOpacity: 1,
    shadowRadius: 5,
    borderWidth: 0.5,
    borderColor: '#dcdee2',
  },

  logo: {
    width: 81,
    height: 81,
  },
});
