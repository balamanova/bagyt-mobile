import React, {useState} from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text, TextInput} from 'react-native';
import {greyMain} from '../util/Constants';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {comment, leaveComment} from '../util/texts';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {sendComment} from '../server/UniversityApi';

export default Comment = (props) => {
  const {id, signIn} = props;
  const [searchText, setSearchText] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [commentList, setCommentList] = useState(props.commentList);

  const sendCommentPressed = async () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '350435343725-59q1rg8pngand1l5se1bsvi2c6plil3l.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
      // setUserInfo(userInfo)
      // } else {
      //   userInfo = await GoogleSignin.signInSilently();
      const commentListArray = commentList ? commentList : []
      
      setCommentList([
        ...commentListArray,
        {
          text: searchText,
          commentUser: userInfo.user,
        },
      ]);
      sendComment(searchText, userInfo.user, id);
      setSearchText('');
      // }
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.personName}>{comment}</Text>
      <View style={style.flexDirectionRow}>
        <View style={style.searchBar}>
          <Octicons
            name="pencil"
            style={style.iconStyle}
            size={16}
            color={greyMain}
          />
          <TextInput
            placeholder={leaveComment}
            onChangeText={(query) => {
              setSearchText(query);
            }}
            value={searchText}
            inputStyle={style.inputStyle}
          />
        </View>
        <TouchableOpacity onPress={() => sendCommentPressed()}>
          <Icon
            name="ios-paper-plane"
            style={style.iconStyle}
            size={22}
            color={greyMain}
          />
        </TouchableOpacity>
      </View>
      {commentList &&
        commentList.map((comment) => (
          <View style={style.flexDirectionRow}>
            {comment.commentUser.photo ? (
              <Image
                source={{
                  uri: comment.commentUser.photo,
                }}
                style={style.avatarView}
              />
            ) : (
              <MaterialCommunityIcons name="account-circle-outline" size={24} />
            )}
            <View style={style.commentsView}>
              <Text style={style.personName}>{comment.commentUser.name}</Text>
              <Text style={style.comment}>{comment.text}</Text>
            </View>
          </View>
        ))}
    </View>
  );
};

const style = StyleSheet.create({
  avatarView: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  container: {
    marginVertical: 15,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  searchBar: {
    borderBottomColor: 'rgba(0, 0, 0, 1)',
    borderBottomWidth: 0.3,
    height: 40,
    width: '93%',
    marginBottom: 15,
    flexDirection: 'row',
  },
  iconStyle: {
    marginTop: 10,
  },
  inputStyle: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: 'rgba(196, 196, 196, 1)',
  },
  personName: {
    fontWeight: '700',
  },
  commentsView: {
    marginLeft: 10,
  },
  comment: {
    marginBottom: 12,
    marginTop: 3,
  },
});
