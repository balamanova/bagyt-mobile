import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  PanResponder,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {height, greyMain} from '../../util/Constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Comment from '../../components/Comment';
import ShowPointsItem from './ShowPointsItem.js';

export default class UniversityScreen extends React.Component {
  state = {
    scrolledTop: false,
    modalVisible: false,
    pan: new Animated.ValueXY(),
  };

  showPoints = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };
  renderItem = (majorPoints) => {
    return <ShowPointsItem item={majorPoints} />;
  };

  detail = (det, iconName, link) => {
    if (det !== '') {
      return (
        <View style={styles.contactView}>
          <Ionicons name={iconName} size={20} color={'black'} />
          {link ? (
            <Text style={styles.text2} onPress={() => Linking.openURL(link)}>
              {det}
            </Text>
          ) : (
            <Text style={styles.text2}> {det}</Text>
          )}
        </View>
      );
    }
  };

  goToTop = () => {
    const {scrolledTop} = this.state;
    this.setState({
      scrolledTop: !scrolledTop,
      scroll: scrolledTop ? -height * 0.009 : -height * 0.78,
    });
  };

  UNSAFE_componentWillMount() {
    this.state.pan.addListener((value) => (this._val = value));

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([null, {dx: 0, dy: this.state.pan.y}]),
      onPanResponderRelease: (e, gestureState) => {
        this.state.pan.setValue({
          x: 0,
          y: gestureState.dy < 180 ? 0 : 221.66015625,
        });
      },
    });

    this.state.pan.setValue({x: 0, y: 221.66015625});
  }

  render() {
    const {item} = this.props.route.params;
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    return (
      <React.Fragment>
        <Image
          style={{
            width: '100%',
            height: '60%',
            position: 'absolute',
          }}
          source={{
            uri: item.photo
              ? item.photo
              : 'http://www.turan-edu.kz/wp-content/uploads/2017/06/94191.jpg',
          }}
        />
        <Animated.View
          useNativeDriver={true}
          style={[panStyle, styles.container]}>
          <View {...this.panResponder.panHandlers} style={[styles.infoBlock]}>
            <TouchableOpacity onPress={() => this.goToTop()}>
              <Image
                style={styles.scrollTopIcon}
                source={require('./images/top.png')}
              />
            </TouchableOpacity>
            <Text style={styles.heading}>{item.name}</Text>
          </View>

          <ScrollableTabView
            style={{backgroundColor: 'white'}}
            tabBarActiveTextColor={greyMain}
            tabBarUnderlineStyle={{backgroundColor: greyMain}}
            tabBarBackgroundColor={'white'}
            tabBarTextStyle={{fontSize: 13}}>
            <ScrollView tabLabel="Описание" style={styles.scrollView}>
              <View style={styles.wrapperDescription}>
                <Text style={styles.textDesciption}>{item.description}</Text>
              </View>
              <Comment id={item._id} commentList={item.commentList} />
            </ScrollView>
            <ScrollView tabLabel="Специальности" style={styles.scrollView}>
              <FlatList
                data={item.majorPoints}
                extraData={this.state.modalVisible}
                keyExtractor={(_, index) => index}
                numColumns={1}
                renderItem={({item}) => this.renderItem(item)}
              />
            </ScrollView>
            <ScrollView tabLabel="Контакты" style={styles.scrollView}>
              {this.detail(
                item.webSite,
                'ios-information-circle-outline',
                item.webSite,
              )}
              {this.detail(item.phone, 'md-call', `tel:${item.phone}`)}
              {this.detail(item.email, 'ios-mail', `mailto:${item.phone}`)}
              {this.detail(item.address, 'ios-home')}
            </ScrollView>
          </ScrollableTabView>
        </Animated.View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  infoBlock: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  scrollTopIcon: {
    alignSelf: 'center',
    marginTop: '2%',
  },
  heading: {
    fontSize: 16,
    margin: '3%',
    color: '#232931',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    flex: 1.4,
  },
  scrollView: {
    fontSize: 14,
    marginBottom: 10,
    padding: '3%',
  },
  contactView: {
    flexDirection: 'row',
    height: 40,
    color: '#232931',
  },
  text2: {
    color: '#232931',
    marginLeft: 30,
  },
});
